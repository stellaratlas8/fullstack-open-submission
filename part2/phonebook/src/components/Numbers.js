const Numbers = ({ persons, filter, onDelete }) => (
  <div>
    {persons
      .filter((person) => person.name.includes(filter))
      .map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => onDelete(person.id)}>Delete</button>
        </p>
      ))}
  </div>
);
export default Numbers;
