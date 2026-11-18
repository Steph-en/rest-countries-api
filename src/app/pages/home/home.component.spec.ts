import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Interface } from '../../interface/interface';
import { ServiceService } from '../../services/service.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: jasmine.SpyObj<ServiceService>;

  const mockCountryList: Interface[] = [
    {
      names: { alternates: [], common: 'Country1', official: 'Official Country1', native: {}, translations: {} },
      codes: { alpha_2: 'C1', alpha_3: 'C1' },
      region: 'Region1',
      population: 1000000,
      borders: [],
    },
    {
      names: { alternates: [], common: 'Country2', official: 'Official Country2', native: {}, translations: {} },
      codes: { alpha_2: 'C2', alpha_3: 'C2' },
      region: 'Region2',
      population: 2000000,
      borders: [],
    },
  ];

  beforeEach(async () => {
    service = jasmine.createSpyObj<ServiceService>(
      'ServiceService',
      ['getAllCountryData', 'getFilteredCountriesByRegion']
    );
    service.getAllCountryData.and.returnValue(of(mockCountryList));

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [FontAwesomeModule, CommonModule],
      providers: [
        { provide: ServiceService, useValue: service },
        provideRouter([]),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with country data', () => {
    expect(service.getAllCountryData).toHaveBeenCalled();
    expect(component.interfaceList.length).toEqual(mockCountryList.length);
    expect(component.filteredInterfaceList.length).toEqual(mockCountryList.length);
    expect(component.regions).toEqual(['Region1', 'Region2']);
  });

  it('explains how to fix an API-key origin rejection', () => {
    const apiError = new HttpErrorResponse({
      status: 403,
      error: {
        errors: [{ code: 'general.origin_not_allowed', message: 'Origin is not allowed' }],
      },
    });
    service.getAllCountryData.and.returnValue(throwError(() => apiError));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.apiError).toContain('"localhost"');
  });

  it('should toggle filter', () => {
    component.showFilter = false;
    component.toggle();
    expect(component.showFilter).toBeTrue();
    component.toggle();
    expect(component.showFilter).toBeFalse();
  });

  it('should filter countries by region', () => {
    const mockFilteredCountries: Interface[] = [mockCountryList[0]]; // Assuming only the first country belongs to 'Region1'
    service.getFilteredCountriesByRegion.and.returnValue(of(mockFilteredCountries));
    component.filterRegion('Region1');
    expect(service.getFilteredCountriesByRegion).toHaveBeenCalledWith('Region1');
    expect(component.filteredInterfaceList).toEqual(mockFilteredCountries);
  });

  it('should filter countries by search text', () => {
      const searchText = 'country1'; // Assuming 'Country1' is part of the search text
      component.interfaceList = mockCountryList; // Initialize interfaceList
      component.filterCountries({ target: { value: searchText } } as any); // Simulate event with search text
      expect(component.filteredInterfaceList.length).toEqual(1); // Only 'Country1' should match the search
      expect(component.filteredInterfaceList[0].names.common.toLowerCase()).toContain(searchText);
  });
});
