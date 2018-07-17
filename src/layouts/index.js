import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import './all.sass'

const desc = `
 A blog about tiny houses, painting, web development, and more.
`

const TemplateWrapper = ({ children }) => (
  <div className="root">
    <Helmet> 
      <title>Tiny Words</title>
      <meta name="description" content={`${desc}`} />
      <html lang="en" />
    </Helmet>
    {/*<Navbar />*/}
    <div>{children()}</div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
