import axios from "axios";
import { useEffect, useState } from "react";
import WeatherInfo from "./WeatherInfo";

const api_key = process.env.REACT_APP_API_KEY;
const base_url = "https://api.openweathermap.org/data/2.5/weather";

const CountryInfo = ({ country }) => {
    const [weatherInfo, setWeatherInfo] = useState();
    const countryName = country.name.common
    const capital = country.capital[0];
    const [lat, long] = country.latlng;

    useEffect(() => {
        axios.get(`${base_url}?lat=${lat}&lon=${long}&appid=${api_key}&units=metric`)
            .then(response => {
                console.log(response.data);
                setWeatherInfo(response.data)
            })
    }, [lat, long])
    const languages = Object.values(country.languages)
    const flagURL = country.flags.png;


    return (
        <div>
            <h1>{countryName}</h1>
            <p>capital {capital}</p>
            <p>area {country.area}</p>
            <h3>languages: </h3>
            <ul>
                {languages.map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={flagURL} width="200" />

        {weatherInfo && 
            <WeatherInfo countryName={countryName} weatherInfo={weatherInfo} />
        }
        </div>
    )
}

export default CountryInfo;