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
