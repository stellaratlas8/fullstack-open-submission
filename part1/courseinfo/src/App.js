const App = () => {
  // const-definitions
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <>
      {/* i had the idea and went for it */}
      {course.parts.map((v) => (
        <Part key={v.name} name={v.name} exercises={v.exercises} />
      ))}
    </>
  );
};

const Total = ({ course }) => {
  return (
    <p>Number of exercises {course.parts.reduce((t, a) => t + a.exercises, 0)}</p>
  );
};

export default App;
