import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CountryApiResponse, Interface } from '../interface/interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  private countryAPI = environment.APIURL;
  private readonly apiKey = environment.APIKEY;
  private allCountries: Interface[] | null = null;
  private readonly pageSize = 100;

  constructor(private http: HttpClient) { }

  public getAllCountryData(): Observable<Interface[]> {
    if (this.allCountries) {
      return of(this.allCountries);
    }

    return this.getCountryPage(0).pipe(
      tap((countries) => (this.allCountries = countries))
    );
  }

  public getCountryByName(name: string): Observable<Interface[]> {
    return this.getLoadedCountries().pipe(
      map((countries) => countries.filter(
        (country) => country.names.common.toLowerCase() === name.trim().toLowerCase()
      ))
    );
  }

  public getCountryByCode(code: string): Observable<Interface[]> {
    return this.getLoadedCountries().pipe(
      map((countries) => countries.filter(
        (country) => country.codes.alpha_3.toLowerCase() === code.trim().toLowerCase()
      ))
    );
  }

  public getFilteredCountriesByRegion(region: string): Observable<Interface[]> {
    return this.getLoadedCountries().pipe(
      map((countries) => countries.filter(
        (country) => country.region.toLowerCase() === region.trim().toLowerCase()
      ))
    );
  }

  private getLoadedCountries(): Observable<Interface[]> {
    return this.allCountries ? of(this.allCountries) : this.getAllCountryData();
  }

  private getCountryPage(offset: number, accumulated: Interface[] = []): Observable<Interface[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey.trim()}`,
    });
    const params = new HttpParams()
      .set('limit', this.pageSize)
      .set('offset', offset);

    return this.http.get<CountryApiResponse>(this.countryAPI, { headers, params }).pipe(
      switchMap((response) => {
        const countries = [...accumulated, ...response.data.objects];
        const nextOffset = offset + response.data.objects.length;

        if (!response.data.meta.more || response.data.objects.length === 0) {
          return of(countries);
        }

        return this.getCountryPage(nextOffset, countries);
      })
    );
  }
}
