import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
// import { composeWithDevTools } from "redux-devtools-extension";
/*const middleware = [
    thunk
]*/
const initialState = {};

const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/*export default createStore(rootReducer, withDevTools(
    applyMiddleware(...middleware)
))*/
/*const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);
export default store*/
const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
     //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);


export default store;