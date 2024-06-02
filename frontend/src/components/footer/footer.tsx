import { useEffect, useState } from "react"
import { styled } from "styled-components";
import { Icon } from "../icon/icon";
import { device } from "../../adaptiv-styled/device";

type Props = {
    className?: string
} 

interface Data {
    name: string
    main: {
        temp: number
    }
    weather: [
        {
            description: string
        }
    ]
}

 const FooterContainer = ({ className }: Props) => {
    const [city, setCity] = useState('');
    const [temperature, setTemperature] = useState(0);
    const [weather, setWeather] = useState('');
    useEffect(() => {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=Inza&units=metric&lang=ru&appid=9c67b68cb9788d255ccd9cce9aabea60')
        .then((res) => res.json())
        .then(({name, main, weather}: Data) => {
            setCity(name);
            setTemperature(Math.round(main.temp));
            setWeather(weather[0].description);
        })
    }, [])
    return (
        <div className={className}>
            <div>Информация на сайте не является публичной офертой</div>
            <div className="info-footer">
                <div className="info-developed">
                    Developed <br/>
                    <a href="https://t.me/Maksim13777">
                    <Icon id="fa-telegram" margin="1px 0 0 5px"/>
                    </a>
                </div>
                <div>
                    <div>{city}, {''} 
                        {new Date().toLocaleString('ru', {day: 'numeric', month: 'long'})}
                    </div>
                    <div>{temperature} градусов, {weather}</div>
                </div>
            </div>
        </div>
    )
}

export const Footer = styled(FooterContainer)`
@media ${device.desktop} {
    font-size: 20px;
  }
  
  @media ${device.tablet} {
    font-size: 14px;
  }
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    gap: 5px;
    width: 100%;
    height: 120px;
    padding: 20px 20px;
    box-shadow: 0 0px 8px #000;
    background-color: #fff;
    font-style: italic; 
    .info-footer {
        display: flex;
        width: 100%;
        justify-content: space-around;
    }
    .info-developed {

    }
`;