import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { Int32 } from 'typeorm';

@Injectable()
export class MoviesService {
    constructor(private readonly httpService: HttpService) {}

    search(
        include_adult?: Boolean, 
        language?: String, 
        primary_release_year?: String, 
        page?: Int32, 
        region?: String, 
        year?: string
    ): Observable<AxiosResponse<any[]>> {
        const query = this.buildQuerySearch(include_adult, language, primary_release_year, page, region, year);
        return this.httpService.get(process.env.URL + 'search/movie' + query );
    }

    buildQuerySearch(
        include_adult?: Boolean, 
        language?: String, 
        primary_release_year?: String, 
        page?: Int32, 
        region?: String, 
        year?: string
    ){
        let parmCounter = 0;
        let query = "";

        if(include_adult != null){
            if(parmCounter>0){
                //Si le parametre esty le premier élément
                query = query + "?include_adult=" + include_adult.toString();
            } else {
                //Si le parametre est le deuxieme ou plus element
                query = query + "&include_adult=" + include_adult.toString();
            }
            parmCounter++;
        }

        if(language != null){
            if(parmCounter>0){
                query = query + "?language=" + language;
            } else {
                query = query + "&language=" + language;
            }
            parmCounter++;
        }

        if(primary_release_year != null){
            if(parmCounter>0){
                query = query + "?primary_release_year=" + primary_release_year;
            } else {
                query = query + "&primary_release_year=" + primary_release_year;
            }
            parmCounter++;
        }
        
        if(page != null){
            if(parmCounter>0){
                query = query + "?page=" + page.toString();
            } else {
                query = query + "&page=" + page.toString();
            }
            parmCounter++;
        }

        if(region != null){
            if(parmCounter>0){
                query = query + "?region=" + region;
            } else {
                query = query + "&region=" + region;
            }
            parmCounter++;
        }

        if(year != null){
            if(parmCounter>0){
                query = query + "?year=" + year;
            } else {
                query = query + "&year=" + year;
            }
            parmCounter++;
        }

        return query;
    }
}
