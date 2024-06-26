import { createElement, formatNumber,hideElement,showElement } from '../utilities/common.mjs'
import { followProfile,unfollowProfile } from '../requests/profiles.mjs'


/**
 * Generates a placeholder template for a profile card.
 * @returns {HTMLElement} The HTML element representing the profile card placeholder template.
 */
export const profileCardPlacholderTemplate = () => {
  // Create the main container div
  const container = createElement('div', [
    'hstack',
    'gap-4',
    'card',
    'p-2',
    'my-2',
  ])

  // Create the placeholder div for the image
  const imagePlaceholder = createElement('div', ['placeholder-wave'])

  // Create the image element
  const image = createElement('img', ['placeholder', 'rounded-circle'], {
    width: '40',
    height: '40',
  })

  // Append the image to the image placeholder div
  imagePlaceholder.appendChild(image)

  // Append the image placeholder div to the main container div
  container.appendChild(imagePlaceholder)

  // Create the div for the username and buttons
  const userInfoContainer = createElement('div', ['vstack', 'gap-2'])

  // Create the div for the username
  const usernameDiv = createElement('div', ['hstack', 'placeholder-wave'])

  // Create the username placeholder span
  const usernamePlaceholder = createElement(
    'span',
    ['placeholder', 'placeholder-sm'],
    {
      textContent: 'username placeholder',
    }
  )

  // Create the actual username span
  const usernameSpan = createElement('span', ['placeholder', 'ms-auto'], {
    textContent: 'username',
  })

  // Append the username placeholders to the username div
  usernameDiv.appendChild(usernamePlaceholder)
  usernameDiv.appendChild(usernameSpan)

  // Append the username div to the user info container
  userInfoContainer.appendChild(usernameDiv)

  // Create the div for the buttons
  const buttonsDiv = createElement('div', [
    'hstack',
    'gap-2',
    'placeholder-wave',
  ])

  // Create button placeholders
  for (let i = 0; i < 3; i++) {
    const buttonPlaceholder = createElement('span', ['placeholder'], {
      textContent: 'button',
    })
    buttonsDiv.appendChild(buttonPlaceholder)
  }

  // Append the buttons div to the user info container
  userInfoContainer.appendChild(buttonsDiv)

  // Append the user info container to the main container div
  container.appendChild(userInfoContainer)

  return container
}


/**
 * Generates a template for displaying a profile card.
 * @param {Object} userProfile - The user profile object containing user information.
 * @returns {HTMLElement} The HTML element representing the profile card template.
 */
export const profileCardTemplate = (userProfile) => {
  // Create the main container div
  const container = createElement('div', [
    'hstack',
    'gap-4',
    'card',
    'p-2',
    'my-2',
  ])

  // Create the image element
  const image = createElement('img', ['rounded-circle', 'bg-light'], {
    src: userProfile['avatar'] || './assets/images/avatar.svg',
    width: '40',
    height: '40',
    alt: userProfile['name'] + 'User avatar',
  })

  // Append the image to the main container div
  container.appendChild(image)

  // Create the div for the user info
  const userInfoContainer = createElement('div', ['vstack', 'gap-2'])

  // Create the div for the username and follow button
  const usernameContainer = createElement('div', ['hstack'])

  // Create the anchor element for the username
  const usernameLink = createElement(
    'a',
    ['text-decoration-none', 'fw-medium'],
    {
      href: `profile.html?user=${userProfile['name']}`,
      textContent: userProfile['name'],
    }
  )

  // Create the follow button
  const followButton = createElement('button', [
    'btn',
    'btn-primary',
    'bg-transparent',
    'gap-2',
    'text-primary',
    'hstack',
    'justify-content-center',
    'ms-auto',
    'btn-sm',
  ])

  // Create the span element for "Follow"
  const followSpan = createElement('span', [], {
    textContent: 'Follow',
  })

  // Append the follow span to the follow button
  followButton.appendChild(followSpan)

  // Append the username link and follow button to the username container
  usernameContainer.appendChild(usernameLink)
  usernameContainer.appendChild(followButton)

  // Append the username container to the user info container
  userInfoContainer.appendChild(usernameContainer)

  // Create the div for the user stats
  const userStatsContainer = createElement('div', ['hstack', 'gap-3'])

  // Create user stat elements
  const forumDiv = createElement('div', [
    'hstack',
    'gap-2',
    'align-items-center',
  ])
  const forumSymbol = createElement('span', ['material-symbols-outlined'], {
    textContent: 'forum',
  })
  const forumCount = createElement('span', [], { textContent: formatNumber(userProfile['_count']['posts']) })
  forumDiv.appendChild(forumSymbol)
  forumDiv.appendChild(forumCount)

  const groupsDiv = createElement('div', [
    'hstack',
    'gap-2',
    'align-items-center',
  ])
  const groupsSymbol = createElement('span', ['material-symbols-outlined'], {
    textContent: 'groups',
  })
  const groupsCount = createElement('span', [], {
    textContent: formatNumber(userProfile['_count']['followers']),
  })
  groupsDiv.appendChild(groupsSymbol)
  groupsDiv.appendChild(groupsCount)

  const diversityDiv = createElement('div', [
    'hstack',
    'gap-2',
    'align-items-center',
  ])
  const diversitySymbol = createElement('span', ['material-symbols-outlined'], {
    textContent: 'diversity_1',
  })
  const diversityCount = createElement('span', [], {
    textContent: formatNumber(userProfile['_count']['following']),
  })
  diversityDiv.appendChild(diversitySymbol)
  diversityDiv.appendChild(diversityCount)

  // Append user stat elements to the user stats container
  userStatsContainer.appendChild(forumDiv)
  userStatsContainer.appendChild(createElement('div', ['vr']))
  userStatsContainer.appendChild(groupsDiv)
  userStatsContainer.appendChild(createElement('div', ['vr']))
  userStatsContainer.appendChild(diversityDiv)

  // Append the user stats container to the user info container
  userInfoContainer.appendChild(userStatsContainer)

  // Append the user info container to the main container div
  container.appendChild(userInfoContainer)

  return container
}

/**
 * Creates a suggested follow profile element.
 * @returns {HTMLElement} The suggested follow profile element.
 */
export const suggestedFollowProfileTemplate = (user)=>{
  const li = createElement('li', [
    'list-group-item',
    'd-flex',
    'follow-card',
    'align-items-center',
  ])
  const img = createElement('img', [], {
    src: user['avatar'] || './assets/images/avatar.svg',
    alt: user['name'] + ' avatar',
    height: 40,
    width: 40
  })
  const div = createElement('div', ['d-flex', 'flex-column', 'ms-3'])
  const usernameSpan = createElement('span', ['mb-0', 'username'], {
    textContent: user['name'],
  })
  const userHandleSpan = createElement('span', ['user-handle'], {
    textContent: '@' + user['name'],
  })
  const followButton = createElement(
    'button',
    ['follow-btn', 'btn', 'btn-sm', 'border-primary', 'ms-auto'],
    { textContent: 'Follow' }
  )
  const unFollowButton = createElement(
    'button',
    ['follow-btn', 'btn', 'btn-sm', 'btn-danger','text-white', 'ms-auto','d-none'],
    { textContent: 'Unfollow' }
  )

  followButton.addEventListener('click',()=>{ 
    followProfile(user['name']).then((res)=>{
      //hide the follow button and show the unfollow button
      hideElement(followButton)
      showElement(unFollowButton)
      alert("User followed")
    }).catch(error=> alert("Failed to follow user, try again"))
  })
  unFollowButton.addEventListener('click',()=>{ 
    const unfollow = confirm("Do you wish to unfollow "+ user['name']+"?")
    if(!unfollow) return
    unfollowProfile(user['name'])
      .then((res) => {
        //hide the follow button and show the unfollow button
        hideElement(unFollowButton)
        showElement(followButton)
      })
      .catch((error) => alert('Failed to unfollow user, try again'))
  })

  // Appending child elements to parent <li> element
  div.appendChild(usernameSpan)
  div.appendChild(userHandleSpan)
  li.appendChild(img)
  li.appendChild(div)
  li.appendChild(followButton)
  li.appendChild(unFollowButton)

  return li
}
