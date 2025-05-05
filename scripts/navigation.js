import { PageNotFoundError } from './error.js';
import { getErrorMessage } from './utilities.js';
import { setupHomePage } from '../pages/home/script.js';
import { setupAnimeQuotesPage } from '../pages/anime-quotes/script.js';

/**
 * @param {string} page
 */
async function navigateTo(page) {
    let content = '';

    try {
        const res = await fetch(`pages/${page}`);
        if (!res.ok) {
            throw new PageNotFoundError();
        }

        content = await res.text();
    } catch (error) {
        if (error instanceof PageNotFoundError) {
            content = `<h2>404 - ${error.message}</h2>`;
        } else {
            content = `<h2>Error - ${getErrorMessage(error)}</h2>`;
        }
    }

    document.getElementById('app').innerHTML = content;
}

export async function handleNavigation() {
    const page = location.hash.replace('#', '') || 'home';
    await navigateTo(page);

    if (page === 'home') {
        setupHomePage();
    }

    if (page === 'anime-quotes') {
        await setupAnimeQuotesPage();
    }
}
