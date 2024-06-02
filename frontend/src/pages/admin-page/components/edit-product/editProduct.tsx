import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Button, Icon, Img, Loader, PrivateContent, Title } from "../../../../components";
import { EditBlockProduct } from "./components/edit-block-product/editBlockProduct";
import { selectProduct, selectUserRole } from "../../../../selectors";
import { onResetProduct } from "../utils/on-reset-product";
import { RESET_PRODUCT_DATA } from "../../../../actions";
import { checkAccess, request } from "../../../../utils";
import { useNavigate } from "react-router";
import { Product } from "../../../../models/models";
import { useAppDispatch, useAppSelector } from "../../../../reducers/hooks/hooks";
import { ROLE } from "../../../../constants";

type Props = {
    className?: string
}

const EditProductContainer = ({className}: Props) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isEditProduct, setIsEditProduct] = useState<Product | null>(null);
    const [isDeleteProduct, setIsDeleteProduct] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();
    const [categories, setCategories] = useState([])
    const productStor = useAppSelector(selectProduct);
    const navigate = useNavigate();
    const userRole = useAppSelector(selectUserRole)

    
    useEffect(() => {
        Promise.all([request('/api/categories'), request('/api/products')])
        .then(([{data: {categories}}, {data: {products}}]) => {
            setCategories(categories);
            setProducts(products);
            setIsDeleteProduct(false);
            setIsLoading(false)
        });
        
    }, [isDeleteProduct])

    if(!checkAccess([ROLE.ADMIN], userRole)) {
        return <PrivateContent access={[ROLE.ADMIN]}/>;
    }

    const onDeleteProduct = (id?: string) => {
        setIsLoading(true)
        request(`/api/products/${id}`, 'DELETE').then(() => {
            setIsDeleteProduct(true);
            dispatch(RESET_PRODUCT_DATA)
            setIsLoading(false)
        });
    }

    if(isLoading || (productStor.length === 0 && products.length === 0)) {
        <Loader />
    } else if(isEditProduct){
        return <EditBlockProduct 
                    isEditProduct={isEditProduct} 
                    setIsEditProduct={setIsEditProduct}
                    setProducts={setProducts}
                />
        
    } else {
        return <div className={className}>
                    <Title title='Редактирование товаров' />
                    <Button width="50%" children="Вернуться в меню" onClick={() => (dispatch(onResetProduct()), navigate('/administration-page'))} />
                    <div className="product-list">
                        {(productStor.length !== 0 ? productStor : products).map(
                            (product) => (
                                <div className="card-product" key={product.id}>
                                        <div>                 
                                            <Img 
                                                inactive={true}
                                                imageUrl={product.imageUrl} 
                                                name={product.title} 
                                                width="300px" 
                                                height="300px"
                                                radius="10px"
                                            />
                                        </div>
                                        <div className="box-description">
                                            Наименование: {product.title}
                                        </div>
                                        <div className="box-description">
                                            Описание: {product.description}
                                        </div>
                                        <div className="box-description">
                                            {categories.map(({id, title}) => {
                                                if(id === product.categoryId) {
                                                    return `Категория: ${title}`
                                                }
                                            })}
                                        </div>
                                        <div className="box-description">
                                            Стоимость: {product.price} ₽
                                        </div>
                                        <div className="box-description">
                                            <div className="box6">Действия</div>
                                            <div className="action-button">
                                                <Icon
                                                    inactive={false}
                                                    id="fa-pencil-square-o" 
                                                    size="23px"
                                                    color="#fff"
                                                    onClick={() => setIsEditProduct(product)}
                                                />
                                                <Icon 
                                                    inactive={false}
                                                    id="fa-trash-o" 
                                                    size="23px"
                                                    color="#fff"
                                                    onClick={() => onDeleteProduct(product.id)}
                                                />
                                            </div>
                                        </div>
                                </div>
                            ),
                            )}
                    </div>
                </div>
    }
    
};

export const EditProduct = styled(EditProductContainer)`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 10px;
    align-items: center;
    justify-content: center;

    .product-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
    }

    .card-product {
        display: flex;
        flex-direction: column;
        text-align: center;
        font-weight: 700;
        padding: 5px;
        color: #fff;
        align-items: center;
        font-size: 16px;
        gap: 5px;
        max-width: 300px;
    }

    .box-description{
        paddig: 10px;
        width: 300px;
    }

    .action-button {
        display: flex;
        justify-content: center;
        gap: 10px;
        align-items: center;
    }

`