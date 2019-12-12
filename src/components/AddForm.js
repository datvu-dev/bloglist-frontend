import React from 'react'

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

export default AddForm