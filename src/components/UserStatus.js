import React from 'react'
import PropTypes from 'prop-types'

const UserStatus = (props) => (
    <div>
        <p>{props.name} logged in <button type="submit" onClick={props.handleLogout}>logout</button></p>
    </div>
)

UserStatus.propTypes = {
    name: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired
}

export default UserStatus