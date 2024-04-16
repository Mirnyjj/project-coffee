import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { styled } from "styled-components";
import { Loader, Title } from "../../../../components";
import { request } from "../../../../utils";

const CarouselFotoContainer = ({ className }) => {

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
          slidesToSlide: 1 
        },
        tablet: {
          breakpoint: { max: 1024, min: 768 },
          items: 1,
          slidesToSlide: 1 
        },
        mobile: {
          breakpoint: { max: 767, min: 464 },
          items: 1,
          slidesToSlide: 1 
        }
      };

      const [images, setImages] = useState([]);

      
      
      useEffect(() => {
        request('/api/fotos').then(({data}) => {
          setImages(data)
        })
      }, [])
      

  return images.length > 0 ?  (
      <div className={className}>
        <Title title="Атмосфера отдыха" size="50px" />
      <div style={{ position: "relative" }}>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        swipeable={true}
        draggable={true}
        showDots={true}
        infinite={true}
        partialVisible={false}
        dotListClass="react-multi-carousel-dot-list"
      >
        {images.map(({id, imageUrl}) => {
            return (
            <div className="slider" key={id}>
                <img src={imageUrl} alt="Летняя вечеринка" />
            </div>
            );
        })}
        </Carousel>
      </div>
    </div>)
      : <Loader />
};

export const CarouselFoto = styled(CarouselFotoContainer)`
  margin-top: 40px; 
  border-top: 4px solid white;
  .slider {
    margin:0 20px;
    overflow:"hidden";
    padding:2rem 0;
  }
  
  .slider img {
    border-radius:10px;
    width: 100%;
    height: 100%;
  }
  
`;