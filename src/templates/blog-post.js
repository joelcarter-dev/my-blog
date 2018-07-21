import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Content, { HTMLContent } from '../components/Content'
import Subscribe from '../components/Subscribe'
import Plugs from '../components/Plugs'

import Img from 'gatsby-image'


export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  featuredImage,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="blog-view">
      {helmet || ''}

        <div className="header">
         {featuredImage && <Img sizes={featuredImage.childImageSharp.sizes} />}
        <Link to="/" id="arrow" />
         <div className="overlay"></div>
          <div className="title-holder">
            <div className="holder">
              <h1 className="title">
                {title}
              </h1>
              <p>{description}</p>
            </div>
          </div>
        </div>
          <PostContent content={content} className="post-content"/>
          
          <Subscribe />
          
          {tags && tags.length ? (
            <div style={{ marginTop: `4rem` }} className="tag-holder">
              <h4>Tags</h4>
              <ul className="blog-view-taglist">
                {tags.map(tag => (
                  <li key={tag + `tag`}>
                    <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
      <Plugs />
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  featuredImage: PropTypes.object,
  helmet: PropTypes.instanceOf(Helmet),
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <BlogPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      helmet={<Helmet>
        <title>{`${post.frontmatter.title} | Tiny Words`} </title>
        <meta name="description" content={`${post.frontmatter.description}`} />
      </Helmet>}
      tags={post.frontmatter.tags}
      title={post.frontmatter.title}
      featuredImage={post.frontmatter.featuredImage}
    />
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        
        featuredImage {
          childImageSharp {
            sizes(maxWidth: 1000 maxHeight: 500) {
              base64
              aspectRatio
              src
              srcSet
              sizes
              srcWebp
              srcSetWebp
            }
          }
        }
          
      }
    }
  }
`
