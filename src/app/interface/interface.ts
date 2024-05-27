export interface Interface {
    name: {
        common: string;
        nativeName: {
            [key: string]: {
                official: string;
                common: string;
            };
        };
        official: string;
    };
    capital: string;
    population: number;
    region: string;
    subregion: string;
    tld: string;
    languages: {
        [key: string]: {
            name: string;
            nativeName: string;
        };
    };
    currencies: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    borders: string[];
    flags: {
        png: string;
        svg: string;
        alt: string;
    };
    cca3: string;
}
