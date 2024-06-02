import { styled } from "styled-components"
import { device } from "../../adaptiv-styled/device";

type Props = {
  className?: string
  children?: string
  disabled?: boolean
  fontSize?: string
  width?: string
  height?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const ButtonContainer = ({className, children, disabled, onClick}: Props) => {
    return (
        <button 
          disabled={disabled} 
          className={className} 
          onClick={onClick}
          >
            {children}
        </button>
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
    width: ${({width = '100%'}) => width};
    height: ${({height = '32px'}) => height};
    border: 1px solid #000;
    border-radius: 5px;
    background-color: #fb9c13;
    &:hover {
        cursor: ${({disabled}) => disabled ? 'default' : 'pointer'}; 
        background-color: ${({disabled}) => disabled ? '#fb9c13' : '#ffbf62'}; 
    }

    
`