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
  private allCountries: Interface[] | null = null;

  constructor(private http: HttpClient) { }

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
    if (!this.allCountries) {
      return of([]);
    }
    return of(this.allCountries.filter((country) => {
      return country.name.common === name;
    }));
  }

  public getCountryByCode(code: string): Observable<Interface[]> {
    if (!this.allCountries) {
      return of([]);
    }
    return of(this.allCountries.filter((country) => country.cca3 === code));
  }

  public getFilteredCountriesByRegion(region: string): Observable<Interface[]> {
    if (!this.allCountries) {
      return of([]);
    }
    const filteredCountries = this.allCountries.filter((country) => country.region.toLowerCase() === region.toLowerCase());
    return of(filteredCountries);
  }
}
