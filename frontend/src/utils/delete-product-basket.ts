import { AddedProductInBasket } from "../models/models";

export const deleteProductBasket = (basket: AddedProductInBasket[], productId: string, decreaseAmount: number) => {
    
    if(decreaseAmount > 0){
        const updatedBasket = basket.map((productUp) => {
            if (productUp.id === productId && decreaseAmount >= 1) {
                return { ...productUp, amount: productUp.amount - 1 };
            } 
    
            return productUp;
        });
        
     return updatedBasket.filter(upBasket => upBasket.amount >= 1);
    } else {
        return basket.filter(upBasket => upBasket.id !== productId);
    }
}