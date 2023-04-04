import { useState } from "react";
import Weather from "./Weather";

const Result = ({ country, collapsible }) => {
  const [shown, setShown] = useState(!collapsible);

  const handleShow = () => {
    setShown(!shown);
  };

  if (!shown && collapsible) {
    return (
      <div>
        <h3>
          {country.name.common}
          <button onClick={handleShow}>Show Information</button>
        </h3>
      </div>
    );
  }

  return (
    <div>
      <h3>
        {country.name.official}
        {collapsible ? (
          <button onClick={handleShow}>Hide Information</button>
        ) : null}
      </h3>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h4>Languages: </h4>
      <ul>
        {Object.entries(country.languages).map(([code, lang]) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt="Flag could not be loaded"
        width="200px"
      />
      <Weather country={country} />
    </div>
  );
};

export default Result;