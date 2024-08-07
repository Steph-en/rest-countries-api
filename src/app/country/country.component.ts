import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Interface } from '../interface/interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})

export class CountryComponent {
  @Input() interfaceForm!: Interface;
}
