import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CountryApiResponse, Interface } from '../interface/interface';
import { ServiceService } from './service.service';

function makeCountry(common: string, alpha3: string, region: string): Interface {
  return {
    names: {
      alternates: [],
      common,
      native: {},
      official: common,
      translations: {},
    },
    codes: { alpha_2: alpha3.slice(0, 2), alpha_3: alpha3 },
    region,
    population: 0,
    borders: [],
  };
}

describe('ServiceService', () => {
  let service: ServiceService;
  let httpMock: HttpTestingController;

  const countries = [
    makeCountry('Country1', 'AAA', 'Region1'),
    makeCountry('Country2', 'BBB', 'Region2'),
    makeCountry('Country3', 'CCC', 'Region1'),
  ];

  function makeResponse(objects: Interface[], offset: number, total: number): CountryApiResponse {
    return {
      data: {
        objects,
        meta: {
          total,
          count: objects.length,
          limit: 100,
          offset,
          more: offset + objects.length < total,
          request_id: 'test-request',
          duration: 1,
        },
      },
    };
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceService],
    });
    service = TestBed.inject(ServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('uses bearer authentication and unwraps the API response', () => {
    service.getAllCountryData().subscribe((result) => {
      expect(result).toEqual(countries);
      expect(result[0].names.common).toBe('Country1');
      expect(result[0].codes.alpha_3).toBe('AAA');
    });

    const request = httpMock.expectOne((req) => req.url === service['countryAPI']);
    expect(request.request.method).toBe('GET');
    expect(request.request.headers.get('Authorization')).toMatch(/^Bearer \S+$/);
    expect(request.request.params.get('limit')).toBe('100');
    expect(request.request.params.get('offset')).toBe('0');
    request.flush(makeResponse(countries, 0, countries.length));
  });

  it('loads all pages before returning country data', () => {
    const results: Interface[][] = [];
    service.getAllCountryData().subscribe((result) => results.push(result));

    httpMock.expectOne((req) => req.url === service['countryAPI']).flush(
      makeResponse(countries.slice(0, 2), 0, countries.length)
    );
    httpMock.expectOne((req) =>
      req.url === service['countryAPI'] && req.params.get('offset') === '2'
    ).flush(makeResponse(countries.slice(2), 2, countries.length));

    expect(results).toEqual([countries]);
  });

  it('returns a country by common name and alpha-3 code', () => {
    service['allCountries'] = countries;

    service.getCountryByName('Country1').subscribe((result) => {
      expect(result).toEqual([countries[0]]);
    });
    service.getCountryByCode('BBB').subscribe((result) => {
      expect(result).toEqual([countries[1]]);
    });
  });

  it('filters countries by region without case sensitivity', () => {
    service['allCountries'] = countries;

    service.getFilteredCountriesByRegion('region1').subscribe((result) => {
      expect(result).toEqual([countries[0], countries[2]]);
    });
  });

  it('loads country data when a details route requests a country first', () => {
    service.getCountryByName('country1').subscribe((result) => {
      expect(result).toEqual([countries[0]]);
    });

    httpMock.expectOne((req) => req.url === service['countryAPI']).flush(
      makeResponse(countries, 0, countries.length)
    );
  });
});
