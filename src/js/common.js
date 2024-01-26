function loginValidation() {
  const loginForm = document.getElementById('login-form')
  //get the helpers
  const emailHelper = document.getElementById('email-helper')
  const passwordHelper = document.getElementById('password-helper')
  const loader = document.getElementById('loader')
  //create a form data object to capture user input
  const formData = new FormData(loginForm)
  const email = formData.get('email')
  const password = formData.get('password')
  let errors = {
    email: false,
    password: false,
  }

  if (!validateLength(email)) {
    emailHelper.textContent = 'Email is required'
    errors['email'] = true
  } else if (!validateEmail(email)) {
    errors['email'] = true
    emailHelper.textContent = 'Please provide a valid email address'
  } else {
    errors['email'] = false
    emailHelper.textContent = null
  }

  if (!validateLength(password, 8)) {
    errors['password'] = true
    passwordHelper.textContent = 'Password length must be 8 or more characters'
  } else {
    errors['password'] = false
    passwordHelper.textContent = null
  }

  //check if no errors have been raised
  if (!errors['email'] && !errors['password']) {
    //create a fake login action to happen after 3 seconds
    loader.classList.remove('d-none')
    const timeout = setTimeout(() => {
      loader.classList.add('d-none')
      location.assign('./src/profile.html')
      clearTimeout(timeout)
    }, 3000)
  }
}

function signupValidation() {
  const signupForm = document.getElementById('signup-form')
  const successMsg = document.getElementById('success-msg')
  //get the helpers
  const emailHelper = document.getElementById('email-helper')
  const passwordHelper = document.getElementById('password-helper')
  const cpasswordHelper = document.getElementById('cpassword-helper')
  const loader = document.getElementById('loader')
  //create a form data object to capture user input
  const formData = new FormData(signupForm)
  const email = formData.get('email')
  const password = formData.get('password')
  const cpassword = formData.get('cpassword')
  let errors = {
    email: false,
    password: false,
    cpassword: false,
  }

  if (!validateLength(email)) {
    emailHelper.textContent = 'Email is required'
    errors['email'] = true
  } else if (!validateEmail(email)) {
    errors['email'] = true
    emailHelper.textContent = 'Please provide a valid email address'
  } else {
    errors['email'] = false
    emailHelper.textContent = null
  }

  if (!validateLength(password, 8)) {
    errors['password'] = true
    passwordHelper.textContent = 'Password length must be 8 or more characters'
  } else {
    errors['password'] = false
    passwordHelper.textContent = null
  }

  if (!equal(cpassword, password)) {
    errors['cpassword'] = true
    cpasswordHelper.textContent = 'Password should match'
  } else {
    errors['cpassword'] = false
    cpasswordHelper.textContent = null
  }

  //check if no errors have been raised
  if (!errors['email'] && !errors['password'] && !errors['cpassword']) {
    //create a fake login action to happen after 3 seconds
    loader.classList.remove('d-none')
    const timeout = setTimeout(() => {
      loader.classList.add('d-none')
      signupForm.reset()
      successMsg.classList.remove('d-none') 
      clearTimeout(timeout)
    }, 3000)
  }
}

function validateEmail(email) {
  // Regular expression for a simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // Test the email against the regular expression
  return emailRegex.test(email)
}

function validateLength(value, length = 3) {
  return value != '' && value.length >= length
}

function equal(value1,value2){
    return value1 === value2
}
