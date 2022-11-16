const CountryResultItem = ({country, showCountryInfo}) => {
    return (<div>
        {country.name.common}
        <button onClick={() => showCountryInfo(country.name.common)}>show</button>
    </div>)
}

export default CountryResultItem