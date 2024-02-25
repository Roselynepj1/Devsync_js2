import auth from './auth.mjs'
import { POSTS_URL } from './contants.mjs'

export const getPosts = async ({
  sortOrder = 'desc',
  limit = 50,
  author = true,
  reactions = true,
} = {}) => {
  const response = await auth.authFetch(
    `${POSTS_URL}?sortOrder=${sortOrder}&limit=${limit}&_author=${author}&_reactions=${reactions}`,
    {
      method: 'GET',
    }
  )
  return await response.json()
}

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

export const createPost = async (post) => {
  const response = await auth.authFetch(POSTS_URL, {
    method: 'POST',
    body: JSON.stringify(post),
  })
  return await response.json()
}

export const updatePost = async (postId, post) => {
  const response = await auth.authFetch(`${POSTS_URL}/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(post),
  })
  return await response.json()
}

export const deletePost = async (postId) => {
  const response = await auth.authFetch(`${POSTS_URL}/${postId}`, {
    method: 'DELETE',
  })
  return await response.json()
}

export const getPost = async (postId) => {
  const response = await auth.authFetch(
    `${POSTS_URL}/${postId}?_author=true&_reactions=true&_comments=true`,
    {
      method: 'GET',
    }
  )
  return await response.json()
}
