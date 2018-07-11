import React from 'react'
import PropTypes from 'prop-types'
import BlogFeed from '../components/BlogFeed.js'
import About from '../components/About.js'
import { uniqBy, sortBy } from 'lodash'

export default class IndexPage extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      postTypes: this.setData(),
      blogFeed:  this.props.data.allMarkdownRemark.edges,
      currentType: "Latest"
    };    
  }

  setData = () => {
    let posts = []
    this.props.data.allMarkdownRemark.edges.map( ({node: item }, i) => {
      posts.push(item)
    })
    let category = uniqBy(posts, (i)=> {return i.frontmatter.type})
    return category
  }
  
  sortFeed = (typeName) => {
    let sortedPosts = this.props.data.allMarkdownRemark.edges
    if (typeName !== "latest") {
      sortedPosts = this.props.data.allMarkdownRemark.edges.filter(
        (item) => { 
          return item.node.frontmatter.type === typeName 
        }
      )
    }
    this.setState({blogFeed: sortedPosts, currentType: typeName})
  }
    
  render() {
    const { data } = this.props
    
    return (
      <section className="home">
        <About />
        <section id="about">
          <div className="links">
            <ul>
              <li onClick={this.sortFeed.bind(this, "latest")}>
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

        <BlogFeed postData={this.state.blogFeed} title={this.state.currentType}/>
         
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