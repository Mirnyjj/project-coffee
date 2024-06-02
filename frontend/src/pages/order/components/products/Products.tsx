import { styled } from "styled-components";
import { Title } from "../../../../components";
import { basketCounter } from "../../../../utils";
import { device } from "../../../../adaptiv-styled/device";
import { AddedProductInBasket} from "../../../../models/models";

type Props = {
    className?: string
    products: AddedProductInBasket[]
}

const ProductsContainer = ({className, products}: Props) => {
    const {sumQuantity, sumCounter} = basketCounter(products);

    return (
        <div className={className}>
            <div className="products-content">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Товар</th>
                                <th>Цена</th>
                                <th>Количество</th>
                                <th>Итого</th>
                            </tr>
                        </thead>
                        <tbody>
                        {products.map(
                            (products) => (
                                    <tr key={products.id}>
                                        <td>{products.title}</td>
                                        <td>{products.price} ₽</td>
                                        <td>{products.amount}</td>
                                        <td>{Number(products.price) * products.amount} ₽</td>
                                    </tr>
                            ),
                            )}
                            </tbody>
                    </table>
            </div>
            <Title 
                title={`Всего ${sumQuantity} шт. на ${sumCounter}₽`} 
                margin="0" 
            />
        </div>
    )
};

export const Products = styled(ProductsContainer)`
    padding: 0 0 10px;
    .products-content {
        display: flex;
        justify-content: center;
        margin: 20px 20px 20px;
    }

    .table {
        border: 1px solid #dddddd;
        border-collapse: collapse; 
        color: #fff;
        background-color: #3f1f1f;
    }
    .table th {
        padding: 10px;
        background: #efefef;
        font-size: 14px;
        color: #000;
    }
    .table td {
        text-align: center;
        padding: 10px;
        word-break: break-word;
        font-size: 14px;
    }

    @media(${device.tablet}){
        .products-content {
            margin: 10px 10px 0px;
        }
        .table th, .table td {
            padding: 5px;
            
        }
    }

`
