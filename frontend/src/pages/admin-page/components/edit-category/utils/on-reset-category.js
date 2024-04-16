import { RESET_CATEGORY_DATA } from "../../../../../actions";

export const onResetCategory = (setIsEditCategory) => (dispatch) => {
    setIsEditCategory(null)
    dispatch(RESET_CATEGORY_DATA)
}