import { useEffect, useState } from "react"
import { styled } from "styled-components";
import { Icon } from "../icon/icon";


 const FooterContainer = ({ className }) => {
    const [city, setCity] = useState('');
    const [temperature, setTemperature] = useState('');
    const [weather, setWeather] = useState('');
    useEffect(() => {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=Inza&units=metric&lang=ru&appid=9c67b68cb9788d255ccd9cce9aabea60')
        .then((res) => res.json())
        .then(({name, main, weather}) => {
            setCity(name);
            setTemperature(Math.round(main.temp));
            setWeather(weather[0].description);
        })
    }, [])
    return (
        <div className={className}>
            <div>
                <div>This website was developed by Mirnyjj Maxim</div>
                <a href="https://t.me/Maksim13777">
                <Icon id="fa-telegram" margin="10px 0 0 15px"/>
                </a>
            </div>
            <div>
                <div>{city}, {''} 
                    {new Date().toLocaleString('ru', {day: 'numeric', month: 'long'})}
                </div>
                <div>{temperature} градусов, {weather}</div>
            </div>
        </div>
    )
}

export const Footer = styled(FooterContainer)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 120px;
    padding: 20px 40px;
    font-weight: bold;
    box-shadow: 0 0px 8px #000;
    background-color: #fff;
`;