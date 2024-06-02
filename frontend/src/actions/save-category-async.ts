import { Category } from "../models/models";
import { AppDispatch } from "../store";
import { request } from "../utils";
import { setCategoryData } from "./set-category-data";

interface UpdateCategory {
    data: Category
}

export const saveCategoryAsync = (CategoryData: Category) => (dispatch: AppDispatch) => {
    const saveRequest = CategoryData.id ?
    request(`/api/categories/${CategoryData.id}`, 'PATCH', CategoryData) :
    request('/api/categories', 'POST', CategoryData);
    return saveRequest.then((updatedCategory: UpdateCategory) => {
    dispatch(setCategoryData(updatedCategory.data));

    return updatedCategory.data;
    })
    };