import { CountryApi } from './country-api.model';

export interface CountriesFunctionResponse {
    countries: CountryApi[];
    total?: number;
}