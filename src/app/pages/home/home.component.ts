import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { CountryComponent } from "../../country/country.component";
import { Interface } from '../../interface/interface';
import { ServiceService } from '../../services/service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { isCountryApiOriginNotAllowed } from '../../services/country-api-error';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [FontAwesomeModule, CountryComponent, CommonModule]
})

export class HomeComponent implements OnInit {
  search = faSearch;
  showFilter = false;
  arrow = faChevronDown;

  interfaceList: Interface[] = [];
  filteredInterfaceList: Interface[] = [];
  regions: string[] = [];
  apiError: string | null = null;

  constructor(private appService: ServiceService) {}

  ngOnInit(): void {
    this.appService.getAllCountryData().subscribe({
      next: (countries) => {
        this.interfaceList = countries;
        this.filteredInterfaceList = [...this.interfaceList];
        this.regions = [...new Set(this.interfaceList.map(country => country.region))];
      },
      error: (error: unknown) => {
        if (isCountryApiOriginNotAllowed(error)) {
          this.apiError = `This site is not allowed for this API key. Add "${window.location.hostname}" under CORS allowed origins in the REST Countries dashboard, using the hostname only (no protocol or port).`;
        } else if (error instanceof HttpErrorResponse && error.status === 0) {
          this.apiError = 'Could not reach the country API. Check your connection or browser CORS settings.';
        } else if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
          this.apiError = 'The country API rejected the key. Check that it is active and has access to this endpoint.';
        } else if (error instanceof HttpErrorResponse) {
          this.apiError = `The country API request failed (HTTP ${error.status}).`;
        } else {
          this.apiError = 'An unexpected error occurred while loading countries.';
        }
      },
    });
  }

  toggle() {
    this.showFilter = !this.showFilter;
  }

  filterCountries(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchText = target.value.toLowerCase();
    this.filteredInterfaceList = this.interfaceList.filter((country) =>
      country.names.common.toLowerCase().includes(searchText)
    );
  }

  filterRegion(region: string) {
    this.appService.getFilteredCountriesByRegion(region).subscribe((filteredCountries) => {
      this.filteredInterfaceList = filteredCountries;
      this.showFilter =false;
    });
  }
}
