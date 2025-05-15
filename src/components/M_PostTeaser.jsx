import React from 'react'
import A_Text from './A_Text.jsx'
// import A_Image from './A_Image.jsx'

const M_PostTeaser = ({ title, description, url, image, tags }) => {
  return (
    <a className="M_PostTeaser" href={url}>
      <A_Text type="h3" text={title} />
      <A_Text type="p" text={description} />
      <div className="C_postTeaserTags">
        {tags.map((tag, i) => (
          <A_Text type="tag" text={tag} key={i} />
        ))}
      </div>
    </a>
  )
}

export default M_PostTeaser
