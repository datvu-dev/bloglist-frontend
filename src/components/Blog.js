import React from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => (
  <div className="blog">
    <p>{props.title} ({props.author}, {props.likes} likes) <button onClick={props.handleLike}>like</button></p>
  </div>
)

Blog.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
}

export default Blog