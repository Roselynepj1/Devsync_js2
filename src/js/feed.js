import { getPosts, createPost } from './posts.mjs'
import { populate, mediaControlButtons } from './common.mjs'
import { postPlaceholder, postTemplate } from './templates/posts.mjs'
import { createPostEventListener } from './events.mjs'
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

  try {
    populate(postsPlaceHolderContainer, postPlaceholder, 5)
    getPosts().then((posts) => {
      postsPlaceHolderContainer.classList.add('d-none')
      //populate posts
      posts.forEach((post) => {
        // console.log(post)
        postsContainer.append(postTemplate(post))
      })
    })
  } catch {
    return
  }

  //Find the form buttons for showing media url
  mediaControlButtons()

  //find the form and attach an event for creating the post
  const createPostForm = document.querySelector('#createPost')
  createPostEventListener(createPostForm, (post) => {
    location.reload()
  })
})
