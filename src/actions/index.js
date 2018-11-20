import * as types from '../constants/ActionTypes'
import * as WebService from '../services/WebService'

export const selectUser = (selectedUser) => dispatch => dispatch(setUser(selectedUser))

export const getAllUsers = () => dispatch => WebService.getUsers()
  .then(allUsers => dispatch(setUsers(allUsers)))

export const pickDate = (startDate, endDate) => dispatch => dispatch(setDateTimePeriod(startDate, endDate))
 

const setUser = selectedUser => ({ type: types.SELECT_USER, selectedUser })
const setUsers = allUsers => ({ type: types.SET_USERS, allUsers })
const setDateTimePeriod = (start, end) => ({ type: types.SELECT_DATE_PERIOD, date:{start, end} })






// export const setAuthToken = auth_token => ({ type: types.SET_AUTH_TOKEN, auth_token })
// export const setRedirect = () => ({ type: types.SET_AUTH_TOKEN, redirect: true })
// export const setUsers = users => ({ type: types.SET_USERS, users })
// export const setTimeReport = time_report => ({ type: types.SET_TIME_REPORT, time_report })
// export const setDateTimePeriod = (start_date, end_date) => ({ type: types.SET_DATETIME_PERIOD, start_date, end_date })
