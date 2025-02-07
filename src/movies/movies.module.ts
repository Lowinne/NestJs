import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Resa } from './entities/resa.entity';
import { Salle } from './entities/salle.entity';
import { Session } from './entities/session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Film, Resa, Salle, Session]),
    ConfigModule.forRoot({
    isGlobal: true,
  }),
  HttpModule,
],
  exports: [TypeOrmModule],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
