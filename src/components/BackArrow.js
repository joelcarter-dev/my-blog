import React from 'react';
import Link from 'gatsby-link'

const dark = {
    "borderTop": "1px solid #070f3bb3",
    "borderLeft": "1px solid #070f3bb3"
  }

export const BackArrow = (props) => (
  <Link to="/" id="arrow" style={props.dark ? dark : null}/>  
)

export default BackArrow