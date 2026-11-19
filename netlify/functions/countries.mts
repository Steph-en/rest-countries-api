
const API_URL = 'https://api.restcountries.com/countries/v5';
const PAGE_SIZE = 100;

export default async (request: Request) => {
    if (request.method !== 'GET') {
        return Response.json(
        { message: 'Method not allowed' },
        { status: 405 }
        );
    }

    const apiKey = process.env.COUNTRIES_API_KEY;

    if (!apiKey) {
        return Response.json(
        { message: 'Country API configuration is missing' },
        { status: 500 }
        );
    }

    try {
        const countries: unknown[] = [];
        let offset = 0;
        let hasMore = true;
        let expectedTotal: number | null = null;

        while (hasMore) {
        const url = new URL(API_URL);

        url.searchParams.set('limit', String(PAGE_SIZE));
        url.searchParams.set('offset', String(offset));
        url.searchParams.set(
            'response_fields_omit',
            'names.translations,leaders'
        );

        const response = await fetch(url, {
            headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: 'application/json'
            }
        });

        if (!response.ok) {
            return Response.json(
            { message: 'Unable to retrieve country data' },
            { status: 502 }
            );
        }

        const result = await response.json();

        const page = result?.data?.objects;
        const meta = result?.data?.meta;

        if (typeof meta.total !== 'number') {
            throw new Error('Invalid country total in API response');
        }

        if (expectedTotal === null) {
            expectedTotal = meta.total;
        } else if (expectedTotal !== meta.total) {
            throw new Error('Country total changed during pagination');
        }

        if (!Array.isArray(page) || !meta) {
            return Response.json(
            { message: 'Unexpected response from country provider' },
            { status: 502 }
            );
        }

        countries.push(...page);

        hasMore = meta.more === true;
        offset += page.length;

        // Protect against an unexpected pagination loop.
        if (page.length === 0 && hasMore) {
            throw new Error('Invalid pagination response');
        }
    }

    if (
        expectedTotal === null ||
        countries.length !== expectedTotal
    ) {
        return Response.json(
            { message: 'Country data is incomplete' },
            { status: 502 }
        );
    }

    return Response.json({
        countries,
        total: expectedTotal
    });

    } catch {
    return Response.json(
        { message: 'An error occurred while loading countries' },
        { status: 500 }
    );
    }
};
