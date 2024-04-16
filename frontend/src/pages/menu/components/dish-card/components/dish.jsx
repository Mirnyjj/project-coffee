import { styled } from "styled-components";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { upProductBasket } from "../../../../../utils";
import { Button, Icon, Img } from "../../../../../components";
import { useLocalStorage } from "@uidotdev/usehooks";
import PropTypes from 'prop-types';


const DishContainer = ({className, id, title, imageUrl, price}) => {
    const [basketUp, setBasket] = useLocalStorage('myBascket', []);
    const [findRes, setFindRes] = useState(false);

    const findProductAdd = (productId) => {
        const findProduct = basketUp.some((el) => el.id === productId);
        setFindRes(findProduct);
        return findProduct;
        
    }


    useEffect(() => {
        findProductAdd(id)
    }, [basketUp]);


    return (
        <div className={className}>
                    <NavLink to={`/product/${id}`}>
                        <Img 
                            imageUrl={imageUrl} 
                            name={title} 
                            width="100%" 
                            height="600px"
                            radius="10px 10px 0 0"  
                        />
                        <div className="product-menu">{title}</div>
                    </NavLink>
                        <div className="card-footer">
                            <div className="card-info">
                            <div className="price">
                                {price} ₽
                            </div>
                            <div className="shopping-bag" onClick={() => 
                                {setBasket(upProductBasket(basketUp, {id, title, imageUrl, price})); findProductAdd(id)}
                                }>
                                {findRes ?
                                <Button children="Добавлено"/>
                                : 
                                <Icon 
                                    inactive={false}
                                    id="fa-shopping-bag" 
                                    margin="3px 3px 0 2px;"
                                    size="30px"
                                    
                                />
                            }
                            </div>
                            </div>
                        </div>
                </div>
    )
}


export const Dish = styled(DishContainer)`
    position: relative;
    text-align: center;
    width: 460px;
    margin: 10px;
    opacity: 0.8;
    background-color: #7490ed;
    border-radius: 10px;
    &:hover {
        cursor: pointer;
        opacity: 1;
    } 

    .product-menu {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: white;
        text-shadow: 2px 2px 4px black;
        z-index: 2;
        font-family: "Rubik Scribble", system-ui;
        font-weight: 700;
        font-style: normal;
        font-size: 50px;
    }
    .card-footer {
        padding: 10px;


    }
    .card-info {
        display: flex;
        justify-content: space-between;
        align-items: center
    }
    & .price {
        display: flex;
        font-weight: 700;
        font-style: normal;
        font-size: 25px;
        color: #000;
    }
    & .shopping-bag {
        display: flex;
    }

`;

Dish.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
}
