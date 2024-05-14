import { styled } from "styled-components"
import { NavLink } from "react-router-dom";
import lebel from "../../../../img/lebel.png";
import { device } from "../../../../adaptiv-styled/device";

const LargeText = styled.div`
    font-size: 48px;
    font-weight: 600;
    margin-top: 5px;
    
    @media ${device.tablet} {
        display: none;
    }
    
`;

const SmallText = styled.div`
    font-size: 18px;
    font-weight: bold;
    
    @media ${device.tablet} {
        display: none;
    }
`;

const LogoContainer = ({className}) => (
    <NavLink className={className} to="/">
        <img className="logo" src={lebel}/>
        <div>
            <LargeText>ELITE 2.0</LargeText>
            <SmallText>lounge cafe</SmallText>
        </div>
    </NavLink>
)

export const Logo = styled(LogoContainer)`
    display: flex;
    margin-top: -10px;

    .logo {
        width: 100px;
        height: 100px;
        margin: 0 5px 0 0;
        &:hover {
            cursor: pointer; 
        }
    }
`