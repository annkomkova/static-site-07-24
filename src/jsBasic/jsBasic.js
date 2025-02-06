import './jsBasic.scss'
console.clear()
document.addEventListener('DOMContentLoaded', () => {
  searchElem()
  randomWord()
  styleOnClick()
})

function searchElem() {
  const headerTag = document.querySelector('h1')
  const headerClass = document.querySelector('.header')
  const headerID = document.querySelector('#header')
  const headers = document.querySelectorAll('h1')

  headers.forEach((header) => {
    header.addEventListener('click', () => {
      header.innerHTML = '<span>Клик</span>'
    })
  })
}

function randomWord() {
  const words = [
    'весёлый',
    'грустный',
    'диван',
    'чебурек',
    '4',
    'кроссовок New Balance',
    'спать',
    'не спать',
    'стол',
    'работяга',
    'мамин симпатяга'
  ]

  const span = document.querySelector('.random span')
  const button = document.querySelector('.random button')

  button.addEventListener('click', () => {
    let index = Math.floor(words.length * Math.random())
    span.innerHTML = words[index]
  })
}

function styleOnClick() {
  const circle = document.querySelector('.style div')
  const button = document.querySelector('.style button')
  let counter = 0

  button.addEventListener('click', () => {
    counter++
    console.log(counter)

    if (counter % 10 == 0) {
      circle.classList.add('coral')
    } else {
      circle.classList.remove('coral')
    }
  })
}
