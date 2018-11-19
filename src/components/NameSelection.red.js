import React from 'react'
import PropTypes from 'prop-types'
const ALL_USER = "all_users";

const NameSelection = ({ setUser }) => (
    <select
        title="Pick User"
        className="custom-select"
        onChange={userName => setUser(userName)}>
        <option key={ALL_USER} value={ALL_USER}>All Users</option>
        {
            // usersName.map(
            //     userName => <option key={userName} value={userName}>{userName}</option>
            // )
        }
    </select>
)

NameSelection.propTypes = {
    setUser: PropTypes.func.isRequired,
    usersName:PropTypes.array
}

export default NameSelection
