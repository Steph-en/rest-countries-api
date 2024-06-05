import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CountryComponent } from "../../country/country.component";
import { RouterOutlet } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { Interface } from '../../interface/interface';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: ServiceService;

  const mockCountries: Interface[] = [
    {
      name: {
        common: 'Country1',
        nativeName: {},
        official: ''
      }, cca3: 'C1', region: 'Region1',
      capital: '',
      population: 0,
      subregion: '',
      tld: '',
      languages: {},
      currencies: {},
      borders: [],
      flags: {
        png: '',
        svg: '',
        alt: ''
      }
    },
    {
      name: {
        common: 'Country2',
        nativeName: {},
        official: ''
      }, cca3: 'C2', region: 'Region2',
      capital: '',
      population: 0,
      subregion: '',
      tld: '',
      languages: {},
      currencies: {},
      borders: [],
      flags: {
        png: '',
        svg: '',
        alt: ''
      }
    },
    {
      name: {
        common: 'Country3',
        nativeName: {},
        official: ''
      }, cca3: 'C3', region: 'Region1',
      capital: '',
      population: 0,
      subregion: '',
      tld: '',
      languages: {},
      currencies: {},
      borders: [],
      flags: {
        png: '',
        svg: '',
        alt: ''
      }
    }
  ];

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('ServiceService', ['getAllCountryData', 'getFilteredCountriesByRegion']);
    serviceSpy.getAllCountryData.and.returnValue(of(mockCountries));
    serviceSpy.getFilteredCountriesByRegion.and.returnValue(of([mockCountries[0], mockCountries[2]]));

    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        RouterOutlet,
        CountryComponent,
        CommonModule,
        HomeComponent
      ],
      providers: [{ provide: ServiceService, useValue: serviceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and fetch country data', () => {
    expect(component.interfaceList.length).toBe(3);
    expect(component.filteredInterfaceList.length).toBe(3);
    expect(component.regions.length).toBe(2); // 'Region1' and 'Region2'
  });

  it('should filter countries by name', () => {
    const inputEvent = {
      target: { value: 'Country1' }
    } as unknown as Event;

    component.filterCountries(inputEvent);
    fixture.detectChanges();

    expect(component.filteredInterfaceList.length).toBe(1);
    expect(component.filteredInterfaceList[0].name.common).toBe('Country1');
  });

  it('should filter countries by region', () => {
    component.filterRegion('Region1');
    fixture.detectChanges();

    expect(component.filteredInterfaceList.length).toBe(2);
    expect(component.filteredInterfaceList[0].region).toBe('Region1');
    expect(component.filteredInterfaceList[1].region).toBe('Region1');
  });

  it('should toggle filter visibility', () => {
    expect(component.showFilter).toBe(false);

    component.toggle();
    fixture.detectChanges();
    expect(component.showFilter).toBe(true);

    component.toggle();
    fixture.detectChanges();
    expect(component.showFilter).toBe(false);
  });
});
