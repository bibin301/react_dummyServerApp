import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';

import service from './service/reducer';


const rootReducer = combineReducers({
    service,
});

export const store = createStore(
    rootReducer,
    {},
    applyMiddleware(thunk, routerMiddleware(browserHistory))
);