import { styled } from "styled-components";
import { CarouselFoto } from "./components/CarouselFoto/CarouselFoto";
import { BackgroundVideo } from "./components/background/Background";
import { Info } from "./components/info/Info";


const HomePageContainer = ({ className }) => {
    
    return (
        <div className={className}>
            <BackgroundVideo />
            <CarouselFoto/>
            <Info />
        </div>
    )
   
};

export const HomePage = styled(HomePageContainer)`
  
`;