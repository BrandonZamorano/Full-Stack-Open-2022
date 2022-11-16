const WeatherInfo = ({weatherInfo, countryName}) => {
    const temperature = weatherInfo.main.temp;
    const windSpeed = weatherInfo.wind.speed;
    const weatherIcon = weatherInfo.weather[0].icon
    const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
    return (
        <div>
        <h2>Weather in {countryName}</h2>
        <p>temperature {temperature} Celsius</p>
        <img src={weatherIconUrl} />

        <p>wind {windSpeed} m/s</p>

        </div>
    )
}

export default WeatherInfo;