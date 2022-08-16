import { useState, useEffect } from 'react';
import FeedbackOptions from './components/FeedbackOptions';
import Notification from './components/Notification';
import { Body } from 'components/common/body';
import Section from 'components/Section';
import Statistics from 'components/Statistics';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [positivePercentage, setPositivePercentage] = useState(0);

  const handleGood = () => {
    setGood(prevState => prevState + 1);
  };
  const handleNeutral = () => {
    setNeutral(prevState => prevState + 1);
  };

  const handleBad = () => {
    setBad(prevState => prevState + 1);
  };

  useEffect(() => {
    setTotal(good + neutral + bad);
  }, [good, neutral, bad]);

  useEffect(() => {
    setPositivePercentage((good / total) * 100);
  }, [total, good]);

  return (
    <Body>
      <Section title="Please leave feedback">
        <FeedbackOptions
          onGood={handleGood}
          onNeutral={handleNeutral}
          onBad={handleBad}
        />
      </Section>

      <Section title={'Statistics'}>
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="No feedback given" />
        )}
      </Section>
    </Body>
  );
}
