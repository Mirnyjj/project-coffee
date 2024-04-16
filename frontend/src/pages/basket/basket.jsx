import { styled } from "styled-components";
import { Title } from "../../components";
import { GeneralBasket, TableProductInBasket } from "./component";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router";



const BasketContainer = ({className}) => {
    const [basketUp, setBasket] = useLocalStorage('myBascket', []);
    const navigate = useNavigate();

    if(basketUp.length === 0) {
        return navigate('/');
    }
    
        return (
            <div className={className}>
                <Title title="Корзина" size="50px"/>
                <TableProductInBasket />
                <GeneralBasket />
            </div>
        );
    };
    
    export const Basket = styled(BasketContainer)`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `;
   