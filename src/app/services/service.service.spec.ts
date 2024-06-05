import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiceService } from './service.service';
import { Interface } from '../interface/interface';
import { Observable, of } from 'rxjs';

class ServiceServiceMock {
  getAllCountryData(): Observable<Interface[]> {
    return of([
      {
        name: { common: 'Country 1', nativeName: {}, official: 'Official Name 1' },
        capital: 'Capital 1',
        population: 1000000,
        region: 'Region 1',
        subregion: 'Subregion 1',
        tld: '.co',
        languages: {
          eng: { name: 'English', nativeName: 'English' }, // Valid language object
          spa: { name: 'Spanish', nativeName: 'Español' } // Valid language object
        },
        currencies: { usd: { name: 'US Dollar', symbol: '$' } },
        borders: ['Border 1', 'Border 2'],
        flags: { png: 'flag.png', svg: 'flag.svg', alt: 'Flag' },
        cca3: 'C1'
      },
      
    ]);
  }
}

describe('ServiceService', () => {
  let service: ServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ServiceService, useClass: ServiceServiceMock }]
    });
    service = TestBed.inject(ServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should return all country data', () => {
    service.getAllCountryData().subscribe((countries) => {
      expect(countries.length).toBe(2);
      expect(countries[0].name.common).toBe('Country 1');
      expect(countries[0].cca3).toBe('C1');
      expect(countries[0].region).toBe('Region 1');
      expect(countries[1].name.common).toBe('Country 2');
      expect(countries[1].cca3).toBe('C2');
      expect(countries[1].region).toBe('Region 2');
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
    expect(req.request.method).toBe('GET');
    req.flush([{ name: { common: 'Country 1' }, cca3: 'C1', region: 'Region 1' }, { name: { common: 'Country 2' }, cca3: 'C2', region: 'Region 2' }]);
  });

  it('should return the country with the given name', () => {
    const countries: Interface[] = [
      {
        name: {
          common: 'Country1',
          nativeName: {},
          official: ''
        }, cca3: 'AAA', region: 'Region1',
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
        }, cca3: 'BBB', region: 'Region2',
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
    service.getAllCountryData().subscribe();
    const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
    req.flush(countries);

    const result = service.getCountryByName('Country1');
    result.subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data[0].name.common).toBe('Country1');
    });
  });

  it('should return the country with the given code', () => {
    const code = 'USA';
    const mockCountries: Interface[] = [
      {
        name: {
          common: 'United States of America',
          nativeName: {},
          official: ''
        }, cca3: 'USA', region: 'Americas',
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

    service.getCountryByCode(code).subscribe((countries) => {
      expect(countries).toEqual(mockCountries);
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);
  });

  it('should return filtered countries by region', () => {
    const mockCountries: Interface[] = [
      {
        name: {
          common: 'Country1',
          nativeName: {},
          official: ''
        }, region: 'Region1',
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
        },
        cca3: ''
      },
      {
        name: {
          common: 'Country2',
          nativeName: {},
          official: ''
        }, region: 'Region2',
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
        },
        cca3: ''
      },
      {
        name: {
          common: 'Country3',
          nativeName: {},
          official: ''
        }, region: 'Region1',
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
        },
        cca3: ''
      }
    ];
    const mockFilteredCountries: Interface[] = [
      {
        name: {
          common: 'Country1',
          nativeName: {},
          official: ''
        }, region: 'Region1',
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
        },
        cca3: ''
      },
      {
        name: {
          common: 'Country3',
          nativeName: {},
          official: ''
        }, region: 'Region1',
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
        },
        cca3: ''
      }
    ];
    let filteredCountries: Interface[];

    service.getAllCountryData().subscribe(() => {
      service.getFilteredCountriesByRegion('Region1').subscribe((countries) => {
        filteredCountries = countries;
        expect(filteredCountries).toEqual(mockFilteredCountries);
      });
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
    req.flush(mockCountries);
  });

  it('should return an empty array when getAllCountryData is called and there are no countries data available', () => {
    const expectedData: Interface[] = [];

    service.getAllCountryData().subscribe((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
    expect(req.request.method).toBe('GET');
    req.flush([]);

    httpMock.verify();
  });

  it('should return an empty array when the name parameter is empty', () => {
    const service: ServiceService = TestBed.inject(ServiceService);
    const name = '';
  
    service.getCountryByName(name).subscribe((result) => {
      expect(result).toEqual([]);
    });
  });
});
