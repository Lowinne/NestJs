import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { stringify } from 'querystring';
import { catchError, Observable, throwError } from 'rxjs';
import { Int32 } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(private readonly httpService: HttpService) {}

  searchByName(name: String, page: Number)
   //: Observable<AxiosResponse<any[]>> 
  {
    const apiURLWithQuery = `${process.env.URL}search/keyword?query=${name}&page=${page}`;

    const headersRequest = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.AAT}`,
    };

    //return this.httpService.get(apiURLWithQuery, { headers: headersRequest });
  }

  search(
    include_adult?: Boolean,
    language?: String,
    primary_release_year?: String,
    page?: Int32,
    region?: String,
    year?: string,
  ): Observable<AxiosResponse<any[]>> {
    const query = this.buildQuerySearch(
      include_adult,
      language,
      primary_release_year,
      page,
      region,
      year,
    );
    const apiURLWithQuery = process.env.URL + 'search/movie' + query;
    //console.log(process.env.AAT);

    const headersRequest = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.AAT}`,
    };

    return this.httpService
      .get(apiURLWithQuery, { headers: headersRequest })
      .pipe(
        catchError((error: AxiosError) => {
          if (error.response?.status === 404) {
            console.error('Error 404: Resource not found', error.response.data);
            throw new NotFoundException();
          }
          console.error('HTTP Request Failed:', error.message);
          return throwError(() => error);
        }),
      );
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
        query = query + '?include_adult=' + include_adult.toString();
      } else {
        //Si le parametre est le deuxieme ou plus element
        query = query + '&include_adult=' + include_adult.toString();
      }
      parmCounter++;
    }

    if (language != null) {
      if (parmCounter > 0) {
        query = query + '?language=' + language;
      } else {
        query = query + '&language=' + language;
      }
      parmCounter++;
    }

    if (primary_release_year != null) {
      if (parmCounter > 0) {
        query = query + '?primary_release_year=' + primary_release_year;
      } else {
        query = query + '&primary_release_year=' + primary_release_year;
      }
      parmCounter++;
    }

    if (page != null) {
      if (parmCounter > 0) {
        query = query + '?page=' + page.toString();
      } else {
        query = query + '&page=' + page.toString();
      }
      parmCounter++;
    }

    if (region != null) {
      if (parmCounter > 0) {
        query = query + '?region=' + region;
      } else {
        query = query + '&region=' + region;
      }
      parmCounter++;
    }

    if (year != null) {
      if (parmCounter > 0) {
        query = query + '?year=' + year;
      } else {
        query = query + '&year=' + year;
      }
      parmCounter++;
    }

    return query;
  }
}
