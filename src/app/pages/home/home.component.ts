import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { DetailsComponent } from "../details/details.component";
import { CountryComponent } from "../../country/country.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [FontAwesomeModule, DetailsComponent, CountryComponent]
})
export class HomeComponent {
  search = faSearch;
  arrow = faChevronDown;

  toggle() {
    const dropDown = document.querySelector(".drop-down") as HTMLElement;

    if (dropDown) {
      dropDown.style.display = dropDown.style.display === 'block' ? 'none' : 'block';
    }
  }
}
