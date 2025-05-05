export class PageNotFoundError extends Error {
    constructor() {
        super('Page not found');
    }
}

export class AnimeQuoteRateLimitError extends Error {
    constructor() {
        super('You may have viewed all 20 quotes. Please come back in 1 hour');
    }
}
