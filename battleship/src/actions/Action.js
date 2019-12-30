import { ADD_BOARD , FIRE_BOARD} from './ActionTypes';
import axios from "axios";
import history from '../history'
const API_URL = 'http://localhost:3001/api/';


export const addUserBoard = (users) => {
    console.log("addUserBoard action", users)
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
    console.log("addDevice action", obj)
    return (dispatch) => {
        return axios.post(API_URL + 'adddevice/', obj)
            .then((res) => {
                console.log("response ", res);
                //dispatch({ type: ADD_BOARD, payload: res.data })
                //history.push(`/userboards`)
            });
    }
}


export const addFireEvent = (obj) => {
    console.log("addFireEvent action", obj)
    var eventFor = obj.fire+obj.eventforid
    //document.getElementById(eventFor).classList.add("notshipped");
    var testarray = document.getElementsByClassName(eventFor);
    for(var i = 0; i < testarray.length; i++)
    {
        testarray[i].className += " notshipped";
    }
    return (dispatch) => {
        return axios.post(API_URL + 'addfire/', obj)
            .then((res) => {
                console.log("response ", res);
                var obj = {
                    fire: res.data 
                }
                if(res && res.data){
                    var test = document.getElementsByClassName(eventFor);
                    for(var j = 0; j < test.length; j++)
                    {
                        test[j].className += " shipped";
                    }
                }
                dispatch({ type: FIRE_BOARD, payload: obj })
            });
    }
}
