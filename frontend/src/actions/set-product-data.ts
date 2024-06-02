import { ActionSetProduct, Product } from "../models/models";
import { ACTION_TYPES } from "./action-types";

export const setProductData = (productData: Product): ActionSetProduct => ({
    type: ACTION_TYPES.SET_PRODUCT_DATA,
    payload: productData,
});