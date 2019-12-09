import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import loginService from './services/login'
import blogService from './services/blogs'
import AddForm from './components/AddForm'
const baseUrl = '/api/login'

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
  const [likes, setLikes] = useState('') 
  const [ message, setMessage ] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      console.log(loggedUserJSON)
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.clear()

    setUser(null)
  }

  const handleAdd = async (event) => {
    event.preventDefault()

    try {
      blogService.create(
        {
          title: title,
          author: author,
          url: url,
          likes: likes
        }
      ).then(response => {
        setBlogs(blogs.concat(response))

        setTitle('')
        setAuthor('')
        setUrl('')
        setLikes('')

        setMessage(
          {content: `Added ${title.trim()}`, type: 'success'}
        )

        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })

      
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const loginForm = () => (
    <div>
      <header className="App-header">
        <h1>Login to application</h1>
      </header>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>    
    </div>  
  )

  const Blogs = () => {
    const blogRows = () => blogs.map(blog =>
      <p>{blog.title} ({blog.author})</p>
    )

    return (
      <div>
        {blogRows()}
      </div>  
    )
  }

  const blogList = () => {
    return(
      <div>
        <header className="App-header">
          <h1>Blogs</h1>
        </header>
        <div>
          <p>{user.name} logged in <button type="submit" onClick={handleLogout}>logout</button></p>
        </div>
        <AddForm 
          handleAdd={handleAdd} 
          title={title} setTitle={setTitle}
          author={author} setAuthor={setAuthor}
          url={url} setUrl={setUrl}
          likes={likes} setLikes={setLikes}
        />
        {Blogs()}
      </div>
    )
  }

  return (
    <div className="App">
      {user === null ?
        loginForm() :
        blogList()
      }
    </div>
  );
}

export default App;
