import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  search = faSearch;
  arrow = faChevronDown;

  toggle() {
    const dropBtn = document.querySelector(".filter-button") as HTMLElement;
    const dropDown = document.querySelector(".drop-down") as HTMLElement;

    if (dropBtn && dropDown) {
      dropDown.style.display = dropDown.style.display === 'block' ? 'none' : 'block';

    }
  }
}
