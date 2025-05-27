import React, { useEffect, useState } from 'react'
import { getPostTeasers } from '../javascripts/search-data.js'
import O_SearchBar from './O_SearchBar.jsx'
import A_MainMenu from './A_MainMenu.jsx'

export default function S_MenuBar({
  searchInputValue: initialSearchValue,
  prerender,
  menu,
  homeURL
}) {
  const [searchInputValue, setSearchInputValue] = useState(
    prerender ? '' : initialSearchValue
  )
  const [isSearchButtonDisabled, setIsSearchButtonDisabled] = useState(true)
  const [postTeasers, setPostTeasers] = useState([])

  useEffect(() => {
    getPostTeasers().then((data) => {
      setPostTeasers(data)
    })
  }, [])

  const handleSearchInput = (value) => {
    setSearchInputValue(value)
    setIsSearchButtonDisabled(value.length < 3)
  }

  const handleSearchSubmit = () => {
    if (!prerender && searchInputValue.length >= 3) {
      window.location.href = `${homeURL}search.html?request=${searchInputValue}`
    }
  }

  const currentURL = !prerender ? window.location.href : ''
  const menuElements = menu.map(({ text, url }, i) => {
    const linkURL = homeURL + url
    return (
      <A_MainMenu
        key={i}
        current={linkURL === currentURL}
        text={text}
        url={linkURL}
        type="mainMenuItem"
      />
    )
  })

  return (
    <>
      <A_MainMenu
        current={false}
        text="Главная"
        url={homeURL}
        type="mainMenuLogo"
      />

      <div className="C_MainMenu">{menuElements}</div>
    </>
  )
}
