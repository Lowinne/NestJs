import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { stringify } from 'querystring';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { Int32, Repository } from 'typeorm';
import { Film } from './entities/film.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Resa } from './entities/resa.entity';
import { Salle } from './entities/salle.entity';
import { Session } from 'inspector/promises';

@Injectable()
export class MoviesService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
    @InjectRepository(Resa)
    private resasRepository: Repository<Resa>,
    @InjectRepository(Salle)
    private sallesRepository: Repository<Salle>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    ) {}

  async searchByName(
    name: String,
    page: Number,
  ): Promise<Observable<AxiosResponse<any[]>>> {
    if(page == undefined){
      page = 1
    }

    if(name == null){
      name = ''
    }

    const apiURLWithQuery = `${process.env.URL}search/keyword?query=${name}&page=${page}`;

    console.log('Query executed : ' + apiURLWithQuery);

    const headersRequest = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.AAT}`,
    };

    const { data } = await firstValueFrom(
      this.httpService.get(apiURLWithQuery, { headers: headersRequest }).pipe(
        catchError((error: AxiosError) => {
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async search(
    include_adult?: Boolean,
    language?: String,
    primary_release_year?: String,
    page?: Int32,
    region?: String,
    year?: string,
  ): Promise<Observable<AxiosResponse<any[]>>> 
  {
    const query = this.buildQuerySearch(
      include_adult,
      language,
      primary_release_year,
      page,
      region,
      year,
    );
    const apiURLWithQuery = process.env.URL + 'search/movie' + query;

    console.log('Query executed : ' + apiURLWithQuery);

    const headersRequest = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.AAT}`,
    };

    //The endpoint does not work but the mecanic do
    const { data } = await firstValueFrom(
      this.httpService.get(apiURLWithQuery, { headers: headersRequest }).pipe(
        catchError((error: AxiosError) => {
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  buildQuerySearch(
    include_adult?: Boolean,
    language?: String,
    primary_release_year?: String,
    page?: Int32,
    region?: String,
    year?: string,
  ) {
    let parmCounter = 0;
    let query = '';

    if (include_adult != null) {
      if (parmCounter > 0) {
        //Si le parametre esty le premier élément
        query = query + '&include_adult=' + include_adult.toString();
      } else {
        //Si le parametre est le deuxieme ou plus element
        query = query + '?include_adult=' + include_adult.toString();
      }
      parmCounter++;
    }

    if (language != null) {
      if (parmCounter > 0) {
        query = query + '&language=' + language;
      } else {
        query = query + '?language=' + language;
      }
      parmCounter++;
    }

    if (primary_release_year != null) {
      if (parmCounter > 0) {
        query = query + '&primary_release_year=' + primary_release_year;
      } else {
        query = query + '?primary_release_year=' + primary_release_year;
      }
      parmCounter++;
    }

    if (page != null) {
      if (parmCounter > 0) {
        query = query + '&page=' + page.toString();
      } else {
        query = query + '?page=' + page.toString();
      }
      parmCounter++;
    }

    if (region != null) {
      if (parmCounter > 0) {
        query = query + '&region=' + region;
      } else {
        query = query + '?region=' + region;
      }
      parmCounter++;
    }

    if (year != null) {
      if (parmCounter > 0) {
        query = query + '&year=' + year;
      } else {
        query = query + '?year=' + year;
      }
      parmCounter++;
    }

    return query;
  }
}
