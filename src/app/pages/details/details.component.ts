import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Interface } from '../../interface/interface';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';

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
    this.countryService.getCountryByName(name).subscribe((countries) => {
      if (countries.length > 0) {
        this.country = countries[0];
        this.interfaceForm = [this.country];
        this.loadBorders(this.country.borders);
      }
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

  getNativeName(nativeName: { [key: string]: any }): string {
    return Object.values(nativeName).map(nativeName => nativeName.common).join(', ');
  }

  getCurrencies(currencies: { [key: string]: any }): string {
    return Object.values(currencies).map(currency => currency.name).join(', ');
  }

  getLanguages(languages: { [key: string]: { name: string; nativeName: string } }){
    return Object.values(languages);
  }
}
