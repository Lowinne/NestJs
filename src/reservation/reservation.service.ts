import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resa } from 'src/movies/entities/resa.entity';
import { Session } from 'src/movies/entities/session.entity';
import { MoviesService } from 'src/movies/movies.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(Resa)
        private resasRepository: Repository<Resa>,
        @InjectRepository(Session)
        private sessionRepository: Repository<Session>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async createResa(userId: number, seanceId: number) {
        if(await this.doseTheSeanceExists(seanceId)){
            if (await this.hasTheUserAlreadyBookTheSeance(userId, seanceId.toString())) {
                const newResa = new Resa();
                newResa.seanceId = seanceId.toString();
                newResa.userId = userId;
                return await this.resasRepository.save(newResa);
            } else {
                throw new ConflictException("La séance à déja été reservé");
            }
        } else {
            throw new NotFoundException("Seance non trouvé");
        }
    }

    async hasTheUserAlreadyBookTheSeance(userId: number, seanceId: string) {
        let disponible = true;
        const resaOfUser = await this.getResaOfUser(userId);
        resaOfUser.forEach(resaData => {
            if (resaData.seanceId == seanceId) {
                disponible = false;
            }
        })
        return disponible;
    }

    async doseTheSeanceExists(seanceIdTemp: number){
        const id = seanceIdTemp;
        return (await this.sessionRepository.findBy({id}) != null);
    }

    async doseTheUserExists(userIdTemp: number){
        const id = userIdTemp;
        return (await this.usersRepository.findBy({id}) != null);
    }

    async getResaOfUser(userId: number) {
        return await this.resasRepository.findBy({ userId });
    }

    async deleteResaofUser(userId: number, sessionId: number) {
        const seanceId = sessionId.toString();
        const resaToDelete = await this.resasRepository.findOneBy({ userId, seanceId });
        const id = resaToDelete?.id;
        if (id) {
            return await this.resasRepository.delete({ id });
        } else {
            throw new NotFoundException("La reservation à supprimer n'a pas été trouvé");
        }
    }
}
