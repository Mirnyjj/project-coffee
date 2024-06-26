import { styled } from "styled-components";
import { Button, Title } from "../../../../components";
import { DeliveryForm } from "../delivery-form/deliveryForm";
import { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { basketCounter } from "../../../../utils";
import { device } from "../../../../adaptiv-styled/device";

type Props = {
    className?: string
}

const GeneralBasketContainer = ({className}: Props) => {
    const [deliveryIsOpen, setDeliveryIsOpen] = useState(false)
    const [basketUp] = useLocalStorage('myBasket', []);
    const {sumCounter} = basketCounter(basketUp);

    return (
        <div className={className}>
            <Title title="Сумма заказа:"/>
            <Title title={`${sumCounter} ₽`} />
            {deliveryIsOpen
            ? <DeliveryForm />
            : (
                <>
                    <div className="navigation-basket">
                        Если Вы находитесь в нашем заведении, <br/> пожалуйста, пригласите официанта, или перейдите к оформлению заказа
                    </div>
                    <Button 
                        children="Оформить заказ"
                        width="35%"
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