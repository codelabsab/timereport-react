import { combineReducers } from 'redux'
import users, * as fromUsers from './users'


export default combineReducers({
    users
})

export const getUsers = state => fromUsers.getUsers(state.users)

