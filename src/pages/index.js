import React from 'react'
import PropTypes from 'prop-types'
import BlogFeed from '../components/BlogFeed.js'
import { uniqBy, sortBy } from 'lodash'

export default class IndexPage extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      postTypes: this.setData()
    };    
  }

  setData = () => {
    let posts = []
    this.props.data.allMarkdownRemark.edges.map( ({node: item }, i) => {
      posts.push(item)
    })
    let sortedPosts = uniqBy(posts, (i)=> {return i.frontmatter.type})
    console.log(sortedPosts)
    return sortedPosts
  }
  
  sortFeed = (items) => {
    let category = sortBy(this.state.postTypes, items)
    console.log(items, category)
  }
    
  render() {
    const { data } = this.props
    
    return (
      <section className="home">
        <section id="about">
        
          <div className="links">
            <ul>
              <li onClick={this.sortFeed}>
                latest posts
              </li>
              {this.state.postTypes.map( (item, i) => (
                <li key={i} onClick={this.sortFeed.bind(this, item.frontmatter.type)}>
                  {item.frontmatter.type}
                </li> 
              ))}
            </ul>
          </div>
        </section>

        <BlogFeed postData={data.allMarkdownRemark}/>
         
      </section>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
query IndexQuery {
  allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {templateKey: {eq: "blog-post"}}}) {
    edges {
      node {
        excerpt(pruneLength: 400)
        id
        fields {
          slug
        }
        frontmatter {
          title
          templateKey
          date(formatString: "MMMM DD, YYYY")
          tags
          type
          featuredImage {
            childImageSharp {
              sizes(maxWidth: 1000 maxHeight: 500) {
                base64
                aspectRatio
                src
                srcSet
                sizes
              }
            }
          }
        }
      }
    }
  }
}

`