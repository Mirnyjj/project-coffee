import { RESET_PRODUCT_DATA } from "../../../../actions";

export const onResetProduct = (setIsEditProduct) => (dispatch) => {
    setIsEditProduct(null)
    dispatch(RESET_PRODUCT_DATA)
}