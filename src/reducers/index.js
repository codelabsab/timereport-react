import { combineReducers } from 'redux'
import users, * as fromUsers from './users'
import datepicker from './datepicker'
import timereport, * as fromTimeReport from './timereport'

export default combineReducers({
    users,
    datepicker,
    timereport
})

export const getUsers = state => fromUsers.getUsers(state.users)

export const getTimeReportData = state => fromTimeReport.getTimeReport(state.timereport)