import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Button, Icon, Img, Loader } from "../../../../components";
import { EditBlockProduct } from "./components/edit-block-product/editBlockProduct";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../../../../selectors";
import { onResetProduct } from "../utils/on-reset-product";
import { RESET_PRODUCT_DATA } from "../../../../actions";
import PropTypes from 'prop-types';
import { request } from "../../../../utils";

const EditProductContainer = ({className, setIsOpenEditProduct}) => {
    const [products, setProducts] = useState([]);
    const [isEditProduct, setIsEditProduct] = useState(null);
    const [isDeleteProduct, setIsDeleteProduct] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([])
    const productStor = useSelector(selectProduct);

    
    useEffect(() => {
        Promise.all([request('/api/categories'), request('api/products')])
        .then(([{data: {categories}}, {data: {products}}]) => {
            setCategories(categories);
            setProducts(products);
            setIsDeleteProduct(false);
            setIsLoading(false)
        });
        
    }, [isDeleteProduct])

    const onDeleteProduct = (id) => {
        setIsLoading(true)
        request(`/api/products/${id}`, 'DELETE').then((res) => {
            setIsDeleteProduct(true);
            dispatch(RESET_PRODUCT_DATA)
            setIsLoading(false)
        });;
    }
    
    return isLoading || (productStor.length === 0 && products.length === 0) ? <Loader /> 
    : (
        isEditProduct ? 
        <EditBlockProduct 
            isEditProduct={isEditProduct} 
            setIsEditProduct={setIsEditProduct}
            setProducts={setProducts}
        />
        :
        <div className={className}>
            <Button widht="50%" children="Вернуться в меню" onClick={() => dispatch(onResetProduct(setIsOpenEditProduct))} />
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Фото</th>
                                <th>Наименование</th>
                                <th>Описание</th>
                                <th>Категория</th>
                                <th>Стоимость</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        {(productStor.length !== 0 ? productStor : products).map(
                            (product) => (
                                <tbody key={product.id}>
                                    <tr>
                                        <td>                        
                                            <Img 
                                                inactive={true}
                                                imageUrl={product.imageUrl} 
                                                name={product.title} 
                                                width="100%" 
                                                height="100px"
                                                radius="10px"
                                            />
                                        </td>
                                        <td>{product.title}</td>
                                        <td>
                                            {product.description}
                                        </td>
                                        <td>
                                            {categories.map(({id, title}) => {
                                                if(id === product.categoryId) {
                                                    return title
                                                }
                                            })}
                                        </td>
                                        <td>{product.price} ₽</td>
                                        <td>
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
                                        </td>
                                    </tr>
                                </tbody>
                            ),
                            )}
                    </table>
                </div>
    )
};

export const EditProduct = styled(EditProductContainer)`
    display: flex;
    flex-wrap: wrap;
    margin: 20px 20px 20px;
    justify-content: center;

    .table {
        margin-top: 20px;
        border: 1px solid #dddddd;
        border-collapse: collapse; 
        color: #fff;
        background-color: #3f1f1f;
    }
    .table th {
        font-weight: 700;
        padding: 30px;
        background: #efefef;
        font-size: 15px;
        color: #000;
    }
    .table td {
        text-align: center;
        padding: 10px;
        font-weight: 600;
        word-break: break-word;
        font-size: 15px;
    }
    .action-button {
        display: flex;
        justify-content: center;
        gap: 10px;
        align-items: center;
    }

`

EditProduct.propTypes = {
    setIsOpenEditProduct: PropTypes.func.isRequired,
}