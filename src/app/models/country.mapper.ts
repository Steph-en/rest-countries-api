import { CountryApi } from './country-api.model';
import { Interface } from '../interface/interface';

export function mapCountryApiToCountry(
    country: CountryApi
): Interface {
    return {
        name: {
            common: country.names.common,
            official: country.names.official,
            nativeName: country.names.native ?? {},
        },

        capital: country.capitals?.[0]?.name ?? '',

        population: country.population,

        region: country.region ?? '',

        subregion: country.subregion ?? '',

        tld: country.tlds?.[0] ?? '',

        languages: Object.fromEntries(
            (country.languages ?? []).map((language) => [
                language.iso639_3 ?? language.bcp47 ?? language.name,
                {
                name: language.name,
                nativeName: language.native_name ?? '',
                },
            ])
        ),

        currencies: Object.fromEntries(
            (country.currencies ?? []).map((currency) => [
                currency.code,
                {
                name: currency.name,
                symbol: currency.symbol,
                },
            ])
        ),

        borders: country.borders ?? [],

        flags: {
            png: country.flag?.url_png ?? '',
            svg: country.flag?.url_svg ?? '',
            alt: country.flag?.description ?? '',
        },

        cca3: country.codes.alpha_3,
    };
}