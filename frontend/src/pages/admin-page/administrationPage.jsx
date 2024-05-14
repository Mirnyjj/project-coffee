import { styled } from "styled-components"
import { Button, PrivateContent, Title } from "../../components"
import { useEffect, } from "react"
import { useSelector } from "react-redux"
import { selectUserRole } from "../../selectors"
import { checkAccess } from "../../utils"
import { ROLE } from "../../constants"
import { useNavigate } from "react-router"
import { device } from "../../adaptiv-styled/device"

const AdministrationPageContainer = ({className}) => {
    const navigate = useNavigate();
    const userRole = useSelector(selectUserRole);

    useEffect(() => {
        if(!checkAccess([ROLE.ADMIN], userRole)) {
            return;
        }
       
    }, [userRole])

    return (
        <PrivateContent access={[ROLE.ADMIN]}>
        <div className={className}>
            <Title title="Страница администратора"/>
            <div className="admin-page">
                    <div className="control-panel">
                        <Title title="Выберите действие"/> 
                        <Button children="Редактировать товары" onClick={() => navigate('/administration-page/edit-product')}/> 
                        <Button children="Редактировать категории" onClick={() => navigate('/administration-page/edit-category')} /> 
                        <Button children="Добавить товар" onClick={() => navigate('/administration-page/add-product')} /> 
                        <Button children="Добавить категорию" onClick={() => navigate('/administration-page/add-category')} /> 
                        <Button children="Перейти к заказам" onClick={() => navigate('/administration-page/order')} /> 
                    </div>
            </div>
        </div>
        </PrivateContent>
    )

    
}

export const AdministrationPage = styled(AdministrationPageContainer)`
    .admin-page {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 20px;
        padding: 20px;
        background-color: #714545;
        border-radius: 10px;
    }
    .control-panel {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
    }
      
      @media ${device.tablet} {
        margin: 10px;
      }
`