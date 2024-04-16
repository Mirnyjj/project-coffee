import { styled } from "styled-components";
import VideoBackground from "./video/VideoBackground.mp4"
import { useNavigate } from "react-router";

const BackgroundVideoContainer = ({className}) => {
  const navigate = useNavigate();

  return (
    <div className={className}>
        <div className="front-text">Оазис в сердце города <br /> Лучшее место для отдыха в Инзе</div>
        <video className="Video-player" loop autoPlay muted={true}>
            <source src={VideoBackground} type="video/mp4" />
        </video>
        <button className="background-button" onClick={() => navigate('/menu')}>Перейти к меню</button>
    </div>
  );
};

export const BackgroundVideo = styled(BackgroundVideoContainer)`
width: 100%;
height: 750px;

.Video-player {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 750px;
    z-index: 1;
    opacity: 0.8;
  }
  .front-text {
    left: 50%;
    top: 10%;
    transform: translateX(-50%);
    position: absolute;
    text-align: center;
    color: white;
    text-shadow: 2px 2px 4px black;
    z-index: 2;
    font-family: "Rubik Scribble", system-ui;
    font-weight: 700;
    font-style: normal;
    font-size: 50px;
  }
  .background-button {
    position: absolute;
    left: 50%;
    top: 28%;
    transform: translateX(-50%);
    z-index: 2;
    white-space: nowrap;
    font-size: 30px;
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