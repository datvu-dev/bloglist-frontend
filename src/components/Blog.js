import React from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => (
  <div>
    <p>{props.title} ({props.author})</p>
  </div>
)

Blog.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
}

export default Blog