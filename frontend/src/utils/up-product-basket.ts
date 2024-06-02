import { AddedProductInBasket, Basket} from "../models/models";

export const upProductBasket =<T extends AddedProductInBasket> (basket: T[], product: Basket): T[] => {

        const updatedBasket = basket.map((productUp) => {
            if (productUp.id === product.id) {
                return { ...productUp, amount: productUp.amount + 1 };
            }
            return productUp;
            
        });
    
        if (!updatedBasket.some((productUp) => productUp.id === product.id)) {
            const updatedProduct: AddedProductInBasket = { ...product, amount: 1 };
            updatedBasket.push(updatedProduct as T);
        }
     return updatedBasket;
 }