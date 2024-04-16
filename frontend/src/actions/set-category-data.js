import { ACTION_TYPE } from "./action-type";

export const setCategoryData = (categoryData) => ({
    type: ACTION_TYPE.SET_CATEGORY_DATA,
    payload: categoryData,
});