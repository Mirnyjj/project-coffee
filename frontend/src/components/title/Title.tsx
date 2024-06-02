import { styled } from "styled-components";
import { device } from "../../adaptiv-styled/device";

type Props = {
  className?: string
  title?: string
  top?: string
  margin?: string
}

const TitleContainer = ({ className, title }: Props) => {

  return (
      <div className={className}>
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
