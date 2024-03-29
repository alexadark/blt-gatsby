import React from "react"
import ParsedContent from "baseUtils/ParsedContent"
import { ActivatePostScripts } from "baseUtils"

export const PostEntryContent = ({ post, location, ...props }) => {
  const content = location === "single" ? post.content : post.excerpt
  const attributes = location === "single" ? { id: "content" } : {}
  return (
    <div {...attributes} {...props}>
      <div
        css={{
          "&:after": {
            clear: "both",
            content: "''",
            display: "block",
          },
        }}
      >
        <ActivatePostScripts />
        <ParsedContent content={content} />
      </div>
    </div>
  )
}
