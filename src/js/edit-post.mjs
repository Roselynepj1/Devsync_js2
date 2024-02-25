import { getSearchParams, hideElement, mediaControlButtons } from './common.mjs'
import { postFormEventListener } from './events.mjs'
import { getPost, updatePost } from './posts.mjs'
import { postNotFound } from './templates/posts.mjs'

document.addEventListener('DOMContentLoaded', () => {
  //Find the form buttons for showing media url
  const { urlInput, tagsInput } = mediaControlButtons()

  //get the edit form post form
  const editPostForm = document.querySelector('#editPost')

  //Get the feed area
  const feedArea = document.querySelector('.feed-area')

  //get the post id
  const postId = getSearchParams('post_id')

  if (!postId) {
    hideElement(editPostForm)
    feedArea.prepend(postNotFound())
  } else { 
      //Fetch the post
      getPost(postId).then((post)=>{
          //populate the form 
          editPostForm.querySelector("input[name='title']").value = post.title
          editPostForm.querySelector("textarea[name='body']").value = post.body
          editPostForm.querySelector("input[name='media']").value = post.media
          editPostForm.querySelector("input[name='tags']").value = post.tags.join(',')

      })

      //add the event listener that can be added to the form
      postFormEventListener(editPostForm,(post,{clearForm})=>{
        updatePost(postId,post).then((post)=>{
            clearForm('Post updated successfully')
            setTimeout(() => location.reload(), 3000)
        })
      })
  }
})
