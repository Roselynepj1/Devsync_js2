import auth from './auth.mjs'
import { POSTS_URL, FOLLOWING_URL } from '../utilities/contants.mjs'

/**
 * Fetches a paginated list of posts from the API.
 *
 * @param {object} [options={}] Options for filtering and sorting the list.
 * @param {string} [options.sortOrder='desc'] The sort order for posts ('asc' or 'desc').
 * @param {number} [options.limit=20] The maximum number of posts to fetch.
 * @param {boolean} [options.author=true] Whether to include author information in the response.
 * @param {boolean} [options.reactions=true] Whether to include reaction information in the response.
 * @param {number} [options.offset=0] The offset for pagination (number of posts to skip before starting).
 * @returns {Promise<object>} A promise that resolves to the response data containing the list of posts.
 * 
 */
export const getPosts = async ({
  sortOrder = 'desc',
  limit = 20,
  author = true,
  reactions = true,
  offset=0
} = {}) => {
  const response = await auth.authFetch(
    `${POSTS_URL}?sortOrder=${sortOrder}&limit=${limit}&_author=${author}&_reactions=${reactions}&offset=${offset}`,
    {
      method: 'GET',
    }
  )
  return await response.json()
}


/**
 * Likes a post by adding the user's reaction.
 *
 * @param {string} postId The ID of the post to like.
 * @returns {Promise<object>} A promise that resolves to the response data after liking the post.
 *
 */
export const likePost = async (postId) => {
  const likeSymbol = '👍'
  const URL = `${POSTS_URL}/${postId}/react/${likeSymbol}`
  const response = await auth.authFetch(URL, {
    method: 'PUT',
    body: JSON.stringify({
      _author: true,
      _reactions: true,
      _comments: true,
    }),
  })
  return await response.json()
}


/**
 * Creates a new post.
 *
 * @param {object} post The post data to create.
 * @returns {Promise<object>} A promise that resolves to the response data containing the newly created post.
 *
 */
export const createPost = async (post) => {
  const response = await auth.authFetch(POSTS_URL, {
    method: 'POST',
    body: JSON.stringify(post),
  })
  return await response.json()
}


/**
 * Updates an existing post.
 *
 * @param {string} postId The ID of the post to update.
 * @param {object} post The updated post data.
 * @returns {Promise<object>} A promise that resolves to the response data containing the updated post.
 *
 */
export const updatePost = async (postId, post) => {
  const response = await auth.authFetch(`${POSTS_URL}/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(post),
  })
  return await response.json()
}


/**
 * Deletes a post.
 *
 * @param {string} postId The ID of the post to delete.
 * @returns {Promise<object>} A promise that resolves to the response data after deleting the post.
 *
 */
export const deletePost = async (postId) => {
  const response = await auth.authFetch(`${POSTS_URL}/${postId}`, {
    method: 'DELETE',
  })
  return await response.json()
}


/**
 * Fetches a specific post by its ID.
 *
 * @param {string} postId The ID of the post to fetch.
 * @returns {Promise<object>} A promise that resolves to the response data containing the post details.
 *
 */
export const getPost = async (postId) => {
  const response = await auth.authFetch(
    `${POSTS_URL}/${postId}?_author=true&_reactions=true&_comments=true`,
    {
      method: 'GET',
    }
  )
  return await response.json()
}


/**
 * Fetches a list of posts created by users the current user follows.
 *
 * @returns {Promise<object>} A promise that resolves to the response data containing the list of posts.
 *
 */
export const getPostsByFollowing = async () => {
  const response = await auth.authFetch(
    `${FOLLOWING_URL}?_author=true&_reactions=true&_comments=true`,
    {
      method: 'GET',
    }
  )
  return await response.json()
}


/**
 * Creates a new comment on a post.
 *
 * @param {string} postId The ID of the post to comment on.
 * @param {object} comment The comment data to create.
 * @returns {Promise<object>} A promise that resolves to the response data containing the newly created comment.
 *
 */
export const createComment = async (postId, comment) => {
  const response = await auth.authFetch(
    `${POSTS_URL}/${postId}/comment?_author=true`,
    {
      method: 'POST',
      body: JSON.stringify(comment),
    }
  )
  return await response.json()
}


/**
 * Deletes a comment from a post.
 *
 * @param {string} postId The ID of the post where the comment resides.
 * @param {string} commentId The ID of the comment to delete.
 * @returns {Promise<object>} A promise that resolves to the response data after deleting the comment.
 *
 */
export const deleteComment = async (postId, commentId) => {
  return await auth.authFetch(`${POSTS_URL}/${postId}/comment/${commentId}`, {
    method: 'DELETE',
  })
}
