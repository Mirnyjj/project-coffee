import { Category } from "../models/models";
import { ACTION_TYPES } from "./action-types";

export const setCategoryData = (categoryData: Category) => ({
    type: ACTION_TYPES.SET_CATEGORY_DATA,
    payload: categoryData,
});