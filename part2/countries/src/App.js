import axios from "axios";
import { useEffect, useState } from "react";
import CountryResults from "./components/CountryResults";

function App() {
  const [countries, setCountries] = useState([]);
  const [countrySearchValue, setCountrySearchValue] = useState("");
  
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(countrySearchValue.toLowerCase()));
  
  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all").then(response => {
      console.log(response.data);
      setCountries(response.data);
    })
  }
  useEffect(hook, [])

  const handleCountrySearchValueChange = (event) => {
    setCountrySearchValue(event.target.value);
  }
  
  const showCountryInfo = (countryName) => {
    setCountrySearchValue(countryName)
  }
  

  return (
    <div className="App">
      <div>
        find countries <input type="text" value={countrySearchValue} onChange={handleCountrySearchValueChange} />
      </div>
   {countrySearchValue.trim().length > 0 &&  
    <CountryResults  results={countriesToShow} showCountryInfo={showCountryInfo} />
   }
    </div>
  );
}

export default App;
