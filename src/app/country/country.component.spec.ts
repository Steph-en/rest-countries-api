import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Interface } from '../interface/interface';
import { CountryComponent } from './country.component';
import { ActivatedRoute } from '@angular/router';

describe('CountryComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>

  const mockCountry: Interface | null = {
    name: {
      common: 'Country', 
      official: 'Official Country',
      nativeName: {}
    },
    capital: 'Capital',
    population: 1000000,
    region: 'Region',
    subregion: 'Subregion',
    tld: '.c1',
    languages: { eng: { name: 'English', nativeName: 'English' } },
    currencies: { curr1: { name: 'Currency1', symbol: '$' } },
    borders: ['Border1', 'Border2'],
    flags: { png: 'flag.png', svg: 'flag.svg', alt: 'Flag of Country1' },
    cca3: 'C1',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryComponent,CommonModule],
      providers: [{
        provide: ActivatedRoute, useValue: activatedRoute
      }]
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
    expect(compiled.querySelector('.country-name')?.textContent).toContain(mockCountry.name.official);
    expect(compiled.querySelector('.capital')?.textContent).toContain('Capital: ' + mockCountry.capital);
    expect(compiled.querySelector('.population')?.textContent).toContain('Population: ' + mockCountry.population);
    expect(compiled.querySelector('.region')?.textContent).toContain('Region: ' + mockCountry.region);
  });
});
