import React, { Component } from 'react';

import addToMailchimp from 'gatsby-plugin-mailchimp'

const hidden = {
  position: "absolute",
  left: "-5000px"
}

export default class Subscribe extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      value: "",
      data: [],
      formResult: ""
    };   
  }
  // Since `addToMailchimp` returns a promise, you
  // can handle the response in two different ways:
 
  // Note that you need to send an email & optionally, listFields
  // these values can be pulled from React state, form fields,
  // or wherever.  (Personally, I recommend storing in state).
 
  // 1. via `.then`
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
    addToMailchimp(this.state.value)
      .then((data) => {
        // I recommend setting data to React state
        // but you can do whatever you want
        console.log(data)
        this.setState({
          status: `success`,
          msg: result.msg,
        })
      })
      .catch(() => {
        // unnecessary because Mailchimp only ever
        // returns a 200 status code
        // see below for how to handle errors
        this.setState({
          status: `error`,
          msg: err,
        })
      })
  }
  
  render () {
    return (

      <form onSubmit={this.handleSubmit} id="subscribe">

        <h2>Subscribe for new posts</h2>
        <div className="imputs">
          <label htmlFor="mce-EMAIL">Email Address:</label>
          <input 
            type="email" 
            value={this.state.value} 
            name="EMAIL" 
            className="required email" 
            id="mce-EMAIL"
            onChange={this.handleChange}
          />
        </div>
        <div className="submit">
          <input type="submit" value="Subscribe" name="subscribe"/>
        </div>

        <div id="mce-responses" className="clear">

          {this.state.data.msg === `error` && (
            <div
              id="error-response"
              className="response"
              dangerouslySetInnerHTML={{ __html: this.state.data.msg }}
            />
          )}
          
          {this.state.status === "success" && (
            <div 
              id="success-response" 
              className="response"
            >Thank you! Youʼll receive your first email shortly.</div>  
          )}
          
        </div>    
        
        {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
        <div style={hidden} aria-hidden="true"> 
          <input type="text" name="b_02172f0878bd5957e77543f09_b2369b9795" tabIndex="-1" value=""/>
        </div>
      </form>

    )
  }
}
