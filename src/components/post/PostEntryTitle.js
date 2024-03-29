import React from "react"
import { Link } from "gatsby"

export const PostEntryTitle = ({ post, location, ...props }) => {
  const { title, uri } = post

  return (
    <>
      {location === "single" ? (
        <h1 dangerouslySetInnerHTML={{ __html: title }} {...props} />
      ) : (
        <h2 {...props}>
          <Link to={`${uri}`} dangerouslySetInnerHTML={{ __html: title }} />
        </h2>
      )}
    </>
  )
}
