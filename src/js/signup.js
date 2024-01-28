document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form')
  signupForm.onsubmit = (event) => {
    event.preventDefault()
    signupValidation()
  }
})
