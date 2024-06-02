import { RESET_CATEGORY_DATA } from "../../../../../actions";
import { AppDispatch } from "../../../../../store";

export const onResetCategory = () => (dispatch: AppDispatch) => {
    dispatch(RESET_CATEGORY_DATA)
}