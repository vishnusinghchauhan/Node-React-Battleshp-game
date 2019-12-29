import { ADD_BOARD } from './ActionTypes';
import axios from "axios";
import history from '../history'
const API_URL = 'http://localhost:3001/api/';


export const addUserBoard = (users) => {
    console.log("usersusersusers", users)
    return (dispatch) => {
        return axios.post(API_URL + 'adduserboard/', users)
            .then((res) => {
                console.log("response ", res);
                dispatch({ type: ADD_BOARD, payload: res.data })
                history.push(`/userboards`)
            });
    }
}


export const addDevice = (obj) => {
    console.log("usersusersusers", obj)
    return (dispatch) => {
        return axios.post(API_URL + 'adddevice/', obj)
            .then((res) => {
                console.log("response ", res);
                dispatch({ type: ADD_BOARD, payload: res.data })
                history.push(`/userboards`)
            });
    }
}
