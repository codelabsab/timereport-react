import { SELECT_DATE_PERIOD } from '../constants/ActionTypes'

const initialState =
{
    start: null,
    end: null
};

//export const getUsers = state => state.allUsers

const datepicker = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_DATE_PERIOD:
            return Object.assign({}, state, {
                start: action.date.start,
                end: action.date.end
            })
        default:
            return state
    }
}

export default datepicker
