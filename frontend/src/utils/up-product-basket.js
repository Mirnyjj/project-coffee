export const upProductBasket = (basket, product) => {

        const updatedBasket = basket.map((productUp) => {
            if (productUp.id === product.id) {
                return { ...productUp, amount: productUp.amount + 1 };
            }
            return productUp;
            
        });
    
        if (!updatedBasket.some((productUp) => productUp.id === product.id)) {
            const updatedProduct = { ...product, amount: 1 };
            updatedBasket.push(updatedProduct);
        }
     return updatedBasket;
 }