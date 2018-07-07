import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

import '../layouts/tags.sass'

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const postLinks = posts.map(post => (
      <li key={post.node.fields.slug} className="post-list">
        <Link to={post.node.fields.slug}>
          {post.node.frontmatter.title}
        </Link>
      </li>
    ))
    const tag = this.props.pathContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } tagged with “${tag}”`

    return (
      <section className="tag-view">
        <Helmet title={`${tag} | ${title}`} />
        <div className="tagpage-holder">
        
          <h3>{tagHeader}</h3>
          <ul>{postLinks}</ul>
          <div className="all">
            <Link to="/tags/">Browse all tags →</Link>
            <Link to="/">Back to Home →</Link>
          </div>
            
        </div>
      </section>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
