import { useEffect, useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Numbers from "./components/Numbers";
import Notification from "./components/Notification";

import bookService from "./services/book";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [notification, setNotification] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    bookService.getAll().then(setPersons);
  }, []);

  const notify = (success, message) => {
    setNotification(message);
    setSuccess(success);

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addName = (event) => {
    event.preventDefault();
    let found = persons.find((person) => person.name === newName);
    let data = {
      id: found
        ? found.id
        : persons.reduce((t, a) => (a > t ? a.id + 1 : t), 0),
      number: newNumber,
      name: newName,
    };

    if (found) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with the new one?`
        )
      ) {
        bookService
          .update(found.id, data)
          .then((returnedData) => {
            setPersons(
              persons.map((person) =>
                person.id === returnedData.id ? data : person
              )
            );
            notify(true, `${found.name} modified`);
          })
          .catch((_) => {
            notify(
              false,
              `The entry for '${found.name}' was already removed from server`
            );
            setPersons(persons.filter((person) => person.id !== found.id));
          });
      }
    } else {
      bookService
        .create(data)
        .then((returnedData) => {
          setPersons(persons.concat(returnedData));
          setNewName("");
          setNewNumber("");
          notify(true, `Added '${newName}' to the list`);
        })
        .catch(_ => {
          // maybe
          notify(
            false,
            `'${data.name}' has already been added to the server`
          );
        });
    }
  };

  const deleteName = (id) => {
    let target = persons.find((person) => person.id === id);
    if (
      window.confirm(
        `Would you like to delete ${target.name}'s number from the list?`
      )
    ) {
      bookService
        .deleteId(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
          notify(true, `Deleted '${target.name}' from the list`);
        })
        .catch((_) => {
          notify(
            false,
            `The entry for '${target.name}' was already removed from server`
          );
          setPersons(persons.filter((person) => person.id !== target.id));
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
      <Notification success={success} message={notification} />

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
