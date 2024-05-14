import { styled } from "styled-components";
import { Button, Title } from "../../../../components";
import { DeliveryForm } from "../delivery-form/deliveryForm";
import { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { basketCounter } from "../../../../utils";
import { device } from "../../../../adaptiv-styled/device";

const GeneralBasketContainer = ({className}) => {
    const [deliveryIsOpen, setDeliveryIsOpen] = useState(false)
    const [basketUp] = useLocalStorage('myBascket', []);
    const {sumQuantity, sumCounter} = basketCounter(basketUp);

    return (
        <div className={className}>
            <Title title="Сумма заказа:" size="38px" />
            <Title title={`${sumCounter} ₽`} size="38px" />
            {deliveryIsOpen
            ? <DeliveryForm />
            : (
                <>
                    <div className="navigation-basket">
                        Если Вы находитесь в нашем заведении, <br/> пожалуйста, пригласите официанта, или перейдите к оформлению заказа
                    </div>
                    <Button 
                        children="Оформить заказ"
                        widht="35%"
                        onClick={() => setDeliveryIsOpen(true)}
                    />
                </>
            )}
        </div>
    )

};

export const GeneralBasket = styled(GeneralBasketContainer)`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-bottom: 20px;
padding: 20px;
background-color: #3f1f1f; 
border-radius: 10px; 
  
.navigation-basket {
    margin: 20px 0 20px 0;
    text-align: center;
    font-weight: 700;
    font-style: normal;
    font-size: 18px;
    color: #fff;
}

@media ${device.desktop} {
    width: 70%;
  }
  
  @media ${device.tablet} {
    width: 97%;
  }
`