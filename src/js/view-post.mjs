import { getSearchParams, hideElement } from './utilities/common.mjs'
import { createComment, getPost } from './requests/posts.mjs'

import {
  postDetailsTemplate,
  postNotFound,
  postPlaceholder,
  commentTemplate,
  commentFormTemplate,
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
          const { postDiv, updateCommentTotal } = postDetailsTemplate(post)
          postsContainer.append(postDiv)
          //create a comment form template

          const formTemplate = commentFormTemplate((comment) => {
            //handle the submission of the comment and adding it to the ui/ux
            createComment(postId, comment).then((savedComment) => {
              //clear the form
              formTemplate
                .querySelector('input[name="body"]')
                .classList.remove('is-valid')
              formTemplate.reset()
              //update the comment
              updateCommentTotal('add')
              formTemplate.insertAdjacentElement(
                'afterend',
                commentTemplate(savedComment,updateCommentTotal)
              )
            })
          })

          postsContainer.append(formTemplate)

          //Add a comment form to add acomment to the post here
          const { comments } = post
          //sort the comments before they are populated
          comments.sort((a, b) => new Date(b.created) - new Date(a.created))
          //map every post comment into the container
          comments.forEach((comment) => {
            postsContainer.append(
              commentTemplate(comment, updateCommentTotal)
            )
          })
        }
        postsPlaceHolderContainer.classList.add('d-none')
      })
      .catch((error) => console.log(error))
  }
})
