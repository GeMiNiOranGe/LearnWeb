import { ANIMECHAN_BASE_URL } from '/scripts/config.js';
import { NETWORK_ERROR_MESSAGE } from '/scripts/constants.js';
import { AnimeQuoteRateLimitError } from '/scripts/error.js';
import {
    buildGoogleSearchUrl,
    getErrorMessage,
    html,
    isNetworkError,
} from '/scripts/utilities.js';

/**
 * @typedef {Object} AnimechanQuoteData
 * @property {string} content
 * @property {{
 *   id: number;
 *   name: string;
 *   altName: string | null;
 * }} anime
 * @property {{
 *   id: number;
 *   name: string;
 * }} character
 */

/**
 * @typedef {Object} AnimechanQuote
 * @property {string} status
 * @property {AnimechanQuoteData} data
 */

export async function setupAnimeQuotesPage() {
    const animeQuotesPage = /** @type {HTMLDivElement | null} */ (
        document.getElementById('anime-quotes-page')
    );

    if (!animeQuotesPage) {
        return;
    }

    try {
        const response = await fetch(`${ANIMECHAN_BASE_URL}/quotes/random`);

        if (response.status === 429) {
            throw new AnimeQuoteRateLimitError();
        }

        /** @type {AnimechanQuote} */
        const quote = await response.json();
        const { content, character, anime } = quote.data;

        const alternativeName =
            anime.altName && anime.name !== anime.altName
                ? ` (${anime.altName})`
                : '';

        const container = html(
            'div',
            undefined,
            html('q', { id: 'anime-quotes-page__content' }, content),
            html(
                'p',
                { id: 'anime-quotes-page__character' },
                '- ',
                html('a', {
                    className: 'anime-quotes-page__link',
                    href: buildGoogleSearchUrl(character.name),
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    textContent: character.name,
                }),
            ),
            html(
                'p',
                { id: 'anime-quotes-page__anime' },
                html('a', {
                    className: 'anime-quotes-page__link',
                    href: buildGoogleSearchUrl(anime.altName || anime.name),
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    textContent: `${anime.name}${alternativeName}`,
                }),
            ),
        );

        animeQuotesPage.replaceChildren(container);
    } catch (error) {
        const message = isNetworkError(error)
            ? NETWORK_ERROR_MESSAGE
            : getErrorMessage(error);

        animeQuotesPage.replaceChildren(
            html('p', { id: 'anime-quotes-page__content' }, message),
        );
    }
}
