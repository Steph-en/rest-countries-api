import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Interface } from '../interface/interface';
import { CountriesFunctionResponse } from '../models/countries-function-response.model';
import { mapCountryApiToCountry } from '../models/country.mapper';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private readonly countryAPI = '/.netlify/functions/countries';

  private allCountries: Interface[] | null = null;

  constructor(private http: HttpClient) {}

  public getAllCountryData(): Observable<Interface[]> {
    if (this.allCountries) {
      return of(this.allCountries);
    }

    return this.http
      .get<CountriesFunctionResponse>(this.countryAPI)
      .pipe(
        map((response) =>
          response.countries.map(mapCountryApiToCountry)
        ),
        tap((countries) => {
          this.allCountries = countries;
        })
      );
  }

  public getCountryByName(name: string): Observable<Interface[]> {
    return this.getAllCountryData().pipe(
      map((countries) =>
        countries.filter(
          (country) =>
            country.name.common.toLowerCase() === name.toLowerCase()
        )
      )
    );
  }

  public getCountryByCode(code: string): Observable<Interface[]> {
    return this.getAllCountryData().pipe(
      map((countries) =>
        countries.filter(
          (country) => country.cca3.toLowerCase() === code.toLowerCase()
        )
      )
    );
  }

  public getFilteredCountriesByRegion(
    region: string
  ): Observable<Interface[]> {
    return this.getAllCountryData().pipe(
      map((countries) =>
        countries.filter(
          (country) =>
            country.region.toLowerCase() === region.toLowerCase()
        )
      )
    );
  }
}