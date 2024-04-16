import { useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { saveCategoryAsync } from "../../../../actions";
import { Button, Input, Title } from "../../../../components";
import PropTypes from 'prop-types';


const AddCategoryContainer = ({className, setIsOpenAddCategory, setIsOpenEditCategory}) => {
    const [imageUrlValue, setImageUrlValue] = useState('');
    const [titleValue, setTitleValue] = useState('');
    const dispatch = useDispatch();

    const onSave = () => {
        dispatch(saveCategoryAsync({
            imageUrl: imageUrlValue,
            title: titleValue,
        }))
        setIsOpenAddCategory(false);
        setIsOpenEditCategory(true);
    }


    const onImageChange = ({target}) => setImageUrlValue(target.value);
    const onTitleChange = ({target}) => setTitleValue(target.value);

    return (
        <div className={className} >
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
                    onClick={() => setIsOpenAddCategory(false)}
                />
                <Button children="Coхранить"
                    onClick={() => onSave()}
                />
            </div>
    </div>
    );
};

export const AddCategory = styled(AddCategoryContainer)`
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

AddCategory.propTypes = {
    setIsOpenAddCategory: PropTypes.func.isRequired,
    setIsOpenEditCategory: PropTypes.func.isRequired,
}