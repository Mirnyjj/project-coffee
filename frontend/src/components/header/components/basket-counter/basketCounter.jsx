import { styled } from "styled-components"
import { NavLink, useMatch } from "react-router-dom";
import { Icon } from "../../../icon/icon";
import { useLocalStorage } from "@uidotdev/usehooks";
import { basketCounter } from "../../../../utils";

const SmallTextCounter = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 12px;
    padding: 2px;
    color: red;
    font-weight: 700;
`;

const BasketCounterContainer = ({className}) => {
    const [basket] = useLocalStorage('myBascket', []);
    const basketIsOpen = !!useMatch('/basket');
    const {sumQuantity, sumCounter} = basketCounter(basket);
   
    return (basket.length !== 0 && !basketIsOpen ? (
        <NavLink className={className} to="/basket">
            <Icon  
                inactive={false}
                id="fa-shopping-basket" 
                margin="3px 0 0 2px;"
                size="30px"
                />
            <SmallTextCounter>{sumQuantity}</SmallTextCounter>
            <div className="order-price">
                Сумма заказа
                <div className="price-counter">на {sumCounter} руб.</div>
            </div>
        </NavLink>
    ) : null)
}

export const BasketCounter = styled(BasketCounterContainer)`
    display: flex;
    margin-top: 0;
    .order-price {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        font-size: 15px;
        font-style: italic;
    }
    .price-counter {
        font-weight: 700;
    }
`