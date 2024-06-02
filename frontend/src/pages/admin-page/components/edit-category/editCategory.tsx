import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { selectCategory, selectUserRole } from "../../../../selectors";
import { useEffect, useState } from "react";
import { Button, Icon, Img, Loader, PrivateContent, Title } from "../../../../components";
import { EditBlockCategory } from "./components/edit-block-category/editBlockCategory";
import { onResetCategory } from "./utils";
import { RESET_CATEGORY_DATA } from "../../../../actions";
import { checkAccess, request } from "../../../../utils";
import { useNavigate } from "react-router";
import { device } from "../../../../adaptiv-styled/device";
import { useAppDispatch, useAppSelector } from "../../../../reducers/hooks/hooks";
import { Category } from "../../../../models/models";
import { ROLE } from "../../../../constants";

type Props = {
    className?: string
}

const EditCategoryContainer = ({className}: Props) => {
    const [isEditCategory, setIsEditCategory] = useState<Category | null>(null);
    const [isDeleteCategory, setIsDeleteCategory] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const category = useSelector(selectCategory);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userRole = useAppSelector(selectUserRole)

    useEffect(() => {
            request('/api/categories').then(({data: {categories}}) => {
                setCategories(categories);
                setIsLoading(false)
                setIsDeleteCategory(false) 
            })
    }, [isDeleteCategory])

    if(!checkAccess([ROLE.ADMIN], userRole)) {
        return <PrivateContent access={[ROLE.ADMIN]}/>;
    }

    const onDeleteCategory = (id?: string) => {
        setIsLoading(true)
        request(`/api/categories/${id}`, 'DELETE').then(() => {
            setIsDeleteCategory(true);
            dispatch(RESET_CATEGORY_DATA)
            setIsLoading(false)
        });
    }

    if(isLoading || (categories.length === 0 && category.length === 0)) {
        return <Loader />
    } else if(isEditCategory) {
        return <EditBlockCategory 
                    isEditCategory={isEditCategory} 
                    setIsEditCategory={setIsEditCategory}
                    setCategories={setCategories}
                />
    } else {
        return <div className={className}>
                    <Title title='Редактирование категорий' />
                    <Button width="50%" children="Вернуться в меню" onClick={() => (dispatch(onResetCategory()), navigate('/administration-page'))} />
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
                                                width="100px" 
                                                height="100px"
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
    }

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

    @media(${device.tablet}){
        margin: 10px;
        .table th, .table td {
            padding: 10px;
        }
    }

`
