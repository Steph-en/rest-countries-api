import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiceService } from './service.service';
import { Interface } from '../interface/interface';
import { of } from 'rxjs';

describe('ServiceService', () => {
  let service: ServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceService]
    });
    service = TestBed.inject(ServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch country data from API', () => {
    const mockCountries: Interface[] = [];

    service.getAllCountryData().subscribe(countries => {
      expect(countries).toEqual(mockCountries);
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);
  });

  it('should filter countries by name', () => {
    const name = 'Country1';
    const mockCountries: Interface[] = [
      {
        name: {
          common: 'Country1',
          nativeName: {},
          official: ''
        }, capital: 'Capital1', population: 1000000, region: 'Region1', cca3: 'C1',
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
        }, capital: 'Capital2', population: 2000000, region: 'Region2', cca3: 'C2',
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
    ];
  
    spyOn(service, 'getAllCountryData').and.returnValue(of(mockCountries)); // Stubbing getAllCountryData method
  
    service.getCountryByName(name).subscribe(countries => {
      expect(countries.length).toBe(1);
      expect(countries[0].name.common).toBe(name);
    });
  });
});
