import React from 'react'

const UserStatus = (props) => (
    <div>
        <p>{props.name} logged in <button type="submit" onClick={props.handleLogout}>logout</button></p>
    </div>
)

export default UserStatus