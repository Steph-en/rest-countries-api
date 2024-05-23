import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HomeComponent]
})
export class AppComponent implements OnInit{
  title = 'rest-countries-api';

  constructor() {}

  toggle() {
    const theme = document.documentElement.classList.toggle('dark');

    localStorage.setItem("theme", theme ? 'dark' : 'light');
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  
  ngOnInit() {
    this.initializeTheme();
  }
}
