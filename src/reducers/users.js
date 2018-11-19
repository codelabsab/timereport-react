import {
    SET_USER,
    SET_USERS,

} from '../constants/ActionTypes'

const initialState =
{
    users: [],
    user: null
};

export const getUsers = state => state.users

const users = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return Object.assign({}, state, {
                users: action.users
            })
        case SET_USER:
            return Object.assign({}, state, {
                user: action.user
            })
        
        default:
            return state
    }
}

export default users
