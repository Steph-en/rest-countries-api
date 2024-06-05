import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Interface } from '../interface/interface';
import { CountryComponent } from './country.component';

describe('CountryComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;

  const mockCountry: Interface = {
    name: {
      common: 'Country1', official: 'Official Country1',
      nativeName: {}
    },
    capital: 'Capital1',
    population: 1000000,
    region: 'Region1',
    subregion: 'Subregion1',
    tld: '.c1',
    languages: { eng: { name: 'English', nativeName: 'English' } },
    currencies: { curr1: { name: 'Currency1', symbol: '$' } },
    borders: ['Border1', 'Border2'],
    flags: { png: 'flag.png', svg: 'flag.svg', alt: 'Flag of Country1' },
    cca3: 'C1',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountryComponent],
      imports: [CommonModule, RouterModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryComponent);
    component = fixture.componentInstance;
    component.interfaceForm = mockCountry;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render country details', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.country-name').textContent).toContain(mockCountry.name.common);
    expect(compiled.querySelector('.capital').textContent).toContain('Capital: ' + mockCountry.capital);
    expect(compiled.querySelector('.population').textContent).toContain('Population: ' + mockCountry.population);
    // Add more expectations for other details as needed
  });
});
