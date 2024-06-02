import { styled } from "styled-components";
import { Button, Title } from "../../../../components";
import { useNavigate } from "react-router";
import { device } from "../../../../adaptiv-styled/device";
import { Basket } from "../../../../models/models";

type Props = {
    className?: string
    numberOrder: number
    setBasket: React.Dispatch<React.SetStateAction<Basket[]>>
}

const OrderRequestSentContainer = ({className, numberOrder, setBasket}: Props) => {
    const navigate = useNavigate()

    const onResetBasket = () => {
        setBasket([]);
        return navigate('/')
    }
    
        return (
            <div className={className}>
                <div className="overlay" />
                <div className="order-sent">
                    <Title title={`Ваш заказ №${numberOrder} успешно отправлен!`}/>
                    <div className="expectation-call">
                        В ближайшее время с Вами свяжется сотрудник заведения для уточнения деталей заказа.
                    </div>
                    <Button children="Закрыть" onClick={() => onResetBasket()} />
                </div>
            </div>
        );
    };
    
    export const OrderRequestSent = styled(OrderRequestSentContainer)`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 20;
    & .overlay {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;
    }
    .order-sent {
        position: relative;
        top: 50%;
        transform: translate(0, -50%);
        width: 25%;
        margin: 0 auto;
        padding: 0  20px 20px;
        text-align: center;
        background-color: #3f1f1f;
        border: 3px solid #000;
        z-index: 30;
        font-size: 25px;
        font-weight: 700;
        color: #fff;
        border-radius: 15px;
    }
    .expectation-call {
        margin: 20px 20px;
    }

    @media ${device.laptop} {
        .order-sent {
            width: 70%;
            font-size: 20px;
        }
      }
      
      @media ${device.tablet} {
        .order-sent {
            width: 70%;
            font-size: 16px;
        }
      }
    `;
   