import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import { thunk } from 'redux-thunk';
import { userReducer,  usersReducer, productReducer, appReducer, categoryReducer } from './reducers';

const reducer = combineReducers({
    user: userReducer,
    users: usersReducer,
    product: productReducer,
    app: appReducer,
    category: categoryReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));