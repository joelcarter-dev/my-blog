import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import './all.sass'

const TemplateWrapper = ({ children }) => (
  <div className="root">
    <Helmet title="Strange Words" />
    {/*<Navbar />*/}
    <div>{children()}</div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
