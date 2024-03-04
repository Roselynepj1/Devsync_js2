import auth from '../requests/auth.mjs'
import { deletePost } from '../requests/posts.mjs'


/**
 * Attaches event listeners to a post form for validation and submission.
 * @param {HTMLElement} form - The HTML form element.
 * @param {Function} callback - The callback function to execute upon form submission.
 */
export const postFormEventListener = (form, callback) => {
  //check if the title is provided
  const postTitle = form.querySelector("input[name='title']")
  const postBody = form.querySelector("textarea[name='body']")
  const postTitleHelper = form.querySelector('.title-helper')
  const postBodyHelper = form.querySelector('.body-helper')
  const successHelper = form.querySelector('.success-helper')
  //This forms should have a submit button
  const submitBtn = form.querySelector("button[type='submit']")

  const clear = (successMsg) => {
    form.reset()
    postTitle.classList.remove('is-valid')
    postBody.classList.remove('is-valid')
    successHelper.innerHTML = successMsg
    successHelper.classList.remove('d-none')
    setTimeout(() => {
      successHelper.classList.add('d-none')
    }, 3000)
  }

  postTitle.addEventListener('change', (event) => {
    if (event.target.value.length < 3 || event.target.value.length >= 255) {
      postTitleHelper.innerHTML =
        'Post title should be between 3 and 255 charcters'
      postTitleHelper.classList.remove('d-none')
      event.target.classList.add('is-invalid')
      event.target.classList.remove('is-valid')
    } else {
      //check if post body isvalid and remove the disabled button attribute
      if (postBody.value.length >= 3) submitBtn.removeAttribute('disabled')
      postTitleHelper.classList.add('d-none')
      event.target.classList.add('is-valid')
      event.target.classList.remove('is-invalid')
    }
  })

  postBody.addEventListener('change', (event) => {
    if (event.target.value.length < 3 || event.target.value.length >= 280) {
      postBodyHelper.innerHTML =
        'Post body should be between 3 and 280 charcters'
      postBodyHelper.classList.remove('d-none')
      event.target.classList.add('is-invalid')
      event.target.classList.remove('is-valid')
    } else {
      //check if post title isvalid and remove the disabled button attribute
      if (postTitle.value.length >= 3) submitBtn.removeAttribute('disabled')
      postBodyHelper.classList.add('d-none')
      event.target.classList.add('is-valid')
      event.target.classList.remove('is-invalid')
    }
  })

  form.addEventListener('submit', (event) => {
    //prevent the default action
    event.preventDefault()

    //Perform the submit here
    const formData = new FormData(event.target)
    let post = Object.fromEntries(formData.entries())
    post = { ...post, tags: formData.get('tags').split(',') }

    //callback
    callback(post, { clearForm: clear })
  })
}


/**
 * Attaches an event listener to delete a post.
 * @param {HTMLElement} element - The HTML element representing the post to be deleted.
 * @param {string} postId - The ID of the post to be deleted.
 */
export const deletePostEventListener = (element, postId) => {
  element.addEventListener('click', (event) => {
    //The post card element is logicalled created as follows
    const postCard = document.getElementById(`post_${postId}`)
    //Prompt the user to delete the post
    const result = confirm('Are you sure you want to delete this post?')

    if (!result) return

    //Delete the post
    deletePost(postId).then((res) => {
      postCard.classList.add('d-none')
    })
  })
}


/**
 * Sets the form's user details to the current user logged in.
 */
export const setFormUserToCurrentUserLoggedIn = () => {
  //load the user details
  const user = auth.getUser()
  if (!user) return

  //get the form elements
  const username = document.querySelector('.current-username')
  const handle = document.querySelector('.current-username-handle')
  const avatar = document.querySelector('.username-avatar')

  username.textContent = user.name
  handle.textContent = '@' + user.name
  user.avatar && (avatar.src = user.avatar)
}

/**
 * Sets the current user menu avatar.
 */
export const setCurrentUserMenuAvatar = ()=>{
  const avatar = document.querySelector('.current-user')
  //load the user
  const user = auth.getUser()
  if(!user) return  
  user.avatar && (avatar.src = user.avatar)
}


/**
 * Adds a scroll event listener to an element.
 * @param {HTMLElement} element - The HTML element to attach the scroll event listener to.
 * @param {Function} callback - The callback function to execute when scrolling to the bottom of the element.
 */
export const addScrollMoreEvent = (element,callback)=>{
  element.addEventListener('scroll', function () {
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      callback()
    }
  })
}

