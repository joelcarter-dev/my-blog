import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import '../../layouts/tags.sass'

const TagsPage = ({
  data: { allMarkdownRemark: { group }, site: { siteMetadata: { title } } },
}) => (
  <section className="tag-view">
    <Helmet title={`Tags | ${title}`} />
    <div className="tagpage-holder">

        <div className="">
          <h1 className="title">Tags</h1>
          <ul className="taglist">
            {group.map(tag => (
              <li key={tag.fieldValue}>
                <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
          <div className="all">
            <Link to="/">Back to Home →</Link>
          </div>
        </div>

    </div>
  </section>
)

export default TagsPage

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
