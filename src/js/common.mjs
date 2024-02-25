export function loginValidation() {
  const loginForm = document.getElementById('login-form')
  const successMsg = document.getElementById('success-msg')
  const errorMsg = document.getElementById('error-msg')
  const error = document.getElementById('error')
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

  const showErrorMsg = (message) => {
    hideSuccessMsg()
    errorMsg.innerHTML = message
    loader.classList.add('d-none')
    error.classList.remove('d-none')
  }

  const hideErrorMsg = () => {
    error.classList.add('d-none')
  }
  //Success form submission
  const success = () => {
    hideErrorMsg()
    loader.classList.add('d-none')
    signupForm.reset()
    successMsg.classList.remove('d-none')
  }
  const hideSuccessMsg = () => {
    successMsg.classList.add('d-none')
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
    loader.classList.remove('d-none')
    return {
      loader,
      success,
      user: { email, password },
      showErrorMsg,
      hideErrorMsg,
    }
  }
}

export function signupValidation() {
  const signupForm = document.getElementById('signup-form')
  const successMsg = document.getElementById('success-msg')
  const errorMsg = document.getElementById('error-msg')
  const error = document.getElementById('error')
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
  const showErrorMsg = (message) => {
    hideSuccessMsg()
    loader.classList.add('d-none')
    errorMsg.innerHTML = message
    error.classList.remove('d-none')
  }

  const hideErrorMsg = () => {
    error.classList.add('d-none')
  }
  //Success form submission
  const success = () => {
    hideErrorMsg()
    loader.classList.add('d-none')
    signupForm.reset()
    successMsg.classList.remove('d-none')
  }
  const hideSuccessMsg = () => {
    successMsg.classList.add('d-none')
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
    //return the data from the form
    //return a function to clear the form when submission is done
    return {
      loader,
      success,
      user: { email, password },
      showErrorMsg,
      hideErrorMsg,
    }
  } else {
    return false
  }
}

export function validateEmail(email) {
  // Regular expression for a simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // Test the email against the regular expression
  return emailRegex.test(email)
}

export function validateLength(value, length = 3) {
  return value != '' && value.length >= length
}

export function equal(value1, value2) {
  return value1 === value2
}

export const createElement = (tag, classNames = [], attributes = {}) => {
  const element = document.createElement(tag)
  element.classList.add(...classNames)
  Object.keys(attributes).forEach((attr) => {
    if (attr === 'textContent') element.textContent = attributes[attr]
    element.setAttribute(attr, attributes[attr])
  })
  return element
}

export const populate = (container, elementFactory, total) => {
  for (let i = 0; i < total; i++) {
    container.prepend(elementFactory())
  }
}

export const getTimeAgo = (date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years >= 1) {
    return years + ' years ago'
  } else if (months >= 1) {
    return months + ' months ago'
  } else if (weeks >= 1) {
    return weeks + ' weeks ago'
  } else if (days >= 1) {
    return days + ' days ago'
  } else if (hours >= 1) {
    return hours + ' hours ago'
  } else if (minutes >= 1) {
    return minutes + ' minutes ago'
  } else {
    return seconds + ' seconds ago'
  }
}

export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'm'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  } else {
    return num.toString()
  }
}

export const toggleInput = (targetElement) => {
  if (targetElement.classList.contains('d-none'))
    targetElement.classList.remove('d-none')
  else targetElement.classList.add('d-none')
}

export const mediaControlButtons = () => {
  const mediaToggleButtons = document.querySelectorAll('.show-media-url-input')
  const mediaUrlInput = document.querySelector('#medialUrl')
  const tagsInputToggleButton = document.querySelector('.show-tags-input')
  const tagsInput = document.querySelector('#tags')
  tagsInputToggleButton.addEventListener('click', () => toggleInput(tagsInput))
  mediaToggleButtons.forEach((element) => {
    element.addEventListener('click', () => toggleInput(mediaUrlInput))
  })

  return { urlInput: mediaUrlInput, tagsInput: tagsInput }
}

export const getSearchParams = (key) => {
  const searchString = window.location.search
  const urlSearchParams = new URLSearchParams(searchString)
  return urlSearchParams.get(key)
}

export const hideElement = (element) => {
  element.classList.add('d-none')
}

export const showElement = (element) => {
  element.classList.remove('d-none')
}
