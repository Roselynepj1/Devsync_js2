import { getPosts } from './requests/posts.mjs'
import { postPlaceholder, postTemplate } from './templates/posts.mjs'
import {
  hideElement,
  showElement,
  populate,
  searchLikeSQL,
  getSearchParams,
} from './utilities/common.mjs' 
import { addScrollMoreEvent } from './utilities/events.mjs'

document.addEventListener('DOMContentLoaded', () => {
  const feedArea = document.querySelector('.feed-area')
  const searchInput = document.querySelector('input[name="search"')
  const postsPlaceholders = document.querySelector('.postsPlaceholders')
  const postsArea = document.querySelector('.postsFiltered')
  const loadingSpinner = document.querySelector('.loader')  
  const noSearch = document.querySelector('#no-search')  
  let allPosts = []
  let offset = 0
  const postsPerPage = 20

  const fetchMore = (offset) => {
    return new Promise((resolve, reject) => {
      getPosts({ offset })
        .then((posts) => resolve(posts))
        .catch((error) => reject(error))
    })
  }

  const filterPosts = (posts, searchQuery) => {
    return posts.filter(
      (post) => 
        searchLikeSQL(searchQuery, post.title) 
    )
  }

  const renderPosts = (posts) => {
    hideElement(postsPlaceholders)
    posts.forEach((post) => {
      postsArea.append(postTemplate(post))
    })
  }

  const searchPosts = (query) => {
    const filteredPosts = filterPosts(allPosts, query) 
    renderPosts(filteredPosts)
  }

  const fetchPosts = () => {
    return new Promise((resolve, reject) => {
      showElement(loadingSpinner) // Show loading spinner
      getPosts({ limit: postsPerPage, offset })
        .then((posts) => {
          allPosts = allPosts.concat(posts) // Append fetched posts to allPosts array
          offset += postsPerPage // Increment offset for pagination
          hideElement(loadingSpinner) // Hide loading spinner
          searchPosts(searchInput.value.trim()) // Perform search with current query
          resolve()
        })
        .catch((error) => {
          console.error('Error fetching posts:', error)
          hideElement(loadingSpinner) // Hide loading spinner in case of error
          reject(error)
        })
    })
  }

  const searchQuery = getSearchParams('search') // Get initial search query from input
  if (searchQuery) {
    hideElement(noSearch)
    populate(postsPlaceholders, postPlaceholder, 5)
    fetchPosts().then(() => {
      searchPosts(searchQuery)
    }).catch((error)=> alert("Failed to load more posts"))
  }else{
    showElement(noSearch)
  }

  //Add event listener to search for more when the bottom is reached
  addScrollMoreEvent(feedArea, () => {
    offset += postsPerPage
    console.log(offset)
    fetchMore(offset).then((posts) => {
      const filteredPosts = filterPosts(posts, searchQuery)
      renderPosts(filteredPosts)
    }).catch(error=> alert("Failed to load more posts"))
  })
}) //End of document
