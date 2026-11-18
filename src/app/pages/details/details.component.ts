import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CountryLanguage, Interface, LocalizedName } from '../../interface/interface';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { isCountryApiOriginNotAllowed } from '../../services/country-api-error';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
  arrow = faArrowLeft;
  country!: Interface;
  borders: Interface[] = [];
  interfaceForm!: Interface[];
  apiError: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private countryService: ServiceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getCountryDetails(params['name']);
    });
  }

  getCountryDetails(name: string) {
    this.countryService.getCountryByName(name).subscribe({
      next: (countries) => {
        if (countries.length > 0) {
          this.apiError = null;
          this.country = countries[0];
          this.interfaceForm = [this.country];
          this.loadBorders(this.country.borders);
        } else {
          this.apiError = 'No country matched that name.';
        }
      },
      error: (error: unknown) => {
        if (isCountryApiOriginNotAllowed(error)) {
          this.apiError = `This site is not allowed for this API key. Add "${window.location.hostname}" under CORS allowed origins in the REST Countries dashboard, using the hostname only (no protocol or port).`;
        } else {
          this.apiError = error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)
            ? 'The country API rejected the key. Check that it is active and has access to this endpoint.'
            : 'Could not load country details. Check the API connection and try again.';
        }
      },
    });
  }

  loadBorders(borderCodes: string[]) {
    this.borders = []; // Clear the previous borders array
    if (borderCodes && borderCodes.length > 0) {
      borderCodes.forEach((borderCode) => {
        this.countryService.getCountryByCode(borderCode).subscribe((countries) => {
          if (countries.length > 0) {
            this.borders.push(countries[0]);
            console.log(countries);
            
          }
        });
      });
    }
  }

  getNativeName(nativeNames: Record<string, LocalizedName>): string {
    return Object.values(nativeNames).map((nativeName) => nativeName.common).join(', ');
  }

  getCurrencies(currencies: NonNullable<Interface['currencies']>): string {
    return currencies.map((currency) => currency.name).join(', ');
  }

  getLanguages(languages: CountryLanguage[]): string {
    return languages.map((language) => language.name).join(', ');
  }
}
