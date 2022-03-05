import React from 'react';

import Link from '../UI/Link';
import Title from '../UI/Title';

const Trivia = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Other'];

  return (
    <>
      <Title>Daily Trivia</Title>

      { days.map((day, idx, days) => <Link key={idx} url={`/portal/trivia/${day}`} text={day} />) }

      <br/>

      <Link url={`/portal`} text='Main Menu' />
    </>
  );
}

export default Trivia;