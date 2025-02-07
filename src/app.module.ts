import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { MoviesModule } from './movies/movies.module';
import { ReservationModule } from './reservation/reservation.module';
import { Session } from './movies/entities/session.entity';
import { Film } from './movies/entities/film.entity';
import { Salle } from './movies/entities/salle.entity';
import { Resa } from './movies/entities/resa.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Session, Film, Salle, Resa],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    MoviesModule,
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
