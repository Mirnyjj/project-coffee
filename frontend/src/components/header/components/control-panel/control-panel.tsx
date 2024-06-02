import { styled } from "styled-components";
import { Icon } from "../../../icon/icon";
import { NavLink, useNavigate, useMatch } from "react-router-dom";
import { Button } from "../../../button/button";
import {ROLE} from "../../../../constants";
import { selectUserLogin, selectUserRole } from "../../../../selectors";
import { logout } from "../../../../actions";
import { checkAccess } from "../../../../utils";
import { useAppDispatch, useAppSelector } from "../../../../reducers/hooks/hooks";
import { useEffect, useState } from "react";

const RightAligned = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

`;

const UserName = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

type Props = {
    className?: string
  }


const ControlPanelConteiner = ({className}: Props) => {
    const adminPanelIsOpen = !!useMatch('/administration-page');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const roleId = useAppSelector(selectUserRole);
    const login = useAppSelector(selectUserLogin);
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const isAdminCheck = checkAccess([ROLE.ADMIN], roleId);
        setIsAdmin(isAdminCheck)
    }, [roleId])

    const onLogout = () => {
        dispatch(logout())
        sessionStorage.removeItem('userData');
    };

    return (
        <div className={className}>
            <RightAligned>
                {roleId === ROLE.GUEST ? (
                    <NavLink to="/login">
                        <Button>
                            Войти
                        </Button>
                    </NavLink>

                    ) : 
                    <>
                        <UserName>
                            {login}
                        </UserName>
                            <Icon id="fa-sign-out" 
                                margin="0 0 0 10px" 
                                onClick={() => onLogout()}
                            />

                    </>

                    }
                
            </RightAligned>
            <RightAligned>
                    <Icon id="fa-backward" margin="10px 0 0 0" onClick={() => navigate(-1)}/>
                {isAdmin && !adminPanelIsOpen &&
                    <>
                    <NavLink to="/administration-page"><Icon id="fa-cogs" margin="10px 0 0 15px"/></NavLink>
                    </>
                }
            </RightAligned>
        </div>
    );
}

export const ControlPanel = styled(ControlPanelConteiner)`

`