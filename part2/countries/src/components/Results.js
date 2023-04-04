import Result from "./Result";

const Results = ({ results }) => {
  if (results.length > 10) return <p>Too many matches, be more specific</p>;
  if (results.length === 0) return <p>No matches</p>;
  return (
    <div>
      {results.map((country) => (
        <Result country={country} collapsible={results.length !== 1} />
      ))}
    </div>
  );
};

export default Results;