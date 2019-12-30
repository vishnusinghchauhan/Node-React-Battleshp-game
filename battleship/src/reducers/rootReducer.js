import { ADD_BOARD , FIRE_BOARD} from '../actions/ActionTypes'


const initialState = {
    userBoards: [],
    fireboard: []
}
const rootReducer = (state = initialState, action) => {
	console.log("actionactionaction",action)

    switch (action.type) {
    	case ADD_BOARD:
            return {
                ...state,
                userBoards: action.payload,
            };
            case FIRE_BOARD:
            return {
                ...state,
                fireboard: action.payload,
            };
        default:
            return state
    }
}

export default rootReducer;