import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Interface } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private countryAPI = 'https://restcountries.com/v3.1/all';
  private allCountries!: Interface[];

  constructor(private http: HttpClient) {}

  public getAllCountryData(): Observable<Interface[]> {
    if (this.allCountries) {
      return of(this.allCountries);
    } else {
      return this.http.get<Interface[]>(this.countryAPI).pipe(
        tap((countries) => (this.allCountries = countries))
      );
    }
  }

  public getCountryByName(name: string): Observable<Interface[]> {
    return of(this.allCountries.filter((country) => country.name.common === name));
  }

  public getCountryByCode(code: string): Observable<Interface[]> {
    return of(this.allCountries.filter((country) => country.cca3 === code));
  }

  public getFilteredCountriesByRegion(region: string): Observable<Interface[]> {
    return of(this.allCountries.filter((country) => country.region === region))
  }
}
