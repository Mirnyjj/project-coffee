import { ActionSetUser, User } from './../models/models';
import { ACTION_TYPES } from "../actions";
import { ROLE } from "../constants";

const initialUserState: User = {
    login: '',
    roleId: ROLE.GUEST,
    session: ''
};

export const userReducer = (state = initialUserState, action: ActionSetUser) => {
    switch (action.type) {
        case ACTION_TYPES.SET_USER:
            return {
                ...state,
                ...action.payload,   
            }
        case ACTION_TYPES.LOGOUT:
            return initialUserState;
        default: 
            return state;
    }
}