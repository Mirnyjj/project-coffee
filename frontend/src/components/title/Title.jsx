import { styled } from "styled-components";
import PropTypes from 'prop-types';

const TitleContainer = ({ className, title, ...props }) => {


  return (
      <div className={className} {...props}>
        {title}
    </div>)
};

export const Title = styled(TitleContainer)`
    padding-top: ${({top = '20px'}) => top}; 
    text-align: center;
    color: white;
    margin: ${(({margin}) => margin)};
    text-shadow: 2px 2px 4px black;
    z-index: 2;
    font-family: "Rubik Scribble", system-ui;
    font-weight: 700;
    font-style: normal;
    font-size: ${({size = '50'}) => size};
  
`;

Title.propTypes = {
    title: PropTypes.string.isRequired,
}