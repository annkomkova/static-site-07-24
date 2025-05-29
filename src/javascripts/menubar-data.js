const homeURL = 'http://localhost:8080/'
// const homeURL = 'https://hseadc.github.io/veranda/'
// const homeURL = 'https://annkomkova.github.io/static-site-07-24'

const menu = [
  {
    text: 'Статьи',
    url: 'articles.html'
  },
  {
    text: 'Настолки',
    url: 'boardgames.html'
  },
  {
    text: 'Поиск',
    url: 'search.html'
  }
]

const props = {
  prerender: true,
  homeURL,
  menu
}

export { props }
