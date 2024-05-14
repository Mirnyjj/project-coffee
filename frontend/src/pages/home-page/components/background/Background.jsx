import { styled } from "styled-components";
import VideoBackground from "./video/VideoBackground.mp4"
import { useNavigate } from "react-router";
import { device } from "../../../../adaptiv-styled/device";

const BackgroundVideoContainer = ({className}) => {
  const navigate = useNavigate();

  return (
    <div className={className}>
        <div className="front-text">Оазис в сердце города <br /> Лучшее место для отдыха в Инзе</div>
        <video className="video-player" loop autoPlay muted={true} playsInline>
          <source src={VideoBackground} type="video/mp4" />
        </video>
        <button className="background-button" onClick={() => navigate('/menu')}>Перейти к меню</button>
    </div>
  );
};

export const BackgroundVideo = styled(BackgroundVideoContainer)`

@media ${device.desktop} {
  font-size: 50px;
  button {
    font-size: 30px;
    top: 20%;
  }
  .video-player {
    height: 700px;
  }
  .front-text {
    top: 10%;
  }
}

@media ${device.laptopL} {
  font-size: 40px;
  button {
    font-size: 30px;
    top: 20%;
  }
  .video-player {
    height: 500px;
  }
}

@media ${device.tablet} {
  font-size: 27px;
  button {
    font-size: 20px;
    top: 25%;
  }
  .video-player {
    height: 400px;
  }
  .front-text {
    top: 13%;
  }
}
@media ${device.mobileL} {
  font-size: 23px;
}

.video-player {
    object-fit: cover;
    opacity: 0.8;
    width: 100%;
  }
  .front-text {
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    text-align: center;
    color: white;
    text-shadow: 2px 2px 4px black;
    z-index: 2;
    font-family: "Rubik Scribble", system-ui;
    font-weight: 700;
    font-style: normal;
  }
  .background-button {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    white-space: nowrap;
    font-weight: 600;
    background-color: #fb9c13;
    border-radius: 20px;
    padding: 10px;
    font-style: normal;
    &:hover {
      cursor: pointer;
      background-color: #ffbf62;
    } 
  }
    
  }
`