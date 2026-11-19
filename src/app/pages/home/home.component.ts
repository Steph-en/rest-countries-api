import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { CountryComponent } from '../../country/country.component';
import { Interface } from '../../interface/interface';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [FontAwesomeModule, CountryComponent, CommonModule]
})
export class HomeComponent implements OnInit {
  search = faSearch;
  arrow = faChevronDown;

  showFilter = false;
  isLoading = false;
  loadError: string | null = null;

  interfaceList: Interface[] = [];
  filteredInterfaceList: Interface[] = [];
  regions: string[] = [];

  searchText = '';
  selectedRegion: string | null = null;

  constructor(private appService: ServiceService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.isLoading = true;
    this.loadError = null;
  
    this.appService.getAllCountryData()
      .pipe(
        catchError(error => {
          console.error('Failed to load countries:', error);
          this.loadError = 'Unable to load countries. Please try again.';
          return of([] as Interface[]);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(countries => {
        console.log('Countries received:', countries.length);
  
        this.interfaceList = countries;
  
        this.regions = [
          ...new Set(
            countries
              .map(country => country.region)
              .filter(region => region.trim() !== '')
          )
        ].sort();
  
        this.applyFilters();
  
        console.log('Filtered countries:', this.filteredInterfaceList.length);
  
        // Diagnostic: explicitly update the component's view.
        this.cdr.detectChanges();
      });
  }

  toggle(): void {
    this.showFilter = !this.showFilter;
  }

  filterCountries(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchText = target.value.trim().toLowerCase();

    this.applyFilters();
  }

  filterRegion(region: string | null): void {
    this.selectedRegion = region;
    this.showFilter = false;

    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredInterfaceList = this.interfaceList.filter(country => {
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(this.searchText);

      const matchesRegion = !this.selectedRegion ||
        country.region.toLowerCase() === this.selectedRegion.toLowerCase();

      return matchesSearch && matchesRegion;
    });
  }
}
