import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Resa } from 'src/movies/entities/resa.entity';
import { Session } from 'src/movies/entities/session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resa, Session, User])
  ],
  providers: [ReservationService],
  controllers: [ReservationController]
})
export class ReservationModule {}
