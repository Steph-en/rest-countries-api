import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DetailsComponent } from './details.component';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { Interface } from '../../interface/interface';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let service: ServiceService;

  const mockCountry: Interface = {
    name: { 
      common: 'Country1', 
      official: 'Official Country1', 
      nativeName: {
        eng: {
          official: 'Official Country1 Native',
          common: 'Country1 Native'
        }
      }
    },
    cca3: 'C1',
    region: 'Region1',
    subregion: 'Subregion1',
    population: 1000000,
    capital: 'Capital1',
    flags: { png: 'https://flag.url', svg: 'https://flag.url', alt: 'Flag of Country1' },
    borders: ['C2'],
    tld: '.c1',
    languages: { eng: { name: 'English', nativeName: 'English' } },
    currencies: { curr1: { name: 'Currency1', symbol: '$' } },
  };

  const mockBorderCountry: Interface = {
    name: { 
      common: 'Country2', 
      official: 'Official Country2', 
      nativeName: {
        eng: {
          official: 'Official Country2 Native',
          common: 'Country2 Native'
        }
      }
    },
    cca3: 'C2',
    region: 'Region2',
    subregion: 'Subregion2',
    population: 2000000,
    capital: 'Capital2',
    flags: { png: 'https://flag2.url', svg: 'https://flag2.url', alt: 'Flag of Country2' },
    borders: [],
    tld: '.c2',
    languages: { eng: { name: 'English', nativeName: 'English' } },
    currencies: { curr2: { name: 'Currency2', symbol: '€' } },
  };

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('ServiceService', ['getCountryByName', 'getCountryByCode']);
    serviceSpy.getCountryByName.and.returnValue(of([mockCountry]));
    serviceSpy.getCountryByCode.and.returnValue(of([mockBorderCountry]));

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FontAwesomeModule,
        RouterModule,
        DetailsComponent
      ],
      providers: [
        { provide: ServiceService, useValue: serviceSpy },
        { provide: ActivatedRoute, useValue: { params: of({ name: 'Country1' }) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ServiceService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize and fetch country details based on route param', () => {
    fixture.detectChanges();

    expect(service.getCountryByName).toHaveBeenCalledWith('Country1');
    expect(component.country).toEqual(mockCountry);
  });

  it('should load border countries', () => {
    fixture.detectChanges();

    expect(service.getCountryByCode).toHaveBeenCalledWith('C2');
    expect(component.borders.length).toBe(1);
    expect(component.borders[0]).toEqual(mockBorderCountry);
  });

  it('should return native name correctly', () => {
    const nativeName = component.getNativeName(mockCountry.name.nativeName);
    expect(nativeName).toBe('Country1 Native');
  });

  it('should return currencies correctly', () => {
    const currencies = component.getCurrencies(mockCountry.currencies);
    expect(currencies).toBe('Currency1');
  });

  it('should return languages correctly', () => {
    const languages = component.getLanguages(mockCountry.languages);
    expect(languages).toBe('English');
  });
});
