import React from 'react'
import classNames from 'classnames'

export default function A_MainMenu({ url, text, current, type }) {
  const classes = classNames({
    A_MainMenu: true,
    current: current,
    [`${type}`]: true
  })

  return (
    <a href={url} className={classes}>
      {text}
    </a>
  )
}
