import { graphql } from "gatsby";

export const commonFragments = graphql`
  fragment LargeImage on WpMediaItem {
    altText
    sourceUrl
    caption
    description
    # localFile {
    #   childImageSharp {
    #     gatsbyImageData(
    #       # width: 940
    #       # height: 626
    #       quality: 80
    #       aspectRatio: 1.5
    #       layout: CONSTRAINED
    #       # placeholder: BLURRED
    #     )
    #     original {
    #       height
    #       width
    #       src
    #     }
    #   }
    # }
  }

  fragment ListingImage on WpMediaItem {
    altText
    sourceUrl
    # localFile {
    #   childImageSharp {
    #     gatsbyImageData(
    #       # width: 249
    #       # height: 166
    #       aspectRatio: 1.5
    #       quality: 80
    #       layout: CONSTRAINED
    #       # placeholder: BLURRED
    #     )
    #     original {
    #       height
    #       width
    #       src
    #     }
    #   }
    # }
  }

  fragment NlImage on WpMediaItem {
    altText
    sourceUrl
    # localFile {
    #   childImageSharp {
    #     gatsbyImageData(
    #       aspectRatio: 1.5
    #       width: 1000
    #       quality: 80
    #       layout: CONSTRAINED
    #       # placeholder: BLURRED
    #     )
    #     original {
    #       height
    #       width
    #       src
    #     }
    #   }
    # }
  }

  fragment WriterImage on WpMediaItem {
    altText
    sourceUrl
    # localFile {
    #   childImageSharp {
    #     gatsbyImageData(
    #       width: 414
    #       height: 276
    #       quality: 80
    #       layout: CONSTRAINED
    #       # placeholder: BLURRED
    #     )
    #     original {
    #       height
    #       width
    #       src
    #     }
    #   }
    # }
  }

  fragment ThumbImage on WpMediaItem {
    altText
    sourceUrl
    # thumbLocalFile: localFile {
    #   childImageSharp {
    #     gatsbyImageData(
    #       width: 110
    #       aspectRatio: 1.5
    #       layout: CONSTRAINED
    #       # placeholder: BLURRED
    #     )
    #     original {
    #       height
    #       width
    #       src
    #     }
    #   }
    # }
  }

  fragment FullImage on WpMediaItem {
    altText
    sourceUrl
    # localFile {
    #   childImageSharp {
    #     gatsbyImageData(
    #       quality: 80
    #       layout: FULL_WIDTH
    #       # placeholder: BLURRED
    #     )
    #   }
    # }
  }

  fragment Tag on WpTag {
    id
    uri
    slug
    name
  }
  fragment Category on WpCategory {
    id
    uri
    slug
    name
  }
  fragment User on WpUser {
    id
    uri
    slug
    name
  }

  fragment MenuItem on WpMenuItem {
    label
    path
    id
    cssClasses
  }
  fragment SeoPage on WpPostTypeSEO {
    metaDesc
    metaKeywords
    opengraphAuthor
    opengraphDescription
    schema {
      articleType
      pageType
      raw
    }
    opengraphType
    opengraphTitle
    opengraphModifiedTime
    opengraphUrl
    twitterDescription
    twitterTitle
    cornerstone
    title
    # opengraphImage {
    #   localFile {
    #     childImageSharp {
    #       original {
    #         src
    #         height
    #         width
    #       }
    #     }
    #   }
    # }
    # twitterImage {
    #   localFile {
    #     childImageSharp {
    #       original {
    #         src
    #         height
    #         width
    #       }
    #     }
    #   }
    # }
  }
`;
