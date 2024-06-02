import { useState } from "react";
import { styled } from "styled-components";
import { saveCategoryAsync } from "../../../../actions";
import { Button, Input, PrivateContent } from "../../../../components";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../../reducers/hooks/hooks";
import { Target } from "../../../../models/models";
import { checkAccess } from "../../../../utils";
import { ROLE } from "../../../../constants";
import { selectUserRole } from "../../../../selectors";

type Props = {
    className?: string
  }

const AddCategoryContainer = ({className}: Props) => {
    const [imageUrlValue, setImageUrlValue] = useState('');
    const [titleValue, setTitleValue] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userRole = useAppSelector(selectUserRole)

    if(!checkAccess([ROLE.ADMIN], userRole)) {
        return <PrivateContent access={[ROLE.ADMIN]}/>;
    }

    const onSave = () => {
        dispatch(saveCategoryAsync({
            imageUrl: imageUrlValue,
            title: titleValue,
        }))
        navigate('/administration-page/edit-category')
    }

    const onImageChange = ({target}: Target) => setImageUrlValue(target.value);
    const onTitleChange = ({target}: Target) => setTitleValue(target.value);

    return (
        <div className={className} >
            <div className="block-edit">
                <div className="block-name">Фото</div>
                <Input value={imageUrlValue} placeholder="URL фото..." onChange={onImageChange}/>     
            </div>
            <div className="block-edit">
                <div className="block-name">Название</div>
                <Input value={titleValue} placeholder="Название..." onChange={onTitleChange}/>     
            </div>
            <Button children="Вернуться в меню редактирования"
                onClick={() => navigate('/administration-page')}
            />
            <Button children="Coхранить"
                onClick={() => onSave()}
            />
    </div>
    );
};

export const AddCategory = styled(AddCategoryContainer)`
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
