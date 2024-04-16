import { styled } from "styled-components";
import { useState } from "react";
import { Button, Input, Title } from "../../../../../../components";
import { useDispatch } from "react-redux";
import { saveCategoryAsync } from "../../../../../../actions";
import PropTypes from 'prop-types';

const EditBlockCategoryContainer = ({className, isEditCategory, setIsEditCategory, setCategories }) => {
    const {id, title, imageUrl} = isEditCategory;
    const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
    const [titleValue, setTitleValue] = useState(title);
    const dispatch = useDispatch();

    const onSave = () => {
        dispatch(saveCategoryAsync({
            id,
            imageUrl: imageUrlValue,
            title: titleValue,
        }))
        setCategories([])
        setIsEditCategory(null)
    };

    const onImageChange = ({target}) => setImageUrlValue(target.value);
    const onTitleChange = ({target}) => setTitleValue(target.value);

    return (
        <div className={className} key={id}>
            <div className="block-edit">
                <Title type="url" title="Фото" size="30px" top="0"/>
                <Input value={imageUrlValue} placeholder="URL фото..." onChange={onImageChange}/>     
            </div>
            <div className="block-edit">
                <Title title="Название" size="30px" top="0"/>
                <Input value={titleValue} placeholder="Название..." onChange={onTitleChange}/>     
            </div>
            <div className="block-edit">
                <Button children="Вернуться в меню редактирования"
                    onClick={() => setIsEditCategory(null)}
                />
                <Button children="Coхранить"
                    onClick={() => onSave()}
                />
            </div>
    </div>
    );
};

export const EditBlockCategory = styled(EditBlockCategoryContainer)`
    display: flex;
    flex-direction: column;
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
`;

EditBlockCategory.propTypes = {
    isEditCategory: PropTypes.object.isRequired,
    setIsEditCategory: PropTypes.func.isRequired,
}
