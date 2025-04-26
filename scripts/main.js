import { PageNotFoundError } from "./error.js";

/**
 * @param {string} page 
 */
async function navigateTo(page) {
    try {
        const res = await fetch(`pages/${page}.html`);
        if (!res.ok) {
            throw new PageNotFoundError();
        }

        const html = await res.text();
        document.getElementById('app').innerHTML = html;
    } catch (err) {
        if (err instanceof PageNotFoundError) {
            document.getElementById('app').innerHTML = `<h2>404 - ${err.message}</h2>`;
        }
    }
}

function handleNavigation() {
    const page = location.hash.replace('#', '') || 'home';
    navigateTo(page);
}

window.addEventListener('hashchange', handleNavigation);
window.addEventListener('load', handleNavigation);
