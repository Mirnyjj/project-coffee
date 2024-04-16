export const deleteProductBasket = (basket, productId, decreaseAmount) => {
    
    if(decreaseAmount){
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