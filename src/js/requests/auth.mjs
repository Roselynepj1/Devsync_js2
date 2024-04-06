import { API_URL } from '../utilities/contants.mjs'
/**
 * Logs a user in using email and password.
 *
 * @param {object} user An object containing the user's email and password.
 * @param {string} user.email The user's email address.
 * @param {string} user.password The user's password.
 * @returns {Promise<object>} A promise that resolves to the response data from the login API call.
 *
 * @throws {Error} If the login request fails.
 */
const login = async (user) => {
  const { email, password } = user

  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })

  if (response.ok) {
    return await response.json()
  }

  throw new Error(response.statusText)
}

/**
 * Registers a new user with email and password.
 *
 * @param {object} user An object containing the user's email and password.
 * @param {string} user.email The user's email address.
 * @param {string} user.password The user's password.
 * @returns {Promise<object>} A promise that resolves to the response data from the registration API call.
 *
 * @throws {Error} If the registration request fails.
 */
const register = async (user) => {
  //Send the credentials
  const { email, password } = user
  //generate username depending on the email
  const emailArray = email.split('@')
  const name = emailArray[0]

  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      name,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  if (response.ok) {
    return await response.json()
  }

  throw new Error(response.statusText)
}


/**
 * Retrieves the access token stored in local storage.
 *
 * @returns {string|null} The access token if available, otherwise null.
 */
const getAccessToken = () => {
  return localStorage.getItem('authToken')
}

/**
 * Stores the provided access token in local storage.
 *
 * @param {string} token The access token to store.
 */
const saveAccessToken = (token) => {
  localStorage.setItem('authToken', token)
}

/**
 * Removes the access token from local storage.
 */
const deleteAccessToken = () => {
  return localStorage.removeItem('authToken')
}

/**
 * Stores the provided user object in local storage.
 *
 * @param {object} user The user object to store.
 */
const saveUser = (user) => {
  localStorage.setItem('authUser', JSON.stringify(user))
}

/**
 * Retrieves the user object stored in local storage, if any.
 *
 * @returns {object|null} The user object if available, otherwise null.
 */
const getUser = () => {
  const authUser = localStorage.getItem('authUser')
  try {
    return JSON.parse(authUser)
  } catch {
    return null
  }
}


/**
 * Removes the user object from local storage.
 */
const deleteUser = () => {
  return localStorage.removeItem('authUser')
}



/**
 * Fetches data from an API endpoint while adding an authorization header if an access token is available.
 *
 * @param {string} url The URL of the API endpoint.
 * @param {object} [options={}] Additional options for the fetch request.
 * @returns {Promise<Response>} A promise that resolves to the fetch response.
 *
 * @throws {Error} If the fetch request fails.
 */
const authFetch = async (url, options) => {
  //perform auth check for updated header
  const headers = () => {
    const token = getAccessToken()
    return {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json; charset=UTF-8',
    }
  }
  return await fetch(url, {
    ...options,
    headers: headers(),
  })
}


/**
 * Checks if the provided user object matches the currently logged-in user.
 *
 * @param {object} user The user object to compare.
 * @param {string} user.email The user's email address.
 * @returns {boolean} True if the emails match (ignoring case), false otherwise.
 */
const isCurrentUser = (user) => {
  const currentUser = getUser()

  if (!currentUser) return false

  return currentUser.email.toLowerCase() === user.email.toLowerCase()
}

/**
 * Removes the access token and user data from local storage.
 */
const deleteAuth = () => {
  //delete the user
  deleteUser()
  deleteAccessToken()
}

/**
 * Logs out the user by removing authentication data from local storage.
 */
const logout = () => {
  deleteAuth()
}

export default {
  login,
  register,
  getAccessToken,
  saveAccessToken,
  getUser,
  saveUser,
  authFetch,
  isCurrentUser,
  logout,
}
