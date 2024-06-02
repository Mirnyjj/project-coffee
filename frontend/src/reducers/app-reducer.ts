import { Action } from './../models/models';
import { ACTION_TYPES } from "../actions";

const initialAppState = {
    wasLogout: false,
};

export const appReducer = (state = initialAppState, action: Action) => {
    switch (action.type) {
        case ACTION_TYPES.LOGOUT:
            return {
                ...state,
                wasLogout: !state.wasLogout,
            }
        default: 
            return state;
    }
}