import { GOOGLE_SEARCH_URL } from "./config.js";

/**
 * @param {unknown} error
 */
export function getErrorMessage(error) {
    if (error instanceof Error) {
        return error.message;
    }
    if (error && typeof error === 'object' && 'message' in error) {
        return String(error.message);
    }
    if (typeof error === 'string') {
        return error;
    }
    return 'Something went wrong';
}

/**
 * @param {unknown} error
 */
export function isNetworkError(error) {
    return error instanceof TypeError && error.message === 'Failed to fetch';
}

/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} tagName
 * @param {Partial<HTMLElementTagNameMap[K]>} props
 * @param {(Node | string)[]} children
 * @returns {HTMLElementTagNameMap[K]}
 */
export function createElementWithProps(
    tagName,
    props = undefined,
    ...children
) {
    const element = document.createElement(tagName);

    if (props) {
        for (const [key, value] of Object.entries(props)) {
            element[key] = value;
        }
    }

    children.forEach(child => {
        const node =
            typeof child === 'string' ? document.createTextNode(child) : child;
        element.appendChild(node);
    });

    return element;
}

/**
 * A shorthand function for `createElementWithProps`
 */
export const html = createElementWithProps;

/**
 * @param {string} query
 * @returns {string}
 */
export function buildGoogleSearchUrl(query) {
    return GOOGLE_SEARCH_URL + query.replaceAll(' ', '+');
}
