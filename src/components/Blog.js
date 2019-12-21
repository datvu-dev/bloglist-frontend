import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => {
    const [visible, setVisible] = useState(false)

    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
  }

  return (
    <div className="blog">
      <p className="title" onClick={() => toggleVisibility()}><b>{props.title}</b> ( {props.author} )</p>
      <div className="additional-info" style={showWhenVisible}>
        <p><a href={props.url}>{props.url}</a></p>
        <p>{props.likes} likes <button onClick={props.handleLike}>Like</button></p>
      </div>
    </div>
  )
}

Blog.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    handleLike: PropTypes.func.isRequired
}

export default Blog