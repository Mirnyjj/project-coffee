import { ACTION_TYPES } from "../actions";
import { ActionSetProduct, Product } from "../models/models";

const initialProductState: Product[] = [];

export const productReducer = (state = initialProductState, action: ActionSetProduct) => {
    switch (action.type) {
        case ACTION_TYPES.SET_PRODUCT_DATA:
            return [action.payload];
        case ACTION_TYPES.RESET_PRODUCT_DATA:
            return initialProductState;
        default: 
            return state;
    }
};