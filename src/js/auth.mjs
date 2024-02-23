import { API_URL } from './contants.mjs'

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

  return await response.json()
}

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
  return await response.json()
}

const getAccessToken = () => {
  return localStorage.getItem('authToken')
}

const saveAccessToken = (token) => {
  localStorage.setItem('authToken', token)
}

const saveUser = (user) => {
  localStorage.setItem('authUser', JSON.stringify(user))
}

const getUser = () => {
  const authUser = localStorage.getItem('authUser')
  try {
    return JSON.parse(authUser)
  } catch {
    return null
  }
}

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

export const isCurrentUser = (user)=>{
  const currentUser = getUser()

  if(!currentUser) return false 

  return currentUser.email.toLowerCase() === user.email.toLowerCase()

}

export default {
  login,
  register,
  getAccessToken,
  saveAccessToken,
  getUser,
  saveUser,
  authFetch,
}
