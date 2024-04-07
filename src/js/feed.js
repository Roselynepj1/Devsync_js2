import {
  getPosts,
  createPost,
  getPostsByFollowing,
  getPostsFilter,
  setPostsFilter,
} from './requests/posts.mjs'
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
  addScrollMoreEvent,
  postFormEventListener,
  setFormUserToCurrentUserLoggedIn,
} from './utilities/events.mjs'
import auth from './requests/auth.mjs'
import { getProfiles } from './requests/profiles.mjs'
import { suggestedFollowProfileTemplate } from './templates/profiles.mjs'

document.addEventListener('DOMContentLoaded', async() => {
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
    let posts = []
    //get the posts filter
    const postsFilter = getPostsFilter()

    if (postsFilter === 'following') {
      posts = await getPostsByFollowing()
    } else {
      posts = await getPosts()
    }
    hideElement(postsPlaceHolderContainer)
    //populate posts
    posts.forEach((post) => {
      // console.log(post)
      postsContainer.append(postTemplate(post))
    })
  } catch {
    alert("Failed to fetch new posts")
    return
  }

  //add event for searching for new posts when bottom is reached
  const feedArea = document.querySelector('.feed-area')
  addScrollMoreEvent(feedArea, () => {
    //fetch for more more posts
    showElement(postsLoader)
    offset += postsPerPage

    //get posts filter
    const postsFilter = getPostsFilter()

    if (postsFilter === 'following') {
      getPostsByFollowing({ offset }).then((posts) => {
        hideElement(postsLoader)
        //populate posts
        posts.forEach((post) => {
          // console.log(post)
          postsContainer.append(postTemplate(post))
        })
      })
    } else {
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
      .catch((error) =>
        alert('Failed to create new post because something went wrong')
      )
  })

  //Handle the sorting mechanism
  //get the sorting buttons
  const sortByDefault = document.querySelector('#sortByDefault')
  const sortByFollowing = document.querySelector('#sortByFollowing')

  sortByDefault.addEventListener('click', () => {
    //set the posts filter for consistency
    setPostsFilter('default')
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
        alert('Failed to retrieve posts')
      })
  })

  sortByFollowing.addEventListener('click', () => {
    //set the posts filter for consistency
    setPostsFilter('following')
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
      .catch((error) => alert('Failed to retrieve posts for followers'))
  })

  //show some profile account to follow
  const suggestedProfiles = document.getElementById('suggested-profiles')
  if (suggestedProfiles) {
    //get current user profile
    const user = auth.getUser()
    //fetch all profiles
    getProfiles({ sortOrder: 'asc', limit: 50, following: false })
      .then((profiles) => {
        //filter all profiles that are followed and return unfollowed profiles
        const filteredProfiles = profiles.filter((profile) => {
          return !profile.followers.some(
            (follower) => follower.name === user.name
          )
        })

        filteredProfiles.slice(0, 5).forEach((profile) => {
          suggestedProfiles.prepend(suggestedFollowProfileTemplate(profile))
        })
      })
      .catch((error) => {
        console.log(error)
        return
      })
  }
})
