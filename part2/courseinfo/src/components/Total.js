const Total = ({ parts }) => {
    return (
      <p>
        <b>Total of {parts.reduce((s, p) => s + p.exercises, 0)} exercises</b>
      </p>
    );
}

export default Total