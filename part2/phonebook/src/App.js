import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const baseUrl = "http://localhost:3001/persons";

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    if (
      persons.find((person) => person.name === newName) ||
      persons.find((person) => person.number === newNumber)
    ) {
      alert(`${newName} or ${newNumber} is already added to phonebook`);
    } else {
      let data = {
        id: persons.length + 1,
        number: newNumber,
        name: newName,
      };

      axios.post(baseUrl, data).then(() => {
        setPersons(persons.concat(data));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />

      <h2>Add a new number</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={addName}
      />

      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter} />
    </div>
  );
};

const PersonForm = ({
  newName,
  newNumber,
  onNameChange,
  onNumberChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        Name: <input value={newName} onChange={onNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Numbers = ({ persons, filter }) => (
  <div>
    {persons
      .filter((person) => person.name.includes(filter))
      .map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
  </div>
);

const Filter = ({ value, onChange }) => (
  <div>
    Name Filter: <input value={value} onChange={onChange} />
  </div>
);

export default App;
