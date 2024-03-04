import { PROFILE_URL } from '../utilities/contants.mjs'
import auth from './auth.mjs'


/**
 * Fetches a paginated list of user profiles from the API.
 *
 * @param {object} [options={}] Options for filtering and sorting the list.
 * @param {string} [options.sortOrder='asc'] The sort order for profiles ('asc' or 'desc').
 * @param {number} [options.limit=50] The maximum number of profiles to fetch.
 * @param {boolean} [options.followers=true] Whether to include follower information in the response.
 * @param {boolean} [options.following=true] Whether to include following information in the response.
 * @param {boolean} [options.posts=false] Whether to include post information in the response.
 * @returns {Promise<object>} A promise that resolves to the response data containing the list of profiles.
 *
 */
export const getProfiles = async ({
  sortOrder = 'asc',
  limit = 50,
  followers = true,
  following = true,
  posts = false,
} = {}) => {
  const response = await auth.authFetch(
    `${PROFILE_URL}?sortOrder=${sortOrder}&offset=100&_followers=${followers}&_following=${following}&posts=${posts}`,
    {
      method: 'GET',
    }
  )
  return await response.json()
}


/**
 * Fetches a specific user profile by name.
 *
 * @param {string} name The username of the profile to fetch.
 * @param {object} [options={}] Options for including additional information in the response.
 * @param {boolean} [options.followers=true] Whether to include follower information in the response.
 * @param {boolean} [options.following=true] Whether to include following information in the response.
 * @param {boolean} [options.posts=true] Whether to include post information in the response.
 * @returns {Promise<object>} A promise that resolves to the response data containing the profile details.
 *
 */
export const getProfile = async (
  name,
  { followers = true, following = true, posts = true } = {}
) => {
  const response = await auth.authFetch(
    `${PROFILE_URL}/${name}?_followers=${followers}&_following=${following}&posts=${posts}`,
    {
      method: 'GET',
    }
  )
  return await response.json()
}



/**
 * Follows a user by their username.
 *
 * @param {string} name The username of the user to follow.
 * @returns {Promise<object>} A promise that resolves to the response data after following the user.
 *
 */
export const followProfile = async (name) => {
  const response = await auth.authFetch(`${PROFILE_URL}/${name}/follow`, {
    method: 'PUT',
  })
  return await response.json()
}


/**
 * Unfollows a user by their username.
 *
 * @param {string} name The username of the user to unfollow.
 * @returns {Promise<object>} A promise that resolves to the response data after unfollowing the user.
 *
 */
export const unfollowProfile = async (name) => {
  const response = await auth.authFetch(`${PROFILE_URL}/${name}/unfollow`, {
    method: 'PUT',
  })
  return await response.json()
}


/**
 * Fetches a paginated list of posts created by a specific user.
 *
 * @param {string} name The username of the user whose posts to fetch.
 * @param {object} [options={}] Options for filtering and sorting the list.
 * @param {string} [options.sortOrder='desc'] The sort order for posts ('asc' or 'desc').
 * @param {number} [options.limit=50] The maximum number of posts to fetch.
 * @param {boolean} [options.followers=true] Whether to include follower information in the response.
 * @param {boolean} [options.following=true] Whether to include following information in the response.
 * @param {boolean} [options._author=true] Whether to include author information in the response.
 * @param {boolean} [options._comments=true] Whether to include comment information in the response.
 * @param {boolean} [options._reactions=true] Whether to include reaction information in the response.
 * @returns {Promise<object>} A promise that resolves to the response data containing the list of posts.
 *
 */
export const getProfilePosts = async (
  name,
  {
    sortOrder = 'desc',
    limit = 50,
    followers = true,
    following = true,
    _author = true,
    _comments = true,
    _reactions = true,
  } = {}
) => {
  const response = await auth.authFetch(
    `${PROFILE_URL}/${name}/posts?sortOrder=${sortOrder}&limit=${limit}&_followers=${followers}&_following=${following}&_author=${_author}&_reactions=${_reactions}&_comments=${_comments}`,
    {
      method: 'GET',
    }
  )
  return await response.json()
}
