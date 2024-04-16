import { request } from "../utils";
import { setCategoryData } from "./set-category-data";

export const saveCategoryAsync = (CategoryData) => (dispatch) => {
    const saveRequest = CategoryData.id ?
    request(`/api/categories/${CategoryData.id}`, 'PATCH', CategoryData) :
    request('/api/categories', 'POST', CategoryData);
    return saveRequest.then((updatedCategory) => {
    dispatch(setCategoryData(updatedCategory.data));

    return updatedCategory.data;
    })
    };