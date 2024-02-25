import { getSearchParams, hideElement } from './common.mjs'
import { getPost } from './posts.mjs'
import {
  postDetailsTemplate,
  postNotFound,
  postPlaceholder,
  commentTemplate,
} from './templates/posts.mjs'

document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.querySelector('.posts-area')
  const postsPlaceHolderContainer = document.querySelector(
    '.posts-placeholders'
  )

  postsPlaceHolderContainer.append(postPlaceholder())
  const postId = getSearchParams('post_id')

  if (!postId) {
    hideElement(postsPlaceHolderContainer)

    postsContainer.append(postNotFound())
    return
  } else {
    getPost(postId)
      .then((post) => {
        const { errors } = post

        if (errors && errors.length) {
          postsContainer.append(postNotFound())
        } else {
          //Add the post with its details
          postsContainer.append(postDetailsTemplate(post))

          //Add a comment form to add acomment to the post here

          const { comments } = post
          //map every post comment into the container
          comments.forEach((comment) => {
            postsContainer.append(commentTemplate(comment))
          })
        }
        postsPlaceHolderContainer.classList.add('d-none')
      })
      .catch((error) => console.log(error))
  }
})
