import React from 'react';

const siteTitle = "Strange Words"

const titles = [
  "Web Developer",
  "Artist",
  "Tiny House Builder"
]

const blurb = `
I'm a guy with some interesting projects and some strange ideas. I built this site to talk about them. 
Take a look - you might find something you’d like to talk about too.
`

export const About = (props) => {
  return (
    <div className="header">
      <h1 className="siteTitle">{siteTitle}</h1>
      <div className="titles">
        <span>{titles[0]}</span>
        <spam className="line"></spam>
        <span>{titles[1]}</span> 
        <spam className="line"></spam>
        <span>{titles[2]}</span>
      </div>
      <div className="blurb">
        <p>
          {blurb}
        </p>
      </div>
    </div>  
  )
}

export default About