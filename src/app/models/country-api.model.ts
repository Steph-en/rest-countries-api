export interface CountryApi {
    names: {
        common: string;
        official: string;
        native?: Record<
            string,
            {
                common: string;
                official: string;
            }
        >;
    };

    codes: {
        alpha_3: string;
    };

    capitals?: Array<{
        name: string;
    }>;

    flag?: {
        url_png?: string;
        url_svg?: string;
        description?: string;
    };

    region?: string;
    subregion?: string;
    population: number;
    borders?: string[];

    tlds?: string[];

    languages?: Array<{
        iso639_3?: string;
        bcp47?: string;
        name: string;
        native_name?: string;
    }>;

    currencies?: Array<{
        code: string;
        name: string;
        symbol: string;
    }>;
}