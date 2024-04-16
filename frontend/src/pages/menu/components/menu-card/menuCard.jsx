import { styled } from "styled-components";
import { NavLink } from "react-router-dom";
import { Img } from "../../../../components";
import PropTypes from 'prop-types';

const MenuCardContainer = ({className, id, title, imageUrl }) => {

    return (
        <div className={className}>
            <NavLink to={`/menu/${id}`}>
            <Img 
                imageUrl={imageUrl} 
                name={title} 
                width="450px" 
                height="600px"
                radius="10px"  
            />
            <div className="category-menu">{title}</div>
            </NavLink>
        </div>
    )
};


export const MenuCard = styled(MenuCardContainer)`
    position: relative;
    text-align: center;
    width: 460px;
    margin: 20px;
    opacity: 0.8;
    &:hover {
        cursor: pointer;
        opacity: 1;
      } 
    .category-menu {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: white;
        text-shadow: 2px 2px 4px black;
        z-index: 2;
        font-family: "Rubik Scribble", system-ui;
        font-weight: 700;
        font-style: normal;
        font-size: 50px;
    }

`;

MenuCard.propTypes = {
    id: PropTypes.string.isRequired, 
    title: PropTypes.string.isRequired, 
    imageUrl: PropTypes.string.isRequired, 
}