import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>Unicafe Feedback Survey</h2>
      <Button handler={() => setGood(good + 1)} name="Good" />
      <Button handler={() => setNeutral(neutral + 1)} name="Neutral" />
      <Button handler={() => setBad(bad + 1)} name="Bad" />

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  let n = good + neutral + bad;
  let score = good - bad;

  if(good === 0 && neutral === 0 && bad === 0) return (
    <>
      <h2>Current Statistics</h2>
      <p>No feedback given yet</p>
    </>
  );

  return (
    <>
      <h2>Current Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={n} />
          <StatisticLine text="Score" value={score} />
          <StatisticLine text="Averaged Score" value={score / n} />
          <StatisticLine text="Good" value={(good / n) * 100} />
        </tbody>
      </table>
    </>
  );
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td> <td>{value}</td>
    </tr>
  );
}

const Button = ({ handler, name }) => {
  return (
    <button onClick={handler}>
      {name}
    </button>
  );
};

export default App;
