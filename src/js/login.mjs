import auth from './requests/auth.mjs'
import { loginValidation } from './utilities/common.mjs'

document.addEventListener('DOMContentLoaded', () => {
  //Login form validation
  const loginForm = document.getElementById('login-form')
  if (loginForm) {
    loginForm.onsubmit = async (event) => {
      event.preventDefault()
      const formData = loginValidation()

      if (!formData) return
      const { user, loader, success, showErrorMsg } = formData
      loader.classList.remove('d-none')
      try {
        const response = await auth.login(user)
        const { errors } = response
        if (errors) {
          const errorDetails = errors[0]
          showErrorMsg(errorDetails.message)
          return
        }

        const { accessToken, name, email, avatar, banner } = response
        const authUser = {
          name,
          email,
          avatar,
          banner,
        }
        //Handle redirection
        loader.classList.add('d-none') 
        auth.saveAccessToken(accessToken)
        auth.saveUser(authUser)

        //redirect to dashboard
        console.log("redirecting")
        location.assign("src/feed.html")
      } catch (error) {
        alert("Something went wrong, try again")
      }
    }
  }
})
