import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Content, { HTMLContent } from '../components/Content'
import Subscribe from '../components/Subscribe'
import Plugs from '../components/Plugs'
import BackArrow from '../components/BackArrow'
import Img from 'gatsby-image'

export class BlogPostTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      width: 0, 
      height: 0,
      darkArrow: false
    }
  }
  
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  
  handleScroll = () => {
    let offsetTop = Math.abs(this.instance.getBoundingClientRect().top)
    if (offsetTop >= 360) {
      this.setState({darkArrow: true})
    } else {
      this.setState({darkArrow: false})
    }
  }
  
  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }
  
  render() {
    const PostContent = this.props.contentComponent || Content

    return (
      <section className="blog-view" ref={(el) => this.instance = el}>
        {this.props.helmet || ''}

          <div className="header">
           {this.props.featuredImage && <Img sizes={this.props.featuredImage.childImageSharp.sizes} />}
           
          <BackArrow dark={this.state.darkArrow}/>
          
           <div className="overlay"></div>
            <div className="title-holder">
              <div className="holder">
                <h1 className="title">
                  {this.props.title}
                </h1>
                <p>{this.props.description}</p>
              </div>
            </div>
          </div>
            <PostContent content={this.props.content} className="post-content"/>
            
            <Subscribe />
            
            {this.props.tags && this.props.tags.length ? (
              <div style={{ marginTop: `4rem` }} className="tag-holder">
                <h4>Tags</h4>
                <ul className="blog-view-taglist">
                  {this.props.tags.map(tag => (
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
