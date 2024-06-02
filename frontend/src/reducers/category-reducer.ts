import { ACTION_TYPES } from "../actions";
import { ActionSetCategory, Category } from "../models/models";

const initialCategoryState: Category[] = [];

export const categoryReducer = (state = initialCategoryState, action: ActionSetCategory) => {
    switch (action.type) {
        case ACTION_TYPES.SET_CATEGORY_DATA:
            return [action.payload];
        case ACTION_TYPES.RESET_CATEGORY_DATA:
            return initialCategoryState;
        default: 
            return state;
    }
}