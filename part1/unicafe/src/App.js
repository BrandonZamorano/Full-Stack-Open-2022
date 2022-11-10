import { useState } from 'react'

const Heading = ({ text }) => <h1>{text}</h1>;
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);
const Statistics = ({ data }) => {
  if ((data[0].value + data[1].value + data[2].value) === 0) {
    return <p>No feedback given</p>
  }
  return (
    <table>
      <tbody>
        <StatisticLine text={data[0].title} value={data[0].value} />
        <StatisticLine text={data[1].title} value={data[1].value} />
        <StatisticLine text={data[2].title} value={data[2].value} />
        <StatisticLine text={data[3].title} value={data[3].value} />
        <StatisticLine text={data[4].title} value={data[4].value} />
        <StatisticLine text={data[5].title} value={data[5].value} />
      </tbody>
    </table>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const totalFeedback = good + neutral + bad;
  const feedbackScore = good - bad;

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
      <Statistics data={[
        {
          title: "good",
          value: good
        }, {
          title: "neutral",
          value: neutral
        },
        {
          title: "bad",
          value: bad
        },
        {
          title: "all",
          value: totalFeedback
        },
        {
          title: "average",
          value: feedbackScore / totalFeedback
        }, 
        {
          title: "positive",
          value: good / totalFeedback * 100 + " %"
        }
      ]} />
    </div>
  )
}

export default App
