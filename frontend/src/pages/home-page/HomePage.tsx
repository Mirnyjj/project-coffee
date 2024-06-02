import { styled } from "styled-components";
import { CarouselFoto } from "./components/CarouselFoto/CarouselFoto";
import { BackgroundVideo } from "./components/background/Background";
import { Info } from "./components/info/Info";
import { device } from "../../adaptiv-styled/device";

type Props = {
  className?: string
}

const HomePageContainer = ({ className }: Props) => (
        <div className={className}>
            <BackgroundVideo />
            <CarouselFoto/>
            <Info />
        </div>
    );

export const HomePage = styled(HomePageContainer)`

@media ${device.desktop} {
    max-width: 1440px;
  }
  
  @media ${device.laptopL} {
    max-width: 768px;
  }
  
  @media ${device.tablet} {
    max-width: none;
  }
`;