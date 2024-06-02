import { ActionSetUser, User } from './../models/models';
import { ACTION_TYPES } from "./action-types";

export const setUser = (user: User): ActionSetUser => ({
    type: ACTION_TYPES.SET_USER,
    payload: user,
});