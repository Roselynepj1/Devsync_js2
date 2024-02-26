import { PROFILE_URL } from '../utilities/contants.mjs'
import auth from './auth.mjs'

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

export const followProfile = async (name) => {
  const response = await auth.authFetch(`${PROFILE_URL}/${name}/follow`, {
    method: 'PUT',
  })
  return await response.json()
}

export const unfollowProfile = async (name) => {
  const response = await auth.authFetch(`${PROFILE_URL}/${name}/unfollow`, {
    method: 'PUT',
  })
  return await response.json()
}

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
