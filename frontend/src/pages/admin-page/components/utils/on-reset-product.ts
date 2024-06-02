import { RESET_PRODUCT_DATA } from "../../../../actions";
import { AppDispatch } from "../../../../store";

export const onResetProduct = () => (dispatch: AppDispatch) => {
    dispatch(RESET_PRODUCT_DATA)
}