import { getPostTeasers } from './search-data'

let content,
  container = document.querySelector('.S_Content')

document.addEventListener('DOMContentLoaded', () => {
  getPostTeasers().then((data) => {
    content = data
    initSearch()
  })
})

function initSearch() {
  const A_SearchInput = document.querySelector('.A_SearchInput')
  const A_SearchButton = document.querySelector('.A_SearchButton')

  let requestText = getSearchRequest()
  // let requestText = 'html'

  if (requestText != undefined) {
    A_SearchInput.value = requestText

    if (content) {
      searchContent(requestText)
    }
  } else {
    A_SearchInput.value = ''
  }

  A_SearchInput.addEventListener('input', (e) => {
    requestText = e.target.value

    if (requestText.length >= 3) {
      A_SearchButton.classList.remove('disabled')
    } else {
      A_SearchButton.classList.add('disabled')
    }
  })

  A_SearchInput.addEventListener('keydown', (e) => {
    requestText = e.target.value

    if (e.key === 'Enter') {
      setSearchRequest(requestText)
      searchContent(requestText)
    }
  })

  A_SearchButton.addEventListener('click', (e) => {
    if (!e.target.classList.contains('disabled')) {
      requestText = A_SearchInput.value
      setSearchRequest(requestText)
      searchContent(requestText)
    }
  })
}

function setSearchRequest(requestText) {
  const url = window.location.href.split('?')[0]

  window.location.href = url + '?request=' + requestText
}

function getSearchRequest() {
  const url = new URL(window.location.href)
  const searchParams = new URLSearchParams(url.search)

  if (searchParams.has('request')) {
    return searchParams.get('request')
  }
}

function searchContent(requestText) {
  container.innerHTML = ''

  let contentItemIds = []

  content.forEach((contentDataItem) => {
    const nbspRegEx = /[\u202F\u00A0]/gm
    const punctuationRegEx = /[.,\/#!$%\^&\*;:{}=\-_`()]/gm

    let { title, description, id } = contentDataItem

    title = title.replaceAll(nbspRegEx, ' ')
    title = title.replaceAll(punctuationRegEx, '')

    description = description.replaceAll(nbspRegEx, ' ')
    description = description.replaceAll(punctuationRegEx, '')

    if (requestText.length >= 3) {
      if (title.includes(requestText) || description.includes(requestText)) {
        contentItemIds.push(id)
      } else {
        // contentItemIds.push(id)
      }
    }

    if (contentItemIds.length > 0) {
      renderCardsByIds(contentItemIds)
    } else {
      renderNothingFounded()
    }
  })
}

function renderNothingFounded() {
  container.innerHTML = 'Ничего не найдено :('
}

function renderCardsByIds(ids) {
  ids = [...new Set(ids)]

  ids.forEach((id) => {
    content.forEach((item) => {
      if (item.id === id) {
        createCards(item)
      }
    })
  })
}

function createCards(contentDataItem) {
  let { title, description, image, url, tags, className } = contentDataItem

  const contentItem = document.createElement('a')
  contentItem.classList.add('O_ContentItem')
  contentItem.classList.add(`${className}`)
  contentItem.href = url

  const contentItemCover = document.createElement('img')
  contentItemCover.classList.add('A_ContentItemCover')
  contentItemCover.src = image

  const contentItemTitle = document.createElement('h3')
  contentItemTitle.classList.add('A_ContentItemTitle')
  contentItemTitle.innerText = title

  const contentItemDescription = document.createElement('p')
  contentItemDescription.classList.add('A_ContentItemDescription')
  contentItemDescription.innerText = description

  const contentItemTags = document.createElement('div')
  contentItemTags.classList.add('C_ContentItemTags')

  tags.forEach((tag) => {
    const contentItemTag = document.createElement('div')
    contentItemTag.classList.add('A_ContentItemTag')
    contentItemTag.innerText = tag
    contentItemTags.appendChild(contentItemTag)
  })

  contentItem.appendChild(contentItemCover)
  contentItem.appendChild(contentItemTags)
  contentItem.appendChild(contentItemTitle)
  contentItem.appendChild(contentItemDescription)

  container.appendChild(contentItem)
}
