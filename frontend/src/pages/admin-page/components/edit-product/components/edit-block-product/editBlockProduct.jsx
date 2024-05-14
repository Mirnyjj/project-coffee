import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { Button, Input } from "../../../../../../components";
import { useDispatch, } from "react-redux";
import { saveProductAsync } from "../../../../../../actions";
import PropTypes from 'prop-types';
import { request } from "../../../../../../utils";

const EditBlockProductContainer = ({className, isEditProduct, setIsEditProduct, setProducts }) => {
    const {id, title, imageUrl, description, categoryId, price} = isEditProduct;
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch()
    const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
    const [titleValue, setTitleValue] = useState(title);
    const [descriptionValue, setDescriptionValue] = useState(description);
    const [priceValue, setPriceValue] = useState(price);
    const [categoryIdValue, setCategoryIdValue] = useState(categoryId);


    useEffect(() => {
        request('/api/categories').then(({data: {categories}}) => {
            setCategories(categories);
        })
    }, [])

    const onSave = () => {
        dispatch(saveProductAsync({
            id,
            imageUrl: imageUrlValue,
            title: titleValue,
            description: descriptionValue,
            price: priceValue,
            categoryId: categoryIdValue,

        }))
        setProducts([])
        setIsEditProduct(null)
    };

    const onImageChange = ({target}) => setImageUrlValue(target.value);
    const onTitleChange = ({target}) => setTitleValue(target.value);
    const onDescriptionChange = ({target}) => setDescriptionValue(target.value);
    const onPriceChange = ({target}) => setPriceValue(target.value);
    const onCategoryIdChange = ({target}) => setCategoryIdValue(target.value);

    return (
        <div className={className} key={id}>
            <div className="block-edit">
                <div className="block-name">Фото</div>
                <Input value={imageUrlValue} placeholder="URL фото..." onChange={onImageChange}/>     
            </div>
            <div className="block-edit">
                <div className="block-name">Название</div>
                <Input value={titleValue} placeholder="Название..." onChange={onTitleChange}/>     
            </div>
            <div className="block-edit">
                <div className="block-name">Описание</div>
                <Input value={descriptionValue} placeholder="Описание..." onChange={onDescriptionChange}/>     
            </div>
            <div className="block-edit">
                <div className="block-name">Категория</div>
                <select className="category-product" value={categoryIdValue} onChange={onCategoryIdChange}>
                            {categories.map(({id: categoryId, title: categoryName}) => (
                                <option key={categoryId} value={categoryId}>{categoryName}</option>
                            ))}
                        </select>      
            </div>
            <div className="block-edit">
                <div className="block-name">Стоимость</div>
                <Input  width="30%" type="number" value={priceValue} placeholder="Стоимость..." onChange={onPriceChange}/>      
            </div>
            <Button children="Coхранить"
                onClick={() => onSave()}
            />
            <Button children="Вернуться в меню редактирования"
                onClick={() => setIsEditProduct(null)}
            />
    </div>
    );
};

export const EditBlockProduct = styled(EditBlockProductContainer)`
    display: flex;
    flex-direction: column;
    margin: 10px;
    gap: 10px;
    .block-edit {
        display: flex;
        gap: 10px;
    }
    .category-product {
        width: 30%;
        height: 50px;
        margin: 0 0 10px;
        border: 1px solid #000;
        border-radius: 5px;
        padding: 10px;
        font-size: 18px;
    }
    .block-name {
        text-align: center;
        font-weight: 700;
        color: #fff;
        font-size: 24px;
    }
`;

EditBlockProduct.propTypes = {
    isEditProduct: PropTypes.object.isRequired,
    setIsEditProduct: PropTypes.func.isRequired,
}
