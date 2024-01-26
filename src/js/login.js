document.addEventListener('DOMContentLoaded', () => {
  //Login form validation
  const loginForm = document.getElementById('login-form')
  if (loginForm) {
    loginForm.onsubmit = (event) => {
      event.preventDefault()
      loginValidation()
    }
  }
})

