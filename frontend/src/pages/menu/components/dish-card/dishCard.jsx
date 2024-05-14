import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dish } from "./components/dish";
import { request } from "../../../../utils";
import { Loader, Title } from "../../../../components";

const DishCardContainer = ({className}) => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        request(`/api/products/categoryId/${categoryId}`).then(({data}) => {
            setIsLoading(false)
            data.length === 0 ?
            setError('В ближайшее время в данную категорию будут добавлены вкусные блюда')
            : setProducts(data)

            
        })
    }, []);


    return isLoading ? 
        <Loader />
        :
        (
            <>
                {error && <Title title={error} size="40px" />}
                <div className={className}>
                    {products.map(({ id, title, imageUrl, price}) => {
                        return <Dish key={id} id={id} title={title} imageUrl={imageUrl} price={price} />
                    }
                    )
                }
                </div>
            </>
        )
}


export const DishCard = styled(DishCardContainer)`
    display: flex;
    flex-wrap: wrap;
    padding: 20px 0 ;
    justify-content: center; 

`;

