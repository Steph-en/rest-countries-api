import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiceService } from './service.service';
import { Interface } from '../interface/interface';

const countries: Interface[] = [
  {
    name: {
      common: 'Country1',
      nativeName: {},
      official: ''
    }, cca3: 'AAA',
    region: 'Region1',
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
    }, cca3: 'BBB',
    region: 'Region2',
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
    }, cca3: '',
    region: 'Region1',
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
  }
];


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
    service['allCountries'] = countries;

    const result = service.getCountryByName('Country1');
    result.subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data[0].name.common).toBe('Country1');
    });
  });

  it('should return the country with the given code', () => {
    const code = 'AAA';
    service['allCountries'] = countries

    const mockCountriesData = [
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
      }
    ]

    const countriesByCode = service.getCountryByCode(code)
    countriesByCode.subscribe((countries) => {
      expect(countries).toEqual(mockCountriesData);
    });
  });

  it('should return filtered countries by region', () => {
    service['allCountries'] = countries
    const mockFilteredCountries: Interface[] = [
      {
        name: {
          common: 'Country1',
          nativeName: {},
          official: ''
        }, cca3: 'AAA',
        region: 'Region1',
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


    service.getFilteredCountriesByRegion('Region1').subscribe((countries) => {
      filteredCountries = countries;
      expect(filteredCountries).toEqual(mockFilteredCountries);
    });
  });

  it('should return an empty array when getAllCountryData is called and there are no countries data available', () => {
    const expectedData: Interface[] = [];

    service.getAllCountryData().subscribe((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
    req.flush([]);
  });

  it('should return an empty array when the name parameter is empty', () => {
    const service: ServiceService = TestBed.inject(ServiceService);
    const name = '';

    service.getCountryByName(name).subscribe((result) => {
      expect(result).toEqual([]);
    });
  });
});
