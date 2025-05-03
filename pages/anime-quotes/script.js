import { ANIMECHAN_BASE_URL } from '../../scripts/config.js';

/**
 * @typedef {Object} AnimechanQuoteData
 * @property {string} content
 * @property {{
 *   id: number;
 *   name: string;
 *   altName: string;
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

    document.getElementById(
        'anime-quotes-content',
    ).innerHTML = `"${quote.data.content}"`;

    document.getElementById(
        'anime-quotes-character',
    ).innerHTML = `- ${quote.data.character.name}`;

    document.getElementById(
        'anime-quotes-anime',
    ).innerHTML = `${quote.data.anime.name} (${quote.data.anime.altName})`;
}
