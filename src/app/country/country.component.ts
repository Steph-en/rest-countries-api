import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Interface } from '../interface/interface';
import { RouterModule } from '@angular/router';
// import { ServiceService } from '../services/service.service';


@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent {
  @Input() interfaceForm!: Interface;
}
