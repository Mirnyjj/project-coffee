import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer,  usersReducer, productReducer, appReducer, categoryReducer } from './reducers';

const rootReducer = combineReducers({
    user: userReducer,
    users: usersReducer,
    product: productReducer,
    app: appReducer,
    category: categoryReducer,
})
export function setupStore(){
    return configureStore({
        reducer: rootReducer
})
} 

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];

