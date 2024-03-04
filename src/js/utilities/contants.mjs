/**
 * Base URL for the API.
 * @type {string}
 */
export const BASE_URL = 'https://api.noroff.dev';

/**
 * API version used.
 * @type {string}
 */
export const API_VERSION = 'api/v1';

/**
 * Full URL for the social API.
 * @type {string}
 */
export const API_URL = `${BASE_URL}/${API_VERSION}/social`;

/**
 * URL for accessing posts.
 * @type {string}
 */
export const POSTS_URL = `${API_URL}/posts`;

/**
 * URL for accessing posts from users being followed.
 * @type {string}
 */
export const FOLLOWING_URL = `${POSTS_URL}/following`;

/**
 * URL for accessing user profiles.
 * @type {string}
 */
export const PROFILE_URL = `${API_URL}/profiles`;

