import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Film } from '../entities/film.entity';
import { Session } from '../entities/session.entity';
import { Salle } from '../entities/salle.entity';

config();

async function getRandomMovies() {
  const page = Math.floor(Math.random() * 100);
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
  console.log(url)
  const response = await fetch(url, {
    headers: {
      'accept': 'application/json',
      'Authorization': 'Bearer ' + process.env.AAT
    }
  });
  const data = await response.json();

  return data.results.slice(0, 50);
}


async function seed() {
  const AppDataSource = new DataSource({
    type: "postgres",
    host: 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Film, Session, Salle],
    synchronize: true,
  });

  try {
    await AppDataSource.initialize();
    console.log("Connected to database");

    const movies = await getRandomMovies();
    const movieRepository = AppDataSource.getRepository(Film);

    for (const movieData of movies) {
      const movie = new Film();
      movie.title = movieData.title;
      movie.overview = movieData.overview;
      movie.tmdbId = movieData.id;
      await movieRepository.save(movie);
    }

    const moviesSaved = await movieRepository.find();

    const sallesRepository = AppDataSource.getRepository(Salle);
    for(const movieData of moviesSaved){
        let salle = new Salle();
        salle.filmId = movieData.tmdbId;
        salle.capacity = 50;

        await sallesRepository.save(salle);
    }

    const salleSaved = await sallesRepository.find();

    const sessionRepository = AppDataSource.getRepository(Session);
    for(const salleData of salleSaved) {
        for(let i = 0; i < 5; i++) {
            let session = new Session();
            let today = new Date();

            const heureDeb = 10+i*2;
            today.setHours(heureDeb);
            session.heureDeb = new Date(today);

            const heureFin = 10+i*2+2;
            today.setHours(heureFin);
            session.heureFin = new Date(today);

            session.salleId = salleData.id

            console.log("session : " + session)

            await sessionRepository.save(session);
        }
    }

    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await AppDataSource.destroy();
  }
}

seed();