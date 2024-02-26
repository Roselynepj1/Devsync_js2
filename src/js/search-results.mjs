import { getPosts } from './requests/posts.mjs'
import { getProfiles } from './requests/profiles.mjs'
import { postPlaceholder, postTemplate } from './templates/posts.mjs'
import { profileCardPlacholderTemplate, profileCardTemplate } from './templates/profiles.mjs'
import {
  createElement,
  getSearchParams,
  hideElement,
  populate,
  searchLikeSQL,
  showElement,
} from './utilities/common.mjs'

document.addEventListener('DOMContentLoaded', () => { 
  const postsPlaceholders = document.querySelector('.postsPlaceholders')
  const postsArea = document.querySelector('.postsFiltered') 

  //search and populate posts
  const searchAndPopulatePosts = (searchQuery) => {
    if (searchQuery) {
      //show loaders
      populate(postsPlaceholders, postPlaceholder, 5)
      //get the posts
      getPosts({ limit: 100 }).then((posts) => {
        //perform the filter
        const filteredPosts = posts.filter(
          (post) =>
            searchLikeSQL(searchQuery, post.author.name) ||
            searchLikeSQL(searchQuery, post.body) ||
            searchLikeSQL(searchQuery, post.title) ||
            searchLikeSQL(searchQuery, post.tags.join(','))
        )
        if (filteredPosts.length) {
          filteredPosts.forEach((filterdPost) => {
            //hide place holders
            hideElement(postsPlaceholders)
            //populate the filtered posts
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
  }

  //make searches for posts by default
  const searchQuery = getSearchParams('search')
  searchAndPopulatePosts(searchQuery) 
   
})
