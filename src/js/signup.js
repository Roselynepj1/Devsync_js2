import auth from './auth.mjs'
import { signupValidation } from './common.mjs'

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form')
  signupForm.onsubmit = async (event) => {
    event.preventDefault()
    const formData = signupValidation()

    if (!formData) return

    const { user, loader, success, showErrorMsg } = formData
    loader.classList.remove('d-none')

    try {
      const response = await auth.register(user)
      const { errors } = response
      if (errors) {
        const errorDetails = errors[0]
        showErrorMsg(errorDetails.message)
        return
      }

      //show user successfull creation of account
      success()
    } catch (error) {
      return
    }
  }
})
