import { combineReducers } from 'redux'
import company from "./companyReducer";

const rootReducer = combineReducers({  
	company: company
})

export default rootReducer