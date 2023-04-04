import { useEffect, useState } from "react";
import countryService from "./services/countries";
import Results from "./components/Results";

const { name, capital, languages, area, currencies, flags, capitalInfo } = countryService.fields;

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchQuery!== "") {
      countryService
        .searchByName(searchQuery, [
          name,
          capital,
          languages,
          area,
          currencies,
          flags,
          capitalInfo,
        ])
        .then((countries) => {
          setResults(countries);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else setResults([]);
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div class="search">
        <h2>Country search</h2>
        Search: <input value={searchQuery} onChange={handleSearchChange} />
      </div>

      <Results results={results} />
    </div>
  );
};

export default App;
