import { getSearchParams, hideElement } from './utilities/common.mjs'
import { postFormEventListener } from './utilities/events.mjs'
import { createPost, getPost, updatePost } from './requests/posts.mjs'
import { postNotFound } from './templates/posts.mjs'

document.addEventListener('DOMContentLoaded', () => {
  //get the form element
  const postForm = document.querySelector('#postForm')
  //get the form area
  const formArea = document.querySelector('#formArea')
  //get the form area
  const response = document.querySelector('.response')
  //get the form stateText
  const formState = document.querySelector('.formState')
  //Get the post id id available
  const postId = getSearchParams('post_id')

  if (postId) {
    //fetch the post details
    getPost(postId)
      .then((post) => {
        //if no post details found
        const { errors } = post
        if (errors && errors.length) {
          //hide the form
          hideElement(formArea)
          const notFound = postNotFound()
          notFound.classList.add('w-100')
          response.append(notFound)
        } else {
          postForm.querySelector("input[name='title']").value = post.title
          postForm.querySelector("textarea[name='body']").value = post.body
          postForm.querySelector("input[name='media']").value = post.media
          postForm.querySelector("input[name='tags']").value =
            post.tags.join(',')

          //enable the submit button
          const submitBtn = postForm.querySelector('#submitBtn')
          submitBtn.removeAttribute('disabled')
          //update the compose to update post
            formState.textContent = "Update Post"
          //add the event listener for submitting the form
          postFormEventListener(postForm, (post, { clearForm }) => {
            updatePost(postId, post)
              .then((post) => {
                console.log(post)
                clearForm("Post updated successfully")
                setTimeout(() => location.assign('post.html?post_id=' + postId),2000)
              })
              .catch((error) => console.log(error))
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  } else {
    //add the create post event listener
    postFormEventListener(postForm, (post, { clearForm }) => {
      createPost(post)
        .then((post) => {
          //perform some clearing after submiting
          clearForm('Post created successfully')
        })
        .catch((error) => console.log(error))
    })
  }
})
