import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Interface } from '../../interface/interface';
import { ServiceService } from '../../services/service.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  // let component: HomeComponent;
  // let fixture: ComponentFixture<HomeComponent>;
  // let service: ServiceService;

  // const mockCountryList: Interface[] = [
  //   {
  //     name: {
  //       common: 'Country1', official: 'Official Country1',
  //       nativeName: {}
  //     }, region: 'Region1', population: 1000000, capital: 'Capital1', borders: [], flags: {
  //       svg: 'flag.svg',
  //       png: '',
  //       alt: ''
  //     }, cca3: 'C1',
  //     subregion: '',
  //     tld: '',
  //     languages: {},
  //     currencies: {}
  //   },
  //   {
  //     name: {
  //       common: 'Country2', official: 'Official Country2',
  //       nativeName: {}
  //     }, region: 'Region2', population: 2000000, capital: 'Capital2', borders: [], flags: {
  //       svg: 'flag.svg',
  //       png: '',
  //       alt: ''
  //     }, cca3: 'C2',
  //     subregion: '',
  //     tld: '',
  //     languages: {},
  //     currencies: {}
  //   },
  //   // Add more mock countries as needed
  // ];

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [HomeComponent],
  //     imports: [FontAwesomeModule, CommonModule],
  //     providers: [ServiceService]
  //   }).compileComponents();
  // });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(HomeComponent);
  //   component = fixture.componentInstance;
  //   service = TestBed.inject(ServiceService);

  //   // Stub the getAllCountryData method to return mock data
  //   spyOn(service, 'getAllCountryData').and.returnValue(of(mockCountryList));

  //   fixture.detectChanges();
  // });

  it('should create', () => {
    // expect(component).toBeTruthy();

    pending();
  });

  it('should initialize with country data', () => {
    // expect(service.getAllCountryData).toHaveBeenCalled();
    // expect(component.interfaceList.length).toEqual(mockCountryList.length);
    // expect(component.filteredInterfaceList.length).toEqual(mockCountryList.length);
    // expect(component.regions).toEqual(['Region1', 'Region2']); // Assuming all mock countries have different regions

    pending();
  });

  it('should toggle filter', () => {
    // component.showFilter = false;
    // component.toggle();
    // expect(component.showFilter).toBeTrue();
    // component.toggle();
    // expect(component.showFilter).toBeFalse();

    pending();
  });

  it('should filter countries by region', () => {
    // const mockFilteredCountries: Interface[] = [mockCountryList[0]]; // Assuming only the first country belongs to 'Region1'
    // spyOn(service, 'getFilteredCountriesByRegion').and.returnValue(of(mockFilteredCountries));
    // component.filterRegion('Region1');
    // expect(service.getFilteredCountriesByRegion).toHaveBeenCalledWith('Region1');
    // expect(component.filteredInterfaceList).toEqual(mockFilteredCountries);

    pending();
  });

  it('should filter countries by search text', () => {
    //   const searchText = 'country1'; // Assuming 'Country1' is part of the search text
    //   component.interfaceList = mockCountryList; // Initialize interfaceList
    //   component.filterCountries({ target: { value: searchText } } as any); // Simulate event with search text
    //   expect(component.filteredInterfaceList.length).toEqual(1); // Only 'Country1' should match the search
    //   expect(component.filteredInterfaceList[0].name.common.toLowerCase()).toContain(searchText);
    pending();
  });

});
