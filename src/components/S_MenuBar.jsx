import React from 'react'
import A_MainMenu from './A_MainMenu.jsx'

export default function S_MenuBar({ prerender, homeURL, menu }) {
  const currentURL = !prerender ? window.location.href : ''
  const menuElements = menu.map(({ text, url }, i) => {
    const linkURL = homeURL + url

    return (
      <A_MainMenu
        key={i}
        url={linkURL}
        text={text}
        type="text"
        current={currentURL === linkURL}
      />
    )
  })

  return (
    <>
      <A_MainMenu url={homeURL} text="" type="logo" current={false} />
      <div className="C_MainMenu">{menuElements}</div>
    </>
  )
}
