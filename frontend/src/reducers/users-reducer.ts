import { ActionSetUser, User } from './../models/models';
const initialUsersState: User[] = [];

export const usersReducer = (state = initialUsersState, action: ActionSetUser) => {
    switch (action.type) {
        default: 
            return state;
    }
}