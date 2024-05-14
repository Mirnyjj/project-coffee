import { useLocalStorage } from "@uidotdev/usehooks";
import { styled } from "styled-components";
import { deleteProductBasket } from "../../../../utils";
import { ChangeInQuantityProduct, Icon, Img } from "../../../../components";
import { device } from "../../../../adaptiv-styled/device";

const TableProductInBasketContainer = ({className}) => {
    const [basketUp, setBasket] = useLocalStorage('myBascket', []);

    return (
        <div className={className}>
                        <div className="table-row">
                                <div className="box1">&nbsp;</div>
                                <div className="box2">&nbsp;</div>
                                <div className="box3">Товар</div>
                                <div className="box4">Цена</div>
                                <div className="box5">Количество</div>
                                <div className="box6">Итого</div>
                        </div>
                        {basketUp.map(
                            (product) => (
                                <div key={product.id} className="table-row">
                                        <div className="box1" onClick={() => 
                                                    {setBasket(
                                                        deleteProductBasket(basketUp, product.id)
                                                        )}
                                                    }
                                        >
                                            <Icon 
                                                inactive={false}
                                                id="fa-trash-o" 
                                                size="23px"
                                                color="#fff"
                                            />
                                        </div>
                                        <div className="box2">                        
                                            <Img 
                                                imageUrl={product.imageUrl} 
                                                name={product.title} 
                                                inactive={false}
                                                width="100%" 
                                                height="100px"
                                                radius="10px"
                                            />
                                        </div>
                                        <div className="box3">{product.title}</div>
                                        <div className="box4">
                                            {product.price} ₽
                                        </div>
                                        <div className="box5">
                                        <ChangeInQuantityProduct  product={product} />   
                                        </div>
                                        <div className="box6">{product.price * product.amount} ₽</div>

                                </div>
                            ),
                            )}
                </div>
    )
};

export const TableProductInBasket = styled(TableProductInBasketContainer)`
    display: grid;
    grid-template-rows: 1fr 3fr;
    margin: 20px 20px 20px;
    width: 97%;
    padding: 20px 20px 20px;
    background-color: #3f1f1f;
    gap: 5px;
    font-size: 24px;
    border-radius: 10px;


    .table-row{
        display: grid;
        grid-template-columns: 1fr 3fr 3fr 2fr 2fr 2fr;
        text-align: center;
        font-weight: 700;
        align-self: center;
        gap: 5px;
        color: #fff;
    }

    .box1, .box2, .box3, .box4, .box5, .box6{
        align-self: center;
    }

      @media ${device.tablet} {
        font-size: 14px;
        padding: 5px 5px 5px;
        margin: 20px 5px 20px;
      }


`