/**
 * Validates user login form and returns an object containing functions and data if successful,
 * or `false` if validation fails.
 *
 * @returns {object|boolean} An object containing functions and data if validation succeeds,
 *                          or `false` if validation fails.
 *
 */
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

/**
 * Validates user signup form and returns an object containing functions and data if successful,
 * or `false` if validation fails.
 *
 * @returns {object|boolean} An object containing functions and data if validation succeeds,
 *                          or `false` if validation fails.
 * 
 */
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

/**
 * Validates an email address using a regular expression.
 *
 * @param {string} email The email address to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
export function validateEmail(email) {
  // Regular expression for a simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // Test the email against the regular expression
  return emailRegex.test(email)
}

/**
 * Validates the length of a value.
 *
 * @param {*} value The value to validate.
 * @param {number} [length=3] The minimum length required.
 * @returns {boolean} True if the value is not empty and has a length greater than or equal to the provided length, false otherwise.
 */
export function validateLength(value, length = 3) {
  return value != '' && value.length >= length
}


/**
 * Checks if two values are equal.
 *
 * @param {*} value1 The first value to compare.
 * @param {*} value2 The second value to compare.
 * @returns {boolean} True if the values are equal, false otherwise.
 */
export function equal(value1, value2) {
  return value1 === value2
}


/**
 * Creates a DOM element with the specified tag, class names, and attributes.
 *
 * @param {string} tag The HTML tag name for the element.
 * @param {string[]} [classNames=[]] An array of class names to add to the element.
 * @param {object} [attributes={}] An object containing key-value pairs for attributes to add to the element.
 * @returns {HTMLElement} The created DOM element.
 */
export const createElement = (tag, classNames = [], attributes = {}) => {
  const element = document.createElement(tag)
  element.classList.add(...classNames)
  Object.keys(attributes).forEach((attr) => {
    if (attr === 'textContent') element.textContent = attributes[attr]
    element.setAttribute(attr, attributes[attr])
  })
  return element
}


/**
 * Populates a container element with a specified number of elements created by the provided element factory function.
 *
 * @param {HTMLElement} container The element to populate.
 * @param {function} elementFactory A function that returns a new DOM element.
 * @param {number} total The number of elements to create and append.
 */
export const populate = (container, elementFactory, total) => {
  for (let i = 0; i < total; i++) {
    container.prepend(elementFactory())
  }
}

/**
 * Returns a human-readable string representing the time elapsed since the given date.
 * @param {Date} date - The date to calculate the elapsed time from.
 * @returns {string} A string representing the time elapsed since the given date.
 */
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

/**
 * Formats a number for display with appropriate units (e.g., "1.5m" for 1.5 million).
 * @param {number} num - The number to format.
 * @returns {string} The formatted number with appropriate units.
 */
export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'm'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  } else {
    return num.toString()
  }
}

/**
 * Toggles the visibility of an HTML element by adding or removing the 'd-none' class.
 * @param {HTMLElement} targetElement - The element to toggle.
 */
export const toggleInput = (targetElement) => {
  if (targetElement.classList.contains('d-none'))
    targetElement.classList.remove('d-none')
  else targetElement.classList.add('d-none')
}

/**
 * Initializes media control buttons, such as toggling the visibility of media URL input fields.
 * @returns {Object} An object containing references to the media URL input and tags input elements.
 */
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

/**
 * Retrieves the value of a specified search parameter from the URL query string.
 * @param {string} key - The key of the search parameter to retrieve.
 * @returns {string|null} The value of the search parameter, or null if not found.
 */
export const getSearchParams = (key) => {
  const searchString = window.location.search
  const urlSearchParams = new URLSearchParams(searchString)
  return urlSearchParams.get(key)
}

/**
 * Hides the specified HTML element by adding the 'd-none' class.
 * @param {HTMLElement} element - The element to hide.
 */
export const hideElement = (element) => {
  element.classList.add('d-none')
}

/**
 * Shows the specified HTML element by removing the 'd-none' class.
 * @param {HTMLElement} element - The element to show.
 */
export const showElement = (element) => {
  element.classList.remove('d-none')
}

/**
 * Performs a SQL-like search on a text for a given search word.
 * @param {string} searchWord - The word to search for.
 * @param {string} text - The text to search within.
 * @returns {boolean} True if the search word is found in the text, otherwise false.
 */
export const searchLikeSQL = (searchWord, text) => {
  const escapedSearchWord = searchWord.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') // Escape special characters
  const pattern = new RegExp(escapedSearchWord, 'i') // 'i' flag for case-insensitive search
  return pattern.test(text)
}

/**
 * Returns a debounced version of the provided function.
 * @param {Function} func - The function to debounce.
 * @param {number} [timeout=300] - The debounce timeout in milliseconds.
 * @returns {Function} The debounced function.
 */
export const debounce = (func, timeout = 300) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}
