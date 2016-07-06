import * as actions from 'constants/actions';
export default function population(state=[], action){
    switch (action.type) {
        case actions.UPDATE_POPULATION:
            return action.payload;
        default:
            return state;
    }
}
