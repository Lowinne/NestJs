import { Body, Controller, Get, Header, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Int32 } from 'typeorm';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService : MoviesService) {}

    @Get('search')
    async search(
        @Query('include_adult') include_adult: string | undefined,
        @Query('language') language: string | undefined,
        @Query('primary_release_year') primary_release_year: string | undefined,
        @Query('page') page: Int32 | undefined,
        @Query('region') region: string | undefined,
        @Query('year') year: string | undefined,
    ){
        return this.moviesService.search((include_adult === 'true'), language, primary_release_year, page, region, year);
    }

    @Get('searchByName')
    async searchByName(
        @Query('name') name: string,
        @Query('page') page: Number,
    ) {
        return this.moviesService.searchByName(name, page);
    }

    @Get('movies')
    async getMoviesFromDB(){
        return this.moviesService.getAllMovies();
    }

    @Get('salles')
    async getSalles(){
        return this.moviesService.getAllSalles();
    }

    @Get('session')
    async getSession(){
        return this.moviesService.getAllSession();
    }

    @Get('resa')
    async getReservation(){
        return this.moviesService.getAllResa();
    }
}
