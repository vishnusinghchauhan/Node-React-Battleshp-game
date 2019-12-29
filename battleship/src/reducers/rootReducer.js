import { ADD_BOARD } from '../actions/ActionTypes'


const initialState = {
    userBoards: []
}
const rootReducer = (state = initialState, action) => {
	console.log("actionactionaction",action)

    switch (action.type) {
    	case ADD_BOARD:
            return {
                ...state,
                userBoards: action.payload,
            };
        default:
            return state
    }
}

export default rootReducer;