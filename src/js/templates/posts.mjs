import { isCurrentUser } from '../auth.mjs'
import { likePost } from '../posts.mjs'
import { createElement, getTimeAgo, formatNumber } from '../common.mjs'
import { deletePostEventListener } from '../events.mjs'

export const postTemplate = (post) => {
  const { id, author, body, media, created, _count } = post
  //check if the logged in user is the post author
  const checkUser = isCurrentUser(author)
  // Create elements
  const postDiv = createElement(
    'div',
    ['card', 'post', 'mb-3', 'p-3', 'text-decoration-none'],
    {
      id: `post_${id}`,
    }
  )
  const createPostHeadDiv = createElement('div', ['create-post-head'])
  const hstackDiv = createElement('div', ['hstack'])
  const profileImg = createElement('img', ['rounded-circle', 'bg-light'], {
    src: author.avatar || './assets/images/avatar.svg',
    width: '30',
    height: '30',
    alt: `${author.name} User Profile Image`,
  })
  const vstackDiv = createElement('div', [
    'vstack',
    'ms-2',
    'justify-content-center',
  ])
  const small1 = createElement('small', ['fw-normal'], {
    textContent: author.name,
  })
  const small2 = createElement('small', ['fw-bold'], {
    textContent: `@${author.name} • ${getTimeAgo(new Date(created))}`,
  })
  const moreActionsDiv = createElement('div', ['ms-auto'])
  const dropdownDiv = createElement('div', ['dropdown'])
  const moreVertSpan = createElement(
    'span',
    [
      'material-symbols-outlined',
      'text-dark',
      'ms-auto',
      'dropdown-toggle',
      'post-dropdown',
    ],
    {
      'data-bs-toggle': 'dropdown',
      'aria-expanded': 'false',
      textContent: 'more_vert',
    }
  )
  const dropdownMenuUl = createElement('ul', ['dropdown-menu'])
  const dropdownMenuItemLi = createElement('li')
  const dropdownItemAnchor = createElement(
    'a',
    ['dropdown-item', 'hstack', 'align-items-center', 'gap-3', 'disabled'],
    { href: 'javascript:void(0)' }
  )
  const bookmarkSpan1 = createElement(
    'span',
    ['material-symbols-outlined', 'fs-5'],
    { textContent: 'bookmark' }
  )
  const bookmarkSpan2 = createElement('span', [], { textContent: 'Bookmark' })
  const dropdownItemAnchorFollow = createElement(
    'a',
    ['dropdown-item', 'hstack', 'align-items-center', 'gap-3'],
    { href: 'javascript:void(0)' }
  )
  const followIcon = createElement(
    'span',
    ['material-symbols-outlined', 'fs-5'],
    { textContent: 'person_add' }
  )
  const followText = createElement('span', [], { textContent: 'Follow user' })
  const dropdownItemAnchorBlock = createElement(
    'a',
    ['dropdown-item', 'hstack', 'align-items-center', 'gap-3', 'disabled'],
    { href: 'javascript:void(0)' }
  )
  const blockIcon = createElement(
    'span',
    ['material-symbols-outlined', 'fs-5'],
    { textContent: 'block' }
  )
  const blockText = createElement('span', [], { textContent: 'Block user' })
  const dropdownItemAnchorUpdate = createElement(
    'a',
    [
      'dropdown-item',
      'hstack',
      'align-items-center',
      'gap-3',
      'd-none','d-sm-none', 'd-md-none', 'd-lg-flex',
    ],
    { href: `edit-post.html?post_id=${id}` }
  )
  const updateIcon = createElement(
    'span',
    ['material-symbols-outlined', 'fs-5'],
    { textContent: 'edit' }
  )
  const dropdownItemAnchorUpdateMobile = createElement(
    'a',
    [
      'dropdown-item',
      'hstack',
      'align-items-center',
      'gap-3',
      'd-flex', 'd-sm-flex', 'd-md-flex', 'd-lg-none',
    ],
    { href: `post.html?post_id=${id}` }
  )
  const updateIconMobile = createElement(
    'span',
    ['material-symbols-outlined', 'fs-5'],
    { textContent: 'edit' }
  )
  const updateText = createElement('span', [], { textContent: 'Update post' })
  const updateTextMobile = createElement('span', [], { textContent: 'Update post' })

  const dropdownItemAnchorDelete = createElement(
    'a',
    ['dropdown-item', 'hstack', 'align-items-center', 'gap-3'],
    { href: 'javascript:void(0)' }
  )
  const deleteIcon = createElement(
    'span',
    ['material-symbols-outlined', 'fs-5'],
    { textContent: 'delete' }
  )
  const deleteText = createElement('span', [], { textContent: 'Delete post' })
  //Bind an event
  deletePostEventListener(dropdownItemAnchorDelete, id)

  const postBodyDiv = createElement('div', ['post-body', 'my-2'])
  const bodySpan1 = createElement('span', [], {
    textContent: body,
  })

  //create a media element
  const mediaItem = createElement(
    'img',
    ['w-100', 'rounded', 'img', 'img-fluid', 'bg-light'],
    {
      src: media,
      loading: 'lazy',
      style: 'height: 200px !important;object-fit: cover;',
    }
  )
  const viewPostLink = createElement(
    'a',
    ['post-body', 'mb-2', 'text-decoration-none'],
    {
      href: `view-post.html?post_id=${id}`,
    }
  )
  const viewPostSpan = createElement('span', [], {
    textContent: 'view post',
  })

  const postActionsDiv = createElement('div', [
    'post-actions',
    'hstack',
    'justify-content-between',
    'align-items-center',
  ])
  const actionsDiv1 = createElement('div', ['hstack', 'gap-2'])
  const actionsDiv2 = createElement('div', ['hstack', 'gap-2'])
  const likeDiv = createElement('div', [
    'hstack',
    'align-items-center',
    'gap-1',
    'pointer',
  ])
  const thumbUpSpan = createElement(
    'span',
    ['material-symbols-outlined', 'text-dark', 'ms-auto', 'fs-5'],
    { textContent: 'thumb_up' }
  )
  const thumbUpSpanLiked = createElement('img', ['d-none'], {
    src: './assets/images/liked.svg',
    width: '20',
    height: '20',
  })
  //Add event listener for liking
  thumbUpSpan.addEventListener('click', (event) => {
    event.preventDefault()
    likePost(id)
    //Increase the number of likes
    likesSpan.textContent = Number(likesSpan.textContent) + 1
    event.target.classList.add('d-none')
    thumbUpSpanLiked.classList.remove('d-none')
  })
  const likesSpan = createElement('span', ['fw-medium'], {
    textContent: formatNumber(_count['reactions']),
  })
  const commentDiv = createElement('div', [
    'hstack',
    'align-items-center',
    'gap-1',
    'pointer',
  ])
  const commentSpan = createElement(
    'span',
    ['material-symbols-outlined', 'text-dark', 'ms-auto', 'fs-5'],
    { textContent: 'comment' }
  )
  const commentsSpan = createElement('span', ['fw-medium'], {
    textContent: formatNumber(_count['comments']),
  })
  const shareDiv = createElement('div', ['hstack', 'gap-2'])
  const shareSpan = createElement('span', [], { textContent: 'share' })
  const shareImg = createElement('img', [], {
    src: './assets/images/share.svg',
    alt: 'Share Icon',
  })

  // Append elements
  hstackDiv.appendChild(profileImg)
  vstackDiv.appendChild(small1)
  vstackDiv.appendChild(small2)
  hstackDiv.appendChild(vstackDiv)
  if (!checkUser) {
    //bookmark
    dropdownItemAnchor.appendChild(bookmarkSpan1)
    dropdownItemAnchor.appendChild(bookmarkSpan2)
    dropdownMenuItemLi.appendChild(dropdownItemAnchor)
    //follow
    dropdownItemAnchorFollow.appendChild(followIcon)
    dropdownItemAnchorFollow.appendChild(followText)
    dropdownMenuItemLi.appendChild(dropdownItemAnchorFollow)
    //block
    dropdownItemAnchorBlock.appendChild(blockIcon)
    dropdownItemAnchorBlock.appendChild(blockText)
    dropdownMenuItemLi.appendChild(dropdownItemAnchorBlock)
  } else {
    //update link
    dropdownItemAnchorUpdate.appendChild(updateIcon)
    dropdownItemAnchorUpdateMobile.appendChild(updateIconMobile)
    dropdownItemAnchorUpdate.appendChild(updateText)
    dropdownItemAnchorUpdateMobile.appendChild(updateTextMobile)
    dropdownMenuItemLi.appendChild(dropdownItemAnchorUpdate)
    dropdownMenuItemLi.appendChild(dropdownItemAnchorUpdateMobile)
    //delete link
    dropdownItemAnchorDelete.appendChild(deleteIcon)
    dropdownItemAnchorDelete.appendChild(deleteText)
    dropdownMenuItemLi.appendChild(dropdownItemAnchorDelete)
  }

  dropdownMenuUl.appendChild(dropdownMenuItemLi)
  dropdownDiv.appendChild(moreVertSpan)
  dropdownDiv.appendChild(dropdownMenuUl)
  moreActionsDiv.appendChild(dropdownDiv)
  postBodyDiv.appendChild(bodySpan1)
  if (media) postBodyDiv.appendChild(mediaItem)
  viewPostLink.appendChild(viewPostSpan)
  likeDiv.appendChild(thumbUpSpanLiked)
  likeDiv.appendChild(thumbUpSpan)
  likeDiv.appendChild(likesSpan)
  actionsDiv1.appendChild(likeDiv)
  commentDiv.appendChild(commentSpan)
  commentDiv.appendChild(commentsSpan)
  actionsDiv1.appendChild(commentDiv)
  shareDiv.appendChild(shareSpan)
  shareDiv.appendChild(shareImg)
  actionsDiv2.appendChild(shareDiv)
  postActionsDiv.appendChild(actionsDiv1)
  postActionsDiv.appendChild(actionsDiv2)
  hstackDiv.appendChild(moreActionsDiv)
  createPostHeadDiv.appendChild(hstackDiv)
  postDiv.appendChild(createPostHeadDiv)
  postDiv.appendChild(postBodyDiv)
  postDiv.appendChild(viewPostLink)
  postDiv.appendChild(postActionsDiv)

  return postDiv
}

export const postDetailsTemplate = (post) => {
  const { id, author, body, title, media, created, _count } = post
  //check if the logged in user is the post author
  const checkUser = isCurrentUser(author)
  // Create elements
  const postDiv = createElement(
    'div',
    ['card', 'post', 'mb-3', 'p-3', 'text-decoration-none'],
    {
      id: `post_${id}`,
    }
  )
  const createPostHeadDiv = createElement('div', ['create-post-head'])
  const hstackDiv = createElement('div', ['hstack'])
  const profileImg = createElement('img', ['rounded-circle', 'bg-light'], {
    src: author.avatar || './assets/images/avatar.svg',
    width: '30',
    height: '30',
    alt: `${author.name} User Profile Image`,
  })
  const vstackDiv = createElement('div', [
    'vstack',
    'ms-2',
    'justify-content-center',
  ])
  const small1 = createElement('small', ['fw-normal'], {
    textContent: author.name,
  })
  const small2 = createElement('small', ['fw-bold'], {
    textContent: `@${author.name} • ${getTimeAgo(new Date(created))}`,
  })
  const moreActionsDiv = createElement('div', ['ms-auto'])
  const dropdownDiv = createElement('div', ['dropdown'])
  const moreVertSpan = createElement(
    'span',
    [
      'material-symbols-outlined',
      'text-dark',
      'ms-auto',
      'dropdown-toggle',
      'post-dropdown',
    ],
    {
      'data-bs-toggle': 'dropdown',
      'aria-expanded': 'false',
      textContent: 'more_vert',
    }
  )
  const dropdownMenuUl = createElement('ul', ['dropdown-menu'])
  const dropdownMenuItemLi = createElement('li')
  const dropdownItemAnchor = createElement(
    'a',
    ['dropdown-item', 'hstack', 'align-items-center', 'gap-3', 'disabled'],
    { href: 'javascript:void(0)' }
  )
  const bookmarkSpan1 = createElement(
    'span',
    ['material-symbols-outlined', 'fs-5'],
    { textContent: 'bookmark' }
  )
  const bookmarkSpan2 = createElement('span', [], { textContent: 'Bookmark' })
  const dropdownItemAnchorFollow = createElement(
    'a',
    ['dropdown-item', 'hstack', 'align-items-center', 'gap-3'],
    { href: 'javascript:void(0)' }
  )
  const followIcon = createElement(
    'span',
    ['material-symbols-outlined', 'fs-5'],
    { textContent: 'person_add' }
  )
  const followText = createElement('span', [], { textContent: 'Follow user' })
  const dropdownItemAnchorBlock = createElement(
    'a',
    ['dropdown-item', 'hstack', 'align-items-center', 'gap-3', 'disabled'],
    { href: 'javascript:void(0)' }
  )
  const blockIcon = createElement(
    'span',
    ['material-symbols-outlined', 'fs-5'],
    { textContent: 'block' }
  )
  const blockText = createElement('span', [], { textContent: 'Block user' })
  const dropdownItemAnchorUpdate = createElement(
    'a',
    ['dropdown-item', 'hstack', 'align-items-center', 'gap-3'],
    { href: `edit-post.hml?post_id=${id}` }
  )
  const updateIcon = createElement(
    'span',
    ['material-symbols-outlined', 'fs-5'],
    { textContent: 'edit' }
  )
  const updateText = createElement('span', [], { textContent: 'Update post' })
  const dropdownItemAnchorDelete = createElement(
    'a',
    ['dropdown-item', 'hstack', 'align-items-center', 'gap-3'],
    { href: 'javascript:void(0)' }
  )
  const deleteIcon = createElement(
    'span',
    ['material-symbols-outlined', 'fs-5'],
    { textContent: 'delete' }
  )
  const deleteText = createElement('span', [], { textContent: 'Delete post' })
  //Bind an event
  deletePostEventListener(dropdownItemAnchorDelete, id)

  const postTitleDiv = createElement('div', ['my-2'])
  const postTitleText = createElement('span', [], {
    textContent: title,
  })
  const postBodyDiv = createElement('div', ['post-body', 'my-2'])
  const bodySpan1 = createElement('span', [], {
    textContent: body,
  })

  //create a media element
  const mediaItem = createElement(
    'img',
    ['w-100', 'rounded', 'img', 'img-fluid', 'bg-light'],
    {
      src: media,
      loading: 'lazy',
      style: 'height: 200px !important;object-fit:cover;',
    }
  )

  const postActionsDiv = createElement('div', [
    'post-actions',
    'hstack',
    'justify-content-between',
    'align-items-center',
  ])
  const actionsDiv1 = createElement('div', ['hstack', 'gap-2'])
  const actionsDiv2 = createElement('div', ['hstack', 'gap-2'])
  const likeDiv = createElement('div', [
    'hstack',
    'align-items-center',
    'gap-1',
    'pointer',
  ])
  const thumbUpSpan = createElement(
    'span',
    ['material-symbols-outlined', 'text-dark', 'ms-auto', 'fs-5'],
    { textContent: 'thumb_up' }
  )
  const thumbUpSpanLiked = createElement('img', ['d-none'], {
    src: './assets/images/liked.svg',
    width: '20',
    height: '20',
  })
  //Add event listener for liking
  thumbUpSpan.addEventListener('click', (event) => {
    event.preventDefault()
    likePost(id)
    //Increase the number of likes
    likesSpan.textContent = Number(likesSpan.textContent) + 1
    event.target.classList.add('d-none')
    thumbUpSpanLiked.classList.remove('d-none')
  })
  const likesSpan = createElement('span', ['fw-medium'], {
    textContent: formatNumber(_count['reactions']),
  })
  const commentDiv = createElement('div', [
    'hstack',
    'align-items-center',
    'gap-1',
    'pointer',
  ])
  const commentSpan = createElement(
    'span',
    ['material-symbols-outlined', 'text-dark', 'ms-auto', 'fs-5'],
    { textContent: 'comment' }
  )
  const commentsSpan = createElement('span', ['fw-medium'], {
    textContent: formatNumber(_count['comments']),
  })
  const shareDiv = createElement('div', ['hstack', 'gap-2'])
  const shareSpan = createElement('span', [], { textContent: 'share' })
  const shareImg = createElement('img', [], {
    src: './assets/images/share.svg',
    alt: 'Share Icon',
  })

  // Append elements
  hstackDiv.appendChild(profileImg)
  vstackDiv.appendChild(small1)
  vstackDiv.appendChild(small2)
  hstackDiv.appendChild(vstackDiv)
  if (!checkUser) {
    //bookmark
    dropdownItemAnchor.appendChild(bookmarkSpan1)
    dropdownItemAnchor.appendChild(bookmarkSpan2)
    dropdownMenuItemLi.appendChild(dropdownItemAnchor)
    //follow
    dropdownItemAnchorFollow.appendChild(followIcon)
    dropdownItemAnchorFollow.appendChild(followText)
    dropdownMenuItemLi.appendChild(dropdownItemAnchorFollow)
    //block
    dropdownItemAnchorBlock.appendChild(blockIcon)
    dropdownItemAnchorBlock.appendChild(blockText)
    dropdownMenuItemLi.appendChild(dropdownItemAnchorBlock)
  } else {
    //update link
    dropdownItemAnchorUpdate.appendChild(updateIcon)
    dropdownItemAnchorUpdate.appendChild(updateText)
    dropdownMenuItemLi.appendChild(dropdownItemAnchorUpdate)
    //delete link
    dropdownItemAnchorDelete.appendChild(deleteIcon)
    dropdownItemAnchorDelete.appendChild(deleteText)
    dropdownMenuItemLi.appendChild(dropdownItemAnchorDelete)
  }

  dropdownMenuUl.appendChild(dropdownMenuItemLi)
  dropdownDiv.appendChild(moreVertSpan)
  dropdownDiv.appendChild(dropdownMenuUl)
  moreActionsDiv.appendChild(dropdownDiv)
  postBodyDiv.appendChild(bodySpan1)
  if (media) postBodyDiv.appendChild(mediaItem)
  postTitleDiv.appendChild(postTitleText)
  likeDiv.appendChild(thumbUpSpanLiked)
  likeDiv.appendChild(thumbUpSpan)
  likeDiv.appendChild(likesSpan)
  actionsDiv1.appendChild(likeDiv)
  commentDiv.appendChild(commentSpan)
  commentDiv.appendChild(commentsSpan)
  actionsDiv1.appendChild(commentDiv)
  shareDiv.appendChild(shareSpan)
  shareDiv.appendChild(shareImg)
  actionsDiv2.appendChild(shareDiv)
  postActionsDiv.appendChild(actionsDiv1)
  postActionsDiv.appendChild(actionsDiv2)
  hstackDiv.appendChild(moreActionsDiv)
  createPostHeadDiv.appendChild(hstackDiv)
  postDiv.appendChild(createPostHeadDiv)
  postDiv.appendChild(postTitleDiv)
  postDiv.appendChild(postBodyDiv)
  postDiv.appendChild(postActionsDiv)

  return postDiv
}

export const postPlaceholder = () => {
  const cardDiv = createElement('div', ['card', 'p-2', 'mb-3'])
  const hstackDiv1 = createElement('div', ['hstack', 'mb-3'])
  const spanImg1 = createElement(
    'span',
    ['rounded-circle', 'placeholder', 'placeholder-wave'],
    { textContent: 'img' }
  )
  const vstackDiv1 = createElement('div', ['vstack', 'gap-1', 'ms-2'])
  const placeholderDiv1 = createElement('div', [
    'placeholder',
    'col-6',
    'placeholder-xs',
    'placeholder-wave',
  ])
  const placeholderDiv2 = createElement('div', [
    'placeholder',
    'col-4',
    'placeholder-xs',
    'placeholder-wave',
  ])
  const vstackDiv2 = createElement('div', ['vstack', 'gap-2', 'mb-2'])
  const placeholders = []
  for (let i = 0; i < 5; i++) {
    placeholders.push(
      createElement('div', [
        'placeholder',
        'col-12',
        'placeholder-wave',
        'placeholder-sm',
      ])
    )
  }
  const placeholderDiv6 = createElement('div', [
    'placeholder',
    'col-6',
    'placeholder-wave',
    'placeholder-sm',
  ])
  const hstackDiv2 = createElement('div', ['hstack'])
  const spanImg2 = createElement(
    'span',
    ['rounded-circle', 'placeholder', 'placeholder-wave'],
    { textContent: 'img' }
  )
  const spanImg3 = createElement(
    'span',
    ['rounded-circle', 'placeholder', 'placeholder-wave', 'ms-2'],
    { textContent: 'img' }
  )
  const shareButtonSpan = createElement(
    'span',
    ['rounded', 'placeholder', 'placeholder-wave', 'ms-auto'],
    { textContent: 'Share button' }
  )

  hstackDiv1.appendChild(spanImg1)
  vstackDiv1.appendChild(placeholderDiv1)
  vstackDiv1.appendChild(placeholderDiv2)
  hstackDiv1.appendChild(vstackDiv1)
  cardDiv.appendChild(hstackDiv1)

  placeholders.forEach((placeholder) => {
    vstackDiv2.appendChild(placeholder)
  })
  vstackDiv2.appendChild(placeholderDiv6)
  cardDiv.appendChild(vstackDiv2)

  hstackDiv2.appendChild(spanImg2)
  hstackDiv2.appendChild(spanImg3)
  hstackDiv2.appendChild(shareButtonSpan)
  cardDiv.appendChild(hstackDiv2)

  return cardDiv
}

export const postNotFound = () => {
  // Create the outer div element
  const outerDiv = createElement(
    'div',
    ['alert', 'alert-warning', 'alert-dismissible', 'fade', 'show'],
    {
      role: 'alert',
    }
  )

  // Create and append text node for the message
  const messageTextNode = document.createTextNode('No such post item found')
  outerDiv.appendChild(messageTextNode)

  // Create the button element
  const closeButton = createElement('button', ['btn-close'], {
    type: 'button',
    'data-bs-dismiss': 'alert',
    'aria-label': 'Close',
  })

  // Append the button to the outer div
  outerDiv.appendChild(closeButton)

  return outerDiv
}

export const commentTemplate = (comment) => {
  const { body, author, created } = comment
  // Create the outer div element
  const commentDiv = createElement('div', ['card', 'p-2', 'mb-2'])

  // Create the inner div for the hstack
  const hstackDiv = createElement('div', ['hstack', 'gap-3'])

  // Create the anchor tag for the owner profile
  const ownerProfileLink = createElement('a', [], {
    href: `profile.html?user=${author['name']}`,
  })

  // Create the owner profile image
  const ownerProfileImage = createElement(
    'img',
    ['rounded-circle', 'bg-light'],
    {
      src: author['avatar'] || 'images/avatar.svg',
      height: '30',
      width: '30',
      alt: '',
    }
  )

  // Append the owner profile image to the anchor tag
  ownerProfileLink.appendChild(ownerProfileImage)

  // Append the anchor tag to the hstack div
  hstackDiv.appendChild(ownerProfileLink)

  // Create the vstack div
  const vstackDiv = createElement('div', ['vstack'])
  const headDiv = createElement('div', ['hstack', 'gap-1'])

  // Create the owner name link
  const ownerNameLink = createElement('a', ['text-decoration-none'], {
    href: `profile.html?user=${author['name']}`,
    textContent: author['name'],
  })

  const dotSpan = createElement('span', [], {
    textContent: `•`,
  })
  // Create the timestamp span
  const timeCreated = getTimeAgo(new Date(created))
  const timestampSpan = createElement('span', [], {
    textContent: `${timeCreated}`,
  })

  // Append the owner name link and timestamp to the hstack div
  headDiv.appendChild(ownerNameLink)
  headDiv.appendChild(dotSpan)
  headDiv.appendChild(timestampSpan)
  vstackDiv.appendChild(headDiv)

  // Append the vstack div to the hstack div
  hstackDiv.appendChild(vstackDiv)

  // Create the comment body paragraph
  const commentParagraph = createElement('p', [], { textContent: body })

  // Append the hstack div and comment paragraph to the comment div
  vstackDiv.appendChild(commentParagraph)
  commentDiv.appendChild(hstackDiv)

  return commentDiv
}
