import { isCurrentUser } from '../auth.mjs'
import { likePost } from '../posts.mjs'
import { createElement, getTimeAgo, formatNumber } from '../common.mjs'

export const postTemplate = (post) => {
  const { id, author, body, created, _count } = post
  //
  const checkUser = isCurrentUser(author)
  // Create elements
  const postDiv = createElement('div', ['card', 'post', 'mb-3', 'p-3'])
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

  const postBodyDiv = createElement('div', ['post-body', 'my-2'])
  const bodySpan1 = createElement('span', [], {
    textContent: body,
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
    'gap-1','pointer'
  ])
  const thumbUpSpan = createElement(
    'span',
    ['material-symbols-outlined', 'text-dark', 'ms-auto', 'fs-5'],
    { textContent: 'thumb_up'}
  )
  const thumbUpSpanLiked = createElement('img', ['d-none'], {
    src: './assets/images/liked.svg',
    width: '20',
    height: '20',
  })
  //Add event listener for liking
  thumbUpSpan.addEventListener('click',(event)=>{
      likePost(id)
      //Increase the number of likes
      likesSpan.textContent = Number(likesSpan.textContent) +1;
      event.target.classList.add('d-none')
      thumbUpSpanLiked.classList.remove('d-none')
  })
  const likesSpan = createElement('span', ['fw-medium'], {
    textContent: formatNumber(_count['reactions']),
  })
  const commentDiv = createElement('div', [
    'hstack',
    'align-items-center',
    'gap-1','pointer'
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
  dropdownItemAnchor.appendChild(bookmarkSpan1)
  dropdownItemAnchor.appendChild(bookmarkSpan2)
  dropdownMenuItemLi.appendChild(dropdownItemAnchor)

  dropdownItemAnchorFollow.appendChild(followIcon)
  dropdownItemAnchorFollow.appendChild(followText)
  dropdownMenuItemLi.appendChild(dropdownItemAnchorFollow)

  dropdownItemAnchorBlock.appendChild(blockIcon)
  dropdownItemAnchorBlock.appendChild(blockText)
  dropdownMenuItemLi.appendChild(dropdownItemAnchorBlock)

  dropdownMenuUl.appendChild(dropdownMenuItemLi)
  dropdownDiv.appendChild(moreVertSpan)
  dropdownDiv.appendChild(dropdownMenuUl)
  moreActionsDiv.appendChild(dropdownDiv)
  postBodyDiv.appendChild(bodySpan1)
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
  if (!checkUser) hstackDiv.appendChild(moreActionsDiv)
  createPostHeadDiv.appendChild(hstackDiv)
  postDiv.appendChild(createPostHeadDiv)
  postDiv.appendChild(postBodyDiv)
  postDiv.appendChild(postActionsDiv)

  return postDiv
}

export const commentTemplate = () => {}

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
