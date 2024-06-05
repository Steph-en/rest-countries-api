import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiceService } from './service.service';
import { Interface } from '../interface/interface';

describe('ServiceService', () => {
  let service: ServiceService;
  let httpMock: HttpTestingController;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceService]
    });
    service = TestBed.inject(ServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all country data from API', () => {
    service.getAllCountryData().subscribe((countries) => {
      expect(countries).toEqual(mockCountries);
    });

    const req = httpMock.expectOne(service['countryAPI']);
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);
  });

  it('should return cached country data if available', () => {
    service['allCountries'] = mockCountries;

    service.getAllCountryData().subscribe((countries) => {
      expect(countries).toEqual(mockCountries);
    });

    httpMock.expectNone(service['countryAPI']);
  });

  it('should fetch country data by name', () => {
    service['allCountries'] = mockCountries;

    service.getCountryByName('Country1').subscribe((countries) => {
      expect(countries.length).toBe(1);
      expect(countries[0].name.common).toBe('Country1');
    });
  });

  it('should fetch country data by code', () => {
    service['allCountries'] = mockCountries;

    service.getCountryByCode('C2').subscribe((countries) => {
      expect(countries.length).toBe(1);
      expect(countries[0].cca3).toBe('C2');
    });
  });

  it('should fetch filtered countries by region', () => {
    service['allCountries'] = mockCountries;

    service.getFilteredCountriesByRegion('Region1').subscribe((countries) => {
      expect(countries.length).toBe(2);
      expect(countries[0].region).toBe('Region1');
      expect(countries[1].region).toBe('Region1');
    });
  });

  it('should return an empty array if countries data is not available', () => {
    service['allCountries'] = null;

    service.getFilteredCountriesByRegion('Region1').subscribe((countries) => {
      expect(countries).toEqual([]);
    });
  });
});
