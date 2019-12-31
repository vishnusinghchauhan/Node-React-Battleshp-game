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
    var current_user = obj.current_user
    return (dispatch) => {
        return axios.post(API_URL + 'addfire/', obj)
            .then((res) => {
                console.log("response ", res);
               
                var obj = { fire: current_user + " " + res.data }
                var lastElement = res && res.data.split(" ")[1]
                console.log("RRRRRRRRR0", lastElement)
                var test = document.getElementsByClassName(eventFor);

                if(lastElement == 'Hit'){
                    for(var j = 0; j < test.length; j++){
                        test[j].className += " shipped";
                        test[j].innerText = "Hit";
                    }
                }else if(lastElement == 'Destroyed'){
                     for(var k = 0; k < test.length; k++){
                        test[k].className += " shipped";
                        test[k].innerText = "Hit";
                    }
                }  else if(lastElement == 'winner'){
                     for(var k = 0; k < test.length; k++){
                        test[k].className += " shipped";
                        test[k].innerText = "Hit";
                    }
                    var element = document.getElementById("fullSection");
                    element.classList.add("endgame");
                }else{
                    for(var i = 0; i < test.length; i++){
                        test[i].className += " notshipped";
                        test[i].innerText = "Miss";
                    }
                }
                dispatch({ type: FIRE_BOARD, payload: obj })
            });
    }
}
