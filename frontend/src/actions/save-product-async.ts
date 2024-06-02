import { Product } from "../models/models";
import { AppDispatch } from "../store";
import { request } from "../utils";
import { setProductData } from "./set-product-data";

export const saveProductAsync = (ProductData: Product) => (dispatch: AppDispatch) => {
    const saveRequest = ProductData.id ?
    request(`/api/products/${ProductData.id}`, 'PATCH', ProductData) :
    request('/api/products', 'POST', ProductData);
    return saveRequest.then((updatedProduct) => {
    dispatch(setProductData(updatedProduct.data));

    return updatedProduct.data;
    })
    };