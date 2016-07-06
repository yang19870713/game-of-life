import * as actions from 'constants/actions';
import {combineReducers} from 'redux';

export function current(state="", action){
    switch (action.type) {
        case actions.SELECT_PRESET:
            return action.payload;
        default:
            return state;
    }
}

export function all(state={}, action){
    switch (action.type) {
        case actions.LOAD_PRESETS:
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    current,
    all
})
