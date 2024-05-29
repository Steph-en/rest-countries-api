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

  interfaceForm: Interface[] = [];
  interfaceList: Interface[] = [];

  constructor(private appService: ServiceService) {}

  ngOnInit(): void {
    this.appService.getAllCountryData().subscribe((interfaceForm: Interface[]) => {
      console.log(interfaceForm);
      this.interfaceList = interfaceForm;
    });
  }

  toggle() {
    const dropDown = document.querySelector(".drop-down") as HTMLElement;

    if (dropDown) {
      dropDown.style.display = dropDown.style.display === 'block' ? 'none' : 'block';
    }
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  // filterResults(text: string) {
  //   if (!text) {
  //     this.interfaceList = this.interfaceForm;
  //   } else {
  //     this.interfaceList = this.interfaceForm.filter((item: Interface) =>
  //       item.name.official.toLowerCase().includes(text.toLowerCase())
  //     );
  //   }
  //   console.log(text);
  // } 
}
