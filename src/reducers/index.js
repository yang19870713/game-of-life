import {combineReducers} from 'redux';
import population from 'reducers/population';
import preset from 'reducers/preset';

const rootReducer = combineReducers({
        population,
        preset
})
export default rootReducer;
