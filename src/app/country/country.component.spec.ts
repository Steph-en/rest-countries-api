import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Interface } from '../interface/interface';
import { CountryComponent } from './country.component';
import { provideRouter } from '@angular/router';

describe('CountryComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;

  const mockCountry: Interface = {
    names: {
      alternates: [],
      common: 'Country', 
      official: 'Official Country',
      native: {},
      translations: {}
    },
    codes: { alpha_2: 'C1', alpha_3: 'C1' },
    capitals: [{
      attributes: {
        administrative: false,
        constitutional: false,
        executive: false,
        judicial: false,
        legislative: false,
        primary: true
      },
      coordinates: { lat: 0, lng: 0 },
      name: 'Capital'
    }],
    population: 1000000,
    region: 'Region',
    borders: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryComponent,CommonModule],
      providers: [provideRouter([])]
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
    expect(compiled.querySelector('.country')?.textContent).toContain(mockCountry.names.common);
    expect(compiled.querySelector('.capital')?.textContent).toContain('Capital: ' + mockCountry.capitals?.[0].name);
    expect(compiled.querySelector('.population')?.textContent).toContain('Population: ' + mockCountry.population);
    expect(compiled.querySelector('.region')?.textContent).toContain('Region: ' + mockCountry.region);
  });
});
