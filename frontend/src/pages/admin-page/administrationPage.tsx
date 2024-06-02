import { styled } from "styled-components"
import { Button, PrivateContent, Title } from "../../components"
import { selectUserRole } from "../../selectors"
import { checkAccess } from "../../utils"
import { ROLE } from "../../constants"
import { useNavigate } from "react-router"
import { device } from "../../adaptiv-styled/device"
import { useAppSelector } from "../../reducers/hooks/hooks"

type Props = {
    className?: string
}

const AdministrationPageContainer = ({className}: Props) => {
    const navigate = useNavigate();
    const userRole = useAppSelector(selectUserRole);

    if(!checkAccess([ROLE.ADMIN], userRole)) {
        return <PrivateContent access={[ROLE.ADMIN]}/>;
    }

    return (
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