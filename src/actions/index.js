import * as types from '../constants/ActionTypes'
import * as WebService from '../services/WebService';

export const setUser = user => ({ type: types.SET_USER, user })
export const setUsers = users => ({ type: types.SET_USERS, users })


export const getAllUsers = () => dispatch => {
    WebService.getUsers()
    .then(users => {
      dispatch(setUsers(users))
    })
  }

 


// export const setAuthToken = auth_token => ({ type: types.SET_AUTH_TOKEN, auth_token })
// export const setRedirect = () => ({ type: types.SET_AUTH_TOKEN, redirect: true })
// export const setUsers = users => ({ type: types.SET_USERS, users })
// export const setTimeReport = time_report => ({ type: types.SET_TIME_REPORT, time_report })
// export const setDateTimePeriod = (start_date, end_date) => ({ type: types.SET_DATETIME_PERIOD, start_date, end_date })
