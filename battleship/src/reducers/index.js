import { combineReducers } from 'redux'
import root from "./rootReducer";

const rootReducer = combineReducers({  
	board: root
})

export default rootReducer