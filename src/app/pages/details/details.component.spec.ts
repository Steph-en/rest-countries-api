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
    names: {
      alternates: [],
      common: 'Country1',
      official: 'Official Country1',
      native: {
        eng: {
          official: 'Official Country1 Native',
          common: 'Country1 Native'
        }
      },
      translations: {}
    },
    codes: { alpha_2: 'C1', alpha_3: 'C1' },
    region: 'Region1',
    subregion: 'Subregion1',
    population: 1000000,
    capitals: [],
    borders: ['C2'],
    languages: [{ bcp47: 'en', iso639_1: 'en', iso639_2b: 'eng', iso639_2t: 'eng', iso639_3: 'eng', name: 'English', native_name: 'English' }],
    currencies: [{ code: 'CUR1', name: 'Currency1', symbol: '$' }],
  };

  const mockBorderCountry: Interface = {
    names: {
      alternates: [],
      common: 'Country2',
      official: 'Official Country2',
      native: {
        eng: {
          official: 'Official Country2 Native',
          common: 'Country2 Native'
        }
      },
      translations: {}
    },
    codes: { alpha_2: 'C2', alpha_3: 'C2' },
    region: 'Region2',
    subregion: 'Subregion2',
    population: 2000000,
    capitals: [],
    borders: [],
    languages: [{ bcp47: 'en', iso639_1: 'en', iso639_2b: 'eng', iso639_2t: 'eng', iso639_3: 'eng', name: 'English', native_name: 'English' }],
    currencies: [{ code: 'CUR2', name: 'Currency2', symbol: '€' }],
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
    const nativeName = component.getNativeName(mockCountry.names.native);
    expect(nativeName).toBe('Country1 Native');
  });

  it('should return currencies correctly', () => {
    const currencies = component.getCurrencies(mockCountry.currencies ?? []);
    expect(currencies).toBe('Currency1');
  });

  it('should return languages correctly', () => {
    const languages = component.getLanguages(mockCountry.languages ?? []);
    expect(languages).toBe('English');
  });
});
