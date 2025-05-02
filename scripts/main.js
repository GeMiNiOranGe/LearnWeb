import { PageNotFoundError } from './error.js';
import { getErrorMessage } from './utilities.js';
import { setupHomePage } from '../pages/home/script.js';

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
    } catch (err) {
        if (err instanceof PageNotFoundError) {
            content = `<h2>404 - ${err.message}</h2>`;
        }
        else {
            content = `<h2>Error - ${getErrorMessage(err)}</h2>`;
        }
    }

    document.getElementById('app').innerHTML = content;
}

async function handleNavigation() {
    const page = location.hash.replace('#', '') || 'home';
    await navigateTo(page);

    if (page === 'home') {
        setupHomePage();
    }
}

window.addEventListener('hashchange', handleNavigation);
window.addEventListener('load', handleNavigation);
