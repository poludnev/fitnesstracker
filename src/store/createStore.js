import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import firstReducer from '../reducers/firstReducer';
import secondReducer from '../reducers/secondReducer';


const reducers = combineReducers({
  
  first: firstReducer,
  second: secondReducer,
})

const logger = createLogger({
  collapsed: (getState, action) => true,
})

const middlewares = [];

middlewares.push(thunk);
middlewares.push(logger);

const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;
