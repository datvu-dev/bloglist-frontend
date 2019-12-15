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
      <p onClick={() => toggleVisibility()}><b>{props.content.title}</b> ( {props.content.author} )</p>
      <div style={showWhenVisible}>
        <p><a href={props.content.url}>{props.content.url}</a></p>
        <p>{props.content.likes} likes <button onClick={props.handleLike}>Like</button></p>
      </div>
    </div>
  )
}

Blog.propTypes = {
    content: PropTypes.object.isRequired
}

export default Blog