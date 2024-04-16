import { styled } from "styled-components";
import { Icon } from "../../../icon/icon";
import { NavLink, useNavigate, useMatch } from "react-router-dom";
import { Button } from "../../../button/button";
import {ROLE} from "../../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLogin, selectUserRole, selectUserSession } from "../../../../selectors";
import { logout } from "../../../../actions";
import { checkAccess } from "../../../../utils";

const RightAligned = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

`;

const UserName = styled.div`
    font-size: 18px;
    font-weight: bold;
`;


const ControlPanelConteiner = ({className}) => {
    const adminPanelIsOpen = !!useMatch('/administration-page');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const roleId = useSelector(selectUserRole);
    const login = useSelector(selectUserLogin);
    const session = useSelector(selectUserSession);

    const onLogout = (session) => {
        dispatch(logout(session))
        sessionStorage.removeItem('userData');
    };

    const isAdmin = checkAccess([ROLE.ADMIN], roleId);

    return (
        <div className={className}>
            <RightAligned>
                {roleId === ROLE.GUEST ? (
                        <Button>
                            <NavLink to="/login">Войти</NavLink>
                        </Button>
                    ) : 
                    <>
                        <UserName>
                            {login}
                        </UserName>
                            <Icon id="fa-sign-out" 
                                margin="0 0 0 10px" 
                                onClick={() => onLogout(session)}
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