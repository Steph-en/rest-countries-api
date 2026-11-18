export interface CountryApiResponse {
    data: {
        objects: Interface[];
        meta: {
            total: number;
            count: number;
            limit: number;
            offset: number;
            more: boolean;
            request_id: string;
            duration: number;
        };
    };
}

export interface Interface {
    names: {
        alternates: string[];
        common: string;
        native: Record<string, LocalizedName>;
        official: string;
        translations: Record<string, LocalizedName>;
    };
    codes: {
        alpha_2: string;
        alpha_3: string;
        ccn3?: string;
        cioc?: string;
        fifa?: string;
        fips?: string;
        gec?: string;
    };
    capitals?: Capital[];
    flag?: {
        colors: {
            dominant: string;
            palette: Array<{ hex: string; proportion: number }>;
            prominent: string;
            swatches: Record<string, string | null>;
        };
        description: string;
        emoji: string;
        html_entity: string;
        unicode: string;
        url_png: string;
        url_svg: string;
    };
    region: string;
    subregion?: string;
    area?: { 
        kilometers: number; 
        miles: number 
    };
    assets?: unknown[];
    borders: string[];
    calling_codes?: string[];
    cars?: { 
        driving_side: string; 
        signs: string[] 
    };
    classification?: {
        dependency: boolean;
        dependency_type: string;
        disputed: boolean;
        iso_status: string;
        sovereign: boolean;
        un_member: boolean;
        un_observer: boolean;
    };
    continents?: string[];
    coordinates?: { 
        lat: number; 
        lng: number 
    };
    currencies?: Array<{ 
        code: string; 
        name: string; 
        symbol: string 
    }>;
    date?: {
        academic_year_start: { 
            day: number; 
            month: number 
        };
        fiscal_year_start: {
            corporate: { basis: string; day: number; month: number };
            government: { day: number; month: number };
            personal: { day: number; month: number };
        };
        start_of_week: string;
    };
    demonyms?: Record<string, { f: string; m: string }>;
    descriptions?: { long: string; short: string };
    economy?: { gini_coefficient: Record<string, number> };
    government_type?: string;
    landlocked?: boolean;
    languages?: CountryLanguage[];
    leaders?: Array<{ message?: string; sample?: string }>;
    links?: {
        google_maps?: string;
        official?: string;
        open_street_maps?: string;
        wikipedia?: string;
    };
    memberships?: Record<string, boolean>;
    number_format?: { decimal_separator: string; thousands_separator: string };
    parent?: { alpha_2: string; alpha_3: string };
    population: number;
    postal_code?: { format: string; regex: string };
    timezones?: string[];
    tlds?: string[];
    units?: { measurement_system: string; temperature_scale: string };
    uuid?: string;
    _match?: Array<{ path: string; value: string }>;
    _meta?: { lastUpdatedTimestamp: number };
}

export interface LocalizedName {
    common: string;
    official: string;
}

export interface Capital {
    attributes: {
        administrative: boolean;
        constitutional: boolean;
        executive: boolean;
        judicial: boolean;
        legislative: boolean;
        primary: boolean;
    };
    coordinates: { lat: number; lng: number };
    name: string;
}

export interface CountryLanguage {
    bcp47: string;
    iso639_1: string;
    iso639_2b: string;
    iso639_2t: string;
    iso639_3: string;
    name: string;
    native_name: string;
}
