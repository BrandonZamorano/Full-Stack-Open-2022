import CountryInfo from "./CountryInfo"
import CountryResultItem from "./CountryResultItem"

const CountryResults = ({ results , showCountryInfo}) => {
    if (results.length === 1) {
        // render single country
        return <CountryInfo country={results[0]} />
    }
    
    if (results.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }

    const sortedResults = [...results].sort((a, b) => {
        if (a.name.common > b.name.common) {
            return 1;
        }

        if (a.name.common < b.name.common) {
            return -1;
        }


        return 0;
    });

    console.log("sorted results: ", sortedResults);

    return (
        <div>
        {sortedResults.map(country => (
            <CountryResultItem key={country.cca2} country={country} showCountryInfo={showCountryInfo}/>
        ))}

        </div>
    )
}

export default CountryResults