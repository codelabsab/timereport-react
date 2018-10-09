import { combineReducers } from 'redux';
import {
    SET_AUTH_TOKEN,
    SET_DATETIME_PERIOD,
    SET_TIME_REPORT,
    SET_USER,
    SET_USERS
} from '../constants/ActionTypes'

const initialState =
{
    auth_token: null,
    users: null,
    time_report: null,
    user: null,
    date_time_period: null
};


function timeReport(state = initialState, action) {
    switch (action.type) {
        case SET_AUTH_TOKEN:
            return Object.assign({}, state, {
                auth_token: action.auth_token
            })
        case SET_USERS:
            return Object.assign({}, state, {
                users: action.users
            })
        case SET_USER:
            return Object.assign({}, state, {
                user: action.user
            })
        case SET_TIME_REPORT:
            return Object.assign({}, state, {
                time_report: action.time_report
            })
        case SET_DATETIME_PERIOD:
            return Object.assign({}, state, {
                date_time_period: {
                    start_date: action.start_date,
                    end_date: action.end_date
                }
            })
        default:
            return state
    }
}

function rootReducer(state, action) {
    return timeReport(state, action);
}

//const rootReducer = combineReducers(timeReport)

export default rootReducer
