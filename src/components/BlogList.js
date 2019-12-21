import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = (props) => {
    const blogRows = () => props.blogs.map( (blog , index) =>
        <Blog key={index} {...blog} handleLike={props.handleLike(blog)} />
    )

    return(
        <div>
            <h2>Blogs</h2>
            {blogRows()}
        </div>
    )
}

BlogList.propTypes = {
    blogs: PropTypes.array.isRequired
}

export default BlogList