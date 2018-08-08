import * as types from './actionTypes';
import initialState from './initialState';

const sessionReducer = (state = initialState, action) => {
    console.log('reducer', action)
    switch (action.type) {
        case types.SIGN_UP_SUCCESS:
            return Object.assign({}, state, {
                credentials: action,
            });
        case types.SIGN_IN_SUCCESS:
            return Object.assign({}, state, {
                credentials: action,
            });
        case types.UPDATE_IN_SUCCESS:
            return Object.assign({}, state, {
                credentials: action,
            });
        case types.LIST_SUCCESS:
            return Object.assign({}, state, {
                credentials: action,
            });
        case types.EDIT_IN_SUCCESS:
            return object.assign({}, state, {
                credentials: action,
            });
        case types.ADD_IN_SUCCESS:
            return object.assign({}, state, {
                credentials: action,
            });

        default:
            return state;
    }
};

export default sessionReducer;