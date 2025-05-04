import { ANIMECHAN_BASE_URL } from '../../scripts/config.js';

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
    /** @type {HTMLDivElement | null} */
    const animeQuotesPage = document.getElementById('anime-quotes-page');

    if (!animeQuotesPage) {
        return;
    }

    const response = await fetch(`${ANIMECHAN_BASE_URL}/quotes/random`);

    /** @type {AnimechanQuote} */
    const quote = await response.json();

    const loader = animeQuotesPage.querySelector('.loader');

    if (loader) {
        animeQuotesPage.removeChild(loader);
    }

    const alternativeName =
        quote.data.anime.altName &&
        quote.data.anime.name !== quote.data.anime.altName
            ? ` (${quote.data.anime.altName})`
            : '';

    animeQuotesPage.innerHTML = `
        <div>
            <q id="anime-quotes-page__content">${quote.data.content}</q>
            <p id="anime-quotes-page__character">- ${quote.data.character.name}</p>
            <p id="anime-quotes-page__anime">${quote.data.anime.name}${alternativeName}</p>
        </div>
    `;
}
