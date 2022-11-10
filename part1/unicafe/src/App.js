import { useState } from 'react'

const Heading = ({ text }) => <h1>{text}</h1>;
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const Statistic = ({ name, value }) => <p>{name} {value}</p>
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGoodRating = () => setGood(good + 1);
  const addNeutralRating = () => setNeutral(neutral + 1);
  const addBadRating = () => setBad(bad + 1);

  return (
    <div>
      <Heading text="give feedback" />

      <Button onClick={addGoodRating} text="good" />
      <Button onClick={addNeutralRating} text="neutral" />
      <Button onClick={addBadRating} text="bad" />

      <Heading text="statistics" />
      <Statistic name="good" value={good} />
      <Statistic name="neutral" value={neutral} />
      <Statistic name="bad" value={bad} />
    </div>
  )
}

export default App
