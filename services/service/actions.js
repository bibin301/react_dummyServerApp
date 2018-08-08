import * as types from './actionTypes';
import axios from 'axios';

export const signUpUser = credentials => dispatch => {
    return axios
        .post('http://localhost:3000/users', credentials)
        .then(response => {
            return dispatch({
                type: types.SIGN_UP_SUCCESS,
                data: response
            });
        })
        .catch(error => {
            return dispatch({
                type: types.SIGN_UP_ERROR,
                error
            });
        });
};


export const dashboardList = () => dispatch => {
    return axios.get('http://localhost:3000/empList').then(response => {
        return dispatch({
            type: types.LIST_SUCCESS,
            data: response
        })
    }).catch(error => {
        type: types.LIST_SUCCESS,
        error
    })
};
export const signInUser = credentials => dispatch => {
    console.log(credentials.user.username);
    return axios
        .get('http://localhost:3000/users?user.userName=' + credentials.user.username + '&user.password=' + credentials.user.username)
        .then(response => {
            return dispatch({
                type: types.SIGN_IN_SUCCESS,
                data: response
            });

            //return response;
        })
        .catch(error => {
            return dispatch({
                type: types.SIGN_IN_ERROR,
                error
            });
        });
};

export const updateUser = credentials => dispatch => {
    console.log(credentials.user.firstName);
    return axios
        .put('http://localhost:3000/users/' + credentials.user.id)
        .then(response => {
            return dispatch({
                type: types.UPDATE_IN_SUCCESS,
                data: response
            });

            //return response;
        })
        .catch(error => {
            return dispatch({
                type: types.UPDATE_IN_ERROR,
                error
            });
        });
};

export const updateList = credentials => dispatch => {
  console.log("updateList" ,credentials);
  //.get('http://localhost:3000/users?user.userName=' + credentials.user.username + '&user.password=' + credentials.user.username)
    return axios.put('http://localhost:3000/empList/' +credentials.id,credentials).then(response => {
        return dispatch({
            type: types.EDIT_IN_SUCCESS,
            data: response
        })
    }).catch(error => {
        return dispatch({
            type: types.UPDATE_IN_ERROR,
            error
        })
    });



};


export const deleteList = credentials => dispatch =>{

    return axios.delete('http://localhost:3000/empList/' +credentials.id,credentials).then(response=>{
        return dispatch({
            type:types.DELETE_IN_SUCCESS,
            data:response

        })
    }).catch(error =>{
        return dispatch({
            types:types.DELETE_LIST,
            error
        })
    })

};
export const addEmployeeList = credentials => dispatch =>{

    return axios.post('http://localhost:3000/empList',credentials).then(response=>{
        console.log('verify',credentials,types,types.ADD_IN_SUCCESS)
        return dispatch({
            type: types.ADD_IN_SUCCESS,
            data:response

        })
    }).catch(error =>{
        // return dispatch({
        //     types:types.ERROR_DELETE_LIST,
        //     error
        // })
    })

};
