import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { selectCategory } from "../../../../selectors";
import { useEffect, useState } from "react";
import { Button, Icon, Img, Loader } from "../../../../components";
import { EditBlockCategory } from "./components/edit-block-category/editBlockCategory";
import { onResetCategory } from "./utils";
import { RESET_CATEGORY_DATA } from "../../../../actions";
import PropTypes from 'prop-types';
import { request } from "../../../../utils";


const EditCategoryContainer = ({className, setIsOpenEditCategory}) => {
    const [isEditCategory, setIsEditCategory] = useState(null);
    const [isDeleteCategory, setIsDeleteCategory] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const category = useSelector(selectCategory);
    const dispatch = useDispatch();

    useEffect(() => {
            request('/api/categories').then(({data: {categories}}) => {
                setCategories(categories);
                setIsLoading(false)
                setIsDeleteCategory(false)
            })
    }, [isDeleteCategory])

    const onDeleteCategory = (id) => {
        setIsLoading(true)
        request(`/api/categories/${id}`, 'DELETE').then((res) => {
            setIsDeleteCategory(true);
            dispatch(RESET_CATEGORY_DATA)
            setIsLoading(false)
        });
    }
    
    return isLoading || (categories.length === 0 && category.length === 0) ? <Loader />
    : (
        isEditCategory ? 
        <EditBlockCategory 
            isEditCategory={isEditCategory} 
            setIsEditCategory={setIsEditCategory}
            setCategories={setCategories}
        />
        :
        <div className={className}>
            <Button widht="50%" children="Вернуться в меню" onClick={() => dispatch(onResetCategory(setIsOpenEditCategory))} />
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Фото</th>
                                <th>Наименование</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        {(category.length !== 0 ? category : categories).map(
                            (category) => (
                                <tbody key={category.id}>
                                    <tr>
                                        <td>                        
                                            <Img 
                                                inactive={true}
                                                imageUrl={category.imageUrl} 
                                                name={category.title} 
                                                width="100%" 
                                                height="300px"
                                                radius="10px"
                                            />
                                        </td>
                                        <td>{category.title}</td>
                                        <td>
                                            <div className="action-button">
                                                <Icon
                                                    inactive={false}
                                                    id="fa-pencil-square-o" 
                                                    size="23px"
                                                    color="#fff"
                                                    onClick={() => setIsEditCategory(category)}
                                                />
                                                <Icon 
                                                    inactive={false}
                                                    id="fa-trash-o" 
                                                    size="23px"
                                                    color="#fff"
                                                    onClick={() => onDeleteCategory(category.id)}
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

export const EditCategory = styled(EditCategoryContainer)`
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

EditCategory.propTypes = {
    setIsOpenEditCategory: PropTypes.func.isRequired,
}
