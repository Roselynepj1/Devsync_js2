import { getPosts } from './requests/posts.mjs'
import { getProfiles } from './requests/profiles.mjs'
import { postPlaceholder, postTemplate } from './templates/posts.mjs'
import {
  createElement,
  getSearchParams,
  hideElement,
  populate,
  searchLikeSQL,
} from './utilities/common.mjs'

document.addEventListener('DOMContentLoaded', () => {
  const postsTab = document.querySelector('#pills-posts-tab')
  const postsTabArea = document.querySelector('#pills-posts')
  const profilesTab = document.querySelector('#pills-profiles-tab')
  const profilesTabArea = document.querySelector('#pills-profiles')
  const postsPlaceholders = document.querySelector('.postsPlaceholders')
  const postsArea = document.querySelector('.postsFiltered')
  const profilesPlaceholders = document.querySelector('.profilesPlaceholders')
  const profilesFiltered = document.querySelector('.profilesFiltered')

  //make searches for posts by default
  const searchQuery = getSearchParams('search')
  if (searchQuery) {
    //show loaders
    populate(postsPlaceholders, postPlaceholder, 5)
    //get the posts
    getPosts({ limit: 100 }).then((posts) => {
      //perform the filter
      const filteredPosts = posts.filter(
        (post) =>
          searchLikeSQL(searchQuery, post.body) ||
          searchLikeSQL(searchQuery, post.title) ||
          searchLikeSQL(searchQuery, post.tags.join(','))
      )
      if (filteredPosts.length) {
        //populate the filtered posts
        filteredPosts.forEach((filterdPost)=>{
            //hide place holders
            hideElement(postsPlaceholders)
            postsArea.append(postTemplate(filterdPost))
        })
      } else {
        //show no posts found
        const notFound = createElement('p', ['alert', 'alert-info'], {
          textContent: `Could not find posts matching the query "${searchQuery}" `,
        })
        hideElement(postsPlaceholders)
        postsArea.append(notFound)
      }
    })
  }

  postsTab.addEventListener('shown.bs.tab', () => {
    //make request to search for data by posts
  })
  profilesTab.addEventListener('shown.bs.tab', () => {
    //make requests to show data by profiles
  })
})
