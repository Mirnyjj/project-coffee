import { useEffect } from "react";
import { styled } from "styled-components";
import { Title } from "../../components";
import { GeneralBasket, TableProductInBasket } from "./component";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

type Props = {
    className?: string
}

const BasketContainer = ({ className }: Props) => {
    const [basketUp] = useLocalStorage('myBasket', []);
    const navigate = useNavigate();

    useEffect(() => {
        if (basketUp.length === 0) {
            navigate('/');
        }
    }, [basketUp, navigate]);

    return (
        <div className={className}>
            <Title title="Корзина"/>
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
   