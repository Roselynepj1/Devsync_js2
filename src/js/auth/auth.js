const API_ENDPOINT = 'https://api.noroff.dev/api/v1/social'

const login = async (email, password) => {}

const register = async (user) => {
  //Send the credentials
  const { email, password } = user
  //generate username depending on the email
  const emailArray = email.split('@')
  const name = emailArray[0]

  const response = await fetch(`${API_ENDPOINT}/auth/register`, {
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

const getJWT = () => {}

const saveJWT = (token) => {}

export default { API_ENDPOINT, login, register, getJWT, saveJWT }
