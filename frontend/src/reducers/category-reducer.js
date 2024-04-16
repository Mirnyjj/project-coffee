import { ACTION_TYPE } from "../actions";

const initialCategoryState = [];

export const categoryReducer = (state = initialCategoryState, action) => {
    switch (action.type) {
        case ACTION_TYPE.SET_CATEGORY_DATA:
            return [action.payload];
        case ACTION_TYPE.RESET_CATEGORY_DATA:
            return initialCategoryState;
        default: 
            return state;
    }
}