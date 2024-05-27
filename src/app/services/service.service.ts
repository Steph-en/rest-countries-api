import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Interface } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private countryAPI = 'https://restcountries.com/v3.1/all'

  constructor(private http: HttpClient) { }

  getAllCountryData(): Observable<Interface[]> {
    return this.http.get<Interface[]>(this.countryAPI);
  }
  
  logAllCountryData(): void {
    this.getAllCountryData().subscribe(data => {
      console.log(data);
    }, error => {
      console.log('Error fetching country data:', error);
    });
  }
}
