import React from 'react'
import PropTypes from 'prop-types'
const ALL_USER = "all_users";

const NameSelection = ({ usersName, selectUser }) => (
    <select
        title="Pick User"
        className="custom-select"
        onChange={e => selectUser(e.target.value)}>
        <option key={ALL_USER} value={ALL_USER}>All Users</option>
        {
            usersName.map(userName =>
                <option key={userName} value={userName}>{userName}</option>
            )
        }
    </select>
)

NameSelection.propTypes = {
    selectUser: PropTypes.func.isRequired,
    usersName: PropTypes.array
}

export default NameSelection
