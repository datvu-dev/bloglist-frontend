import React from 'react'
import PropTypes from 'prop-types'

const AddForm = (props) => {
    return (
      <div>
        <h2>Add a new blog</h2>
        <form onSubmit={props.handleAdd}>
          <div>
            Title
              <input
              type="text"
              value={props.title}
              name="Title"
              onChange={({ target }) => props.setTitle(target.value)}
            />
          </div>
          <div>
            Author
              <input
              type="text"
              value={props.author}
              name="Author"
              onChange={({ target }) => props.setAuthor(target.value)}
            />
          </div>
          <div>
            Url
              <input
              type="text"
              value={props.url}
              name="Url"
              onChange={({ target }) => props.setUrl(target.value)}
            />
          </div><div>
            Likes
              <input
              type="number"
              value={props.likes}
              name="Likes"
              onChange={({ target }) => props.setLikes(target.value)}
            />
          </div>
          <button type="submit">Add Blog</button>
        </form>    
      </div>  
    )
}

AddForm.propTypes = {
    handleAdd: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    setTitle: PropTypes.func.isRequired,
    author: PropTypes.string.isRequired,
    setAuthor: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    setUrl: PropTypes.func.isRequired,
    likes: PropTypes.string.isRequired,
    setLikes: PropTypes.func.isRequired
}

export default AddForm