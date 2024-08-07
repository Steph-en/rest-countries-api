import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { CountryComponent } from "../../country/country.component";
import { Interface } from '../../interface/interface';
import { RouterOutlet } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [FontAwesomeModule, RouterOutlet, CountryComponent, CommonModule]
})

export class HomeComponent implements OnInit {
  search = faSearch;
  showFilter = false;
  arrow = faChevronDown;

  interfaceList: Interface[] = [];
  filteredInterfaceList: Interface[] = [];
  regions: string[] = [];

  constructor(private appService: ServiceService) {}

  ngOnInit(): void {
    this.appService.getAllCountryData().subscribe((interfaceForm: Interface[]) => {
      this.interfaceList = interfaceForm;
      this.filteredInterfaceList = [...this.interfaceList];
      this.regions = [...new Set(this.interfaceList.map(country => country.region))];
    });
  }

  toggle() {
    this.showFilter = !this.showFilter;
  }

  filterCountries(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchText = target.value.toLowerCase();
    this.filteredInterfaceList = this.interfaceList.filter((country) =>
      country.name.common.toLowerCase().includes(searchText)
    );
  }

  filterRegion(region: string) {
    this.appService.getFilteredCountriesByRegion(region).subscribe((filteredCountries) => {
      this.filteredInterfaceList = filteredCountries;
      this.showFilter =false;
    });
  }
}
