import { styled } from "styled-components"
import PropTypes from 'prop-types';
import { device } from "../../adaptiv-styled/device";


const ButtonContainer = ({className, children, disabled, ...props}) => {
    return (
        <button disabled={disabled} className={className} {...props}>{children}</button>
    )
}

export const Button = styled(ButtonContainer)`
@media ${device.desktop} {
    font-size: ${({fontSize = '18px'}) => fontSize};
  }
  
  @media ${device.laptop} {
    font-size: ${({fontSize = '16px'}) => fontSize};
  }
  @media ${device.tablet} {
    font-size: ${({fontSize = '12px'}) => fontSize};
  }
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({widht = '100%'}) => widht};
    height: ${({height = '32px'}) => height};
    border: 1px solid #000;
    border-radius: 5px;
    background-color: #fb9c13;
    &:hover {
        cursor: ${({disabled}) => disabled ? 'default' : 'pointer'}; 
        background-color: ${({disabled}) => disabled ? '#fb9c13' : '#ffbf62'}; 
    }

    
`

Button.propTypes = {
    children: PropTypes.node.isRequired,
    widht: PropTypes.string,
    disabled: PropTypes.bool,
}