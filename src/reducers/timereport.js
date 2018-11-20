import { RECEIVE_TIMEREPORT } from '../constants/ActionTypes'

const initialState =
{
    data:[]
};

export const getTimeReport = state => state.data

const timereport = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_TIMEREPORT:
            return Object.assign({}, action.data)
        default:
            return state
    }
}

export default timereport
