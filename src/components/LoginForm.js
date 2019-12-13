import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => (
    <div>
        <header className="App-header">
            <h1>Login to application</h1>
        </header>
        <form onSubmit={props.handleLogin}>
            <div>
            Username: 
                <input
                type="text"
                value={props.username}
                name="Username"
                onChange={({ target }) => props.setUsername(target.value)}
            />
            </div>
            <div>
            Password: 
                <input
                type="password"
                value={props.password}
                name="Password"
                onChange={({ target }) => props.setPassword(target.value)}
            />
            </div>
            <button type="submit">Login</button>
        </form>    
    </div>  
  )

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired
}

export default LoginForm