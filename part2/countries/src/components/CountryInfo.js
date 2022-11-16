const CountryInfo = ({ country }) => {
    const languages = Object.values(country.languages)
    const flagURL = country.flags.png;
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h3>languages: </h3>
            <ul>
                {languages.map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
        <img src={flagURL} width="200" />
        </div>
    )
}

export default CountryInfo;