import {createStore, applyMiddleware} from 'redux';
import middlewares from 'configs/middlewares';
import rootReducer from 'reducers';

const
	createStoreWithMiddlewares = applyMiddleware(...middlewares)(createStore),
	store = createStoreWithMiddlewares(rootReducer);

export default store;
