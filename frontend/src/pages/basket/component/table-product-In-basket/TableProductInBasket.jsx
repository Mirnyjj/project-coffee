import { useLocalStorage } from "@uidotdev/usehooks";
import { styled } from "styled-components";
import { deleteProductBasket } from "../../../../utils";
import { ChangeInQuantityProduct, Icon, Img } from "../../../../components";

const TableProductInBasketContainer = ({className}) => {
    const [basketUp, setBasket] = useLocalStorage('myBascket', []);

    return (
        <div className={className}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>&nbsp;</th>
                                <th>&nbsp;</th>
                                <th>Товар</th>
                                <th>Цена</th>
                                <th>Количество</th>
                                <th>Итого</th>
                            </tr>
                        </thead>
                        {basketUp.map(
                            (product) => (
                                <tbody key={product.id}>
                                    <tr>
                                        <td onClick={() => 
                                                    {setBasket(
                                                        deleteProductBasket(basketUp, product.id)
                                                        )}
                                                    }
                                        >
                                            <Icon 
                                                inactive={false}
                                                id="fa-trash-o" 
                                                margin="2px 0px 0 5px;"
                                                size="23px"
                                                color="#fff"
                                            />
                                        </td>
                                        <td>                        
                                            <Img 
                                                imageUrl={product.imageUrl} 
                                                name={product.title} 
                                                inactive={false}
                                                width="100%" 
                                                height="100px"
                                                radius="10px"
                                            />
                                        </td>
                                        <td>{product.title}</td>
                                        <td>
                                            <div className="price-product">
                                            {product.price} ₽
                                            </div>
                                        </td>
                                        <td>
                                        <ChangeInQuantityProduct  product={product} />   
                                        </td>
                                        <td>{product.price * product.amount} ₽</td>
                                    </tr>
                                </tbody>
                            ),
                            )}
                    </table>
                </div>
    )
};

export const TableProductInBasket = styled(TableProductInBasketContainer)`
    display: flex;
    flex-wrap: wrap;
    margin: 20px 20px 20px;
    background-color: #3f1f1f;

    .table {
        border: 1px solid #dddddd;
        border-collapse: collapse; 
        color: #fff;
    }
    .table th {
        font-weight: 700;
        padding: 30px;
        background: #efefef;
        font-size: 20px;
        color: #000;
    }
    .table td {
        text-align: center;
        padding: 30px;
        font-weight: 600;
        word-break: break-word;
        font-size: 20px;
    }
    .price-product {
        display: flex;
        justify-content: center;
        align-items: center;
    }

`