import React, { useState, useEffect } from 'react'
import './App.css'
import loginService from './services/login'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import AddForm from './components/AddForm'
import LoginForm from './components/LoginForm'
import UserStatus from './components/UserStatus'
import Notification from './components/Notification'
import BlogList from './components/BlogList'

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

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
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
      setMessage(
        {content:`Wrong username or password!`, type: 'error'}
      )

      setTimeout(() => {
        setMessage(null)
      }, 3000)
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
          {content: `A new blog ${title.trim()} added`, type: 'success'}
        )

        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })

      
    } catch (exception) {
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }
  }

  const handleLike = async => (blogObj) => (event) => {
    event.preventDefault()
    blogObj.likes = blogObj.likes + 1

    try {
      blogService.update(
        blogObj
      )
      .then(response => {
        setBlogs(blogs.map(blog => blog.id !== blogObj.id ? blog : response))

        setMessage(
          {content: `Blog ${blogObj.title.trim()} updated`, type: 'success'}
        )

        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })

      
    } catch (exception) {
    //   // setErrorMessage('Wrong credentials')
    //   // setTimeout(() => {
    //   //   setErrorMessage(null)
    //   // }, 5000)
    }
  }

  return (
    <div className="App">
      <Notification message={message} />
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
        /> :
        <div>
          <UserStatus name={user.name} handleLogout={handleLogout} />
          <Togglable buttonLabel='Add new'>
            <AddForm 
              handleAdd={handleAdd} 
              title={title} setTitle={setTitle}
              author={author} setAuthor={setAuthor}
              url={url} setUrl={setUrl}
              likes={likes} setLikes={setLikes}
            />
          </Togglable>
          <BlogList blogs={blogs} handleLike={handleLike()}/>
        </div>
      }
    </div>
  );
}

export default App;
