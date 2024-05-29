import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Interface } from '../../interface/interface';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  arrow = faArrowLeft;

  interfaceForm!: Interface[];

  constructor(private route: ActivatedRoute, private countryService: ServiceService) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getCountryDetails(params['name']);
    })
  }

  getCountryDetails(name: string) {
    this.countryService.getCountryByName(name).subscribe((country) => {
      this.interfaceForm = [country[0]]
    })
  }
}
