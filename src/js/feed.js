import { getPosts, createPost, getPostsByFollowing } from './requests/posts.mjs'
import {
  populate,
  mediaControlButtons,
  hideElement,
  showElement,
} from './utilities/common.mjs'
import {
  postPlaceholder,
  postTemplate,
  postsNotFound,
} from './templates/posts.mjs'
import {
  postFormEventListener,
  setFormUserToCurrentUserLoggedIn,
} from './utilities/events.mjs'
document.addEventListener('DOMContentLoaded', () => {
  const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
  const dropdownList = [...dropdownElementList].map(
    (dropdownToggleEl) => new bootstrap.Dropdown(dropdownToggleEl)
  )
  //FETCH POSTS AND UPDATE UI

  const postsPlaceHolderContainer = document.querySelector(
    '.posts-placeholders'
  )
  const postsContainer = document.querySelector('.posts-area')
  const postsLoader = document.querySelector('.loader')
  let offset = 0 //defines the starting point will be incremented to search more
  const postsPerPage = 10
  try {
    populate(postsPlaceHolderContainer, postPlaceholder, 5)
    getPosts().then((posts) => {
      hideElement(postsPlaceHolderContainer)
      //populate posts
      posts.forEach((post) => {
        // console.log(post)
        postsContainer.append(postTemplate(post))
      })
    })
  } catch {
    return
  }

  //add event for searching for new posts when bottom is reached
  const feedArea = document.querySelector('.feed-area')
  feedArea.addEventListener('scroll', function () {
    if (feedArea.scrollHeight - feedArea.scrollTop === feedArea.clientHeight) {
      //fetch for more more posts
      showElement(postsLoader)
      offset += postsPerPage
      getPosts({ offset }).then((posts) => {
        hideElement(postsLoader)
        //populate posts
        posts.forEach((post) => {
          // console.log(post)
          postsContainer.append(postTemplate(post))
        })
      })
    }
  })

  //find the form user details and update them
  setFormUserToCurrentUserLoggedIn()

  //Find the form buttons for showing media url
  mediaControlButtons()

  //find the form and attach an event for creating the post
  const createPostForm = document.querySelector('#createPost')
  postFormEventListener(createPostForm, (post, { clearForm }) => {
    createPost(post)
      .then((post) => {
        clearForm('Post created successfully')
        //append the new post next to the create post form
        setTimeout(() => location.reload(), 3000)
      })
      .catch((error) => crossOriginIsolated.log(error))
  })

  //Handle the sorting mechanism
  //get the sorting buttons
  const sortByDefault = document.querySelector('#sortByDefault')
  const sortByFollowing = document.querySelector('#sortByFollowing')

  sortByDefault.addEventListener('click', () => {
    //clean the posts container
    postsContainer.innerHTML = ''
    //show placeholders
    showElement(postsPlaceHolderContainer)
    //fetch the posts in normal way
    getPosts()
      .then((posts) => {
        hideElement(postsPlaceHolderContainer)
        //populate posts
        posts.forEach((post) => {
          // console.log(post)
          postsContainer.append(postTemplate(post))
        })
      })
      .catch((errors) => {
        console.log(errors)
      })
  })

  sortByFollowing.addEventListener('click', () => {
    //show placeholders
    showElement(postsPlaceHolderContainer)
    //clear the posts container
    postsContainer.innerHTML = ''
    //fetch posts for followers
    getPostsByFollowing()
      .then((posts) => {
        //hide the place holders
        hideElement(postsPlaceHolderContainer)

        //if no posts found add a no found element
        if (!posts.length) postsContainer.append(postsNotFound())
        //add posts to the posts container
        posts.forEach((post) => postsContainer.append(postTemplate(post)))
      })
      .catch((error) => console.log(error))
  })
})
