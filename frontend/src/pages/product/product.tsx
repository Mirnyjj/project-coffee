import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useParams } from "react-router";
import { Button, Img, Loader, Title } from "../../components";
import { request, upProductBasket } from "../../utils";
import { useLocalStorage } from "@uidotdev/usehooks";
import { AddedProductInBasket, Basket } from "../../models/models";
import { device } from "../../adaptiv-styled";

type Props = {
    className?: string
}

const ProductContainer = ({ className }: Props) => {
    const [product, setProduct] = useState<Basket | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isProductInBasket, setIsProductInBasket] = useState(false);
    const [basket, setBasket] = useLocalStorage<AddedProductInBasket[]>('myBasket', []);
    const { id } = useParams<{ id: string }>();

    const checkProductInBasket = (productId: string) => {
        const productExists = basket.some((el) => el.id === productId);
        setIsProductInBasket(productExists);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            try {
                const { data } = await request(`/api/products/${id}`);
                setProduct(data);
                checkProductInBasket(data.id);
            } catch (error) {
                console.error("Failed to fetch product", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, []);

    const handleAddToBasket = () => {
        if (product) {
            const updatedBasket = upProductBasket(basket, product);
            setBasket(updatedBasket);
            setIsProductInBasket(true);
        }
    };

    if (!product) {
        return <div>Product not found</div>;
    }

    return isLoading ? <Loader /> : (
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
                <Title title={product.title} />
                <div className="description">
                    Описание блюда: {product.description}
                </div>
                <div className="description">
                    Стоимость блюда: {product.price} ₽
                </div>
                <div className="shopping-button">
                    <Button
                        width="200px"
                        children={isProductInBasket ? "Добавлено" : "Добавить в корзину"}
                        onClick={handleAddToBasket}
                    />
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