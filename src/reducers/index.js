import { combineReducers } from 'redux'
import users, * as fromUsers from './users'
import datepicker from './datepicker'

export default combineReducers({
    users,
    datepicker
})

export const getUsers = state => fromUsers.getUsers(state.users)