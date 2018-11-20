import {
    SELECT_USER,
    SET_USERS,

} from '../constants/ActionTypes'

const initialState =
{
    allUsers: [],
    selectedUser: null
};

export const getUsers = state => state.allUsers

const users = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return Object.assign({}, state, {
                allUsers: action.allUsers
            })
        case SELECT_USER:
            return Object.assign({}, state, {
                selectedUser: action.selectedUser
            })
        
        default:
            return state
    }
}

export default users
