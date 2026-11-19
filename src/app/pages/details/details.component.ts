import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { tap } from 'rxjs/operators';

import { of, forkJoin } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  switchMap
} from 'rxjs/operators';

import { Interface } from '../../interface/interface';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  arrow = faArrowLeft;

  country: Interface | null = null;
  borders: Interface[] = [];
  interfaceForm: Interface[] = [];

  constructor(
    private route: ActivatedRoute,
    private countryService: ServiceService
  ) {}

  ngOnInit(): void {
    console.log('DetailsComponent initialized');

    this.route.paramMap.pipe(
      map(params => params.get('name')),
      filter((name): name is string => name !== null),
      distinctUntilChanged(),

      switchMap(name => {
        console.log('Loading country:', name);

        return this.countryService.getCountryByName(name).pipe(
          tap(countries => {
            console.log('Country results:', countries.length);
            console.log('First country result:', countries[0]);
          })
        )
      }),

      switchMap(countries => {
        if (countries.length === 0) {
          this.country = null;
          this.interfaceForm = [];
          this.borders = [];
          return of([]);
        }

        this.country = countries[0];
        this.interfaceForm = countries;

        console.log('Country assigned:', this.country);
        console.log('Interface form:', this.interfaceForm);

        const borderCodes = this.country.borders ?? [];

        if (borderCodes.length === 0) {
          return of([]);
        }

        return forkJoin(
          borderCodes.map(code =>
            this.countryService.getCountryByCode(code).pipe(
              map(results => results[0] ?? null)
            )
          )
        ).pipe(
          map(results =>
            results.filter(
              (country): country is Interface => country !== null
            )
          )
        );
      }),

      catchError(error => {
        console.error('Error loading country details:', error);
        this.country = null;
        this.interfaceForm = [];
        this.borders = [];
        return of([]);
      })
    ).subscribe(borders => {
      this.borders = borders;
    });
  }

  getNativeName(nativeName: Interface['name']['nativeName']): string {
    return Object.values(nativeName).map(value => value.common).join(', ');
  }

  getCurrencies(currencies: Interface['currencies']): string {
    return Object.values(currencies).map(currency => currency.name).join(', ');
  }

  getLanguages(languages: Interface['languages']): string {
    return Object.values(languages).map(language => language.name).join(', ');
  }
}
