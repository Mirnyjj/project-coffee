import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useParams } from "react-router";
import { Button, Img, Loader, Title } from "../../components";
import { request, upProductBasket } from "../../utils";
import { useLocalStorage } from "@uidotdev/usehooks";
import { device } from "../../adaptiv-styled/device";

const ProductContainer = ({className}) => {
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [findRes, setFindRes] = useState(false);
    const [basketUp, setBasket] = useLocalStorage('myBascket', [])
    const {id} = useParams();

    const findProductAdd = (productId) => {
        const findProduct = basketUp.some((el) => el.id === productId);
        setFindRes(findProduct);
        return findProduct;
        
    };

    useEffect(() => {
            request(`/api/products/${id}`).then(({data}) => {
            setProduct(data);
                findProductAdd(data.id)
                setIsLoading(false);
        });

    }, []);

    

    return isLoading ? <Loader />
        : (
            <div className={className}>
                <div className="product-content">
                    <Img 
                        width="100%" 
                        height="100%"
                        imageUrl={product.imageUrl} 
                        name={product.title} 
                        inactive={true}
                        radius="20px"
                    />
                </div>
                <div className="descriptions-block">
                    <Title title={product.title} size="40px" />
                    <div className="description">
                        Описание блюда: {product.description}
                    </div>
                    <div className="description">
                        Стоимость блюда: {product.price} ₽
                    </div>
                    <div className="shopping-button">
                    {findRes ?
                    <Button widht="200px" children="Добавлено" onClick={() => 
                        setBasket(upProductBasket(basketUp, product))} 
                    />
                    : 
                    <Button widht="200px" children="Добавить в корзину" onClick={() => 
                        {setBasket(upProductBasket(basketUp, product)); setFindRes(true)}} 
                    />
                    }
                    </div>
                </div>
            </div>
    );
            
};

export const Product = styled(ProductContainer)`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 0 10px;
    margin-top: 30px;
    .product-content {
        display: flex;
        gap: 20px;
    }
    .descriptions-block {
        display: flex;
        flex-direction: column;
        border-radius: 20px;
        background-color: #472727;
    }
    .description {
        display: flex;
        margin: 10px;
        padding: 20px 0 20px 0;
        justify-content: space-between;
        font-weight: 700;
        color: #e9b900;
        border-top: 1px solid #fff;

    }
    .shopping-button {
        display: flex;
        justify-content: center; 
        align-items: center;
        padding: 20px 0;
    }

    @media ${device.desktop} {
        .product-content, .descriptions-block{
            width: 50%;
        }
        .description {
            font-size: 24px;
        }
      }
      
      @media ${device.laptopL} {
        .product-content, .descriptions-block{
            width: 100%;
        }
      }
      @media ${device.tablet} {
        .description {
            font-size: 18px;
        }
      }
`;