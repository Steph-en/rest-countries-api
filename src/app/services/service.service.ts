import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Interface } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private allCountries!: Interface[]; 
  private countryAPI = 'https://restcountries.com/v3.1/all'

  constructor(private http: HttpClient) { }

  public getAllCountryData(): Observable<Interface[]> {
    if(this.allCountries) {
      return of(this.allCountries)
    } else {
      return this.http.get<Interface[]>(this.countryAPI).pipe(
        tap((countries) => (this.allCountries = countries))
      )
    }
  }

  public getCountryByName(name: string): Observable<Interface[]> {
    return of(this.allCountries.filter((country) => country.name.common === name))
  }
}
