import { RESET_PRODUCT_DATA } from "../../../../actions";

export const onResetProduct = () => (dispatch) => {
    dispatch(RESET_PRODUCT_DATA)
}