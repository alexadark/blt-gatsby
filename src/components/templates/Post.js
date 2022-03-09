import React from "react";
import { Container } from "baseUiComponents";
import { Layout, PostEntry, Sidebar } from "baseComponents";
import { Seo } from "@gatsbywpthemes/gatsby-plugin-wp-seo";

const Post = ({ post, ctx }) => {
  const { title, uri, headlesswp } = post;

  const pageTemplate = headlesswp?.pageTemplate || "default";
  // const featuredImage =
  //   post.featuredImage?.node.localFile.childImageSharp.original
  const featuredImage = post.featuredImage?.node.sourceUrl;

  return (
    <Layout page={post} type="post">
      <Seo
        title={title}
        uri={uri}
        yoastSeo={ctx.yoastSeo}
        seo={ctx.seo}
        featuredImage={
          featuredImage && {
            src: featuredImage.src,
            width: featuredImage.width,
            height: featuredImage.height,
          }
        }
      />
      <Container className="mainContainer">
        <div className="flex flex-wrap items-start lg:flex-nowrap">
          <PostEntry post={post} location="single" ctx={ctx} isFirst={true} />
        </div>
      </Container>
    </Layout>
  );
};

export default Post;
