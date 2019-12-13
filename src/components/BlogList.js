import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = (props) => {
    const blogRows = () => props.blogs.map( (blog , index) =>
        <Blog key={index} title={blog.title} author={blog.author} />
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