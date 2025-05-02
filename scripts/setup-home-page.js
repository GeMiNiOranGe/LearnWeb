export function setupHomePage() {
    /** @type {HTMLDivElement | null} */
    const homePage = document.getElementById('home-page');

    if (!homePage) {
        return;
    }

    const amount = 5;
    const messages = Array(amount).fill('Hello world');

    const homePageInner = messages.map(value => `
        <h1>${value}</h1>
    `);

    homePage.innerHTML = homePageInner.join('');
}