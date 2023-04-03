import { useEffect, useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Numbers from "./components/Numbers";

import bookService from "./services/book"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    bookService.getAll().then(setPersons);
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

      bookService.create(data).then(returnedData => {
        setPersons(persons.concat(returnedData));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deleteName = id => {
    if(!window.confirm(`Would you like to delete ${persons[id].name}'s number from the list?`)) return
    bookService.deleteName(id).then(returnedData => {
      setPersons(persons.filter(person => person.id !== id));
    })
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
      <Numbers persons={persons} filter={filter} onDelete={deleteName} />
    </div>
  );
};

export default App;
