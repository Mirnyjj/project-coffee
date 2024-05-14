import { styled } from "styled-components";
import PropTypes from 'prop-types';
import { device } from "../../adaptiv-styled/device";

const TitleContainer = ({ className, title, ...props }) => {


  return (
      <div className={className} {...props}>
        {title}
    </div>)
};

export const Title = styled(TitleContainer)`
@media ${device.desktop} {
    font-size: 50px;
  }
  
  @media ${device.tablet} {
    font-size: 30px;
  }
    padding-top: ${({top = '20px'}) => top}; 
    text-align: center;
    color: white;
    margin: ${(({margin}) => margin)};
    text-shadow: 2px 2px 4px black;
    z-index: 2;
    font-family: "Rubik Scribble", system-ui;
    font-weight: 700;
    font-style: normal;
  
`;

Title.propTypes = {
    title: PropTypes.string.isRequired,
}