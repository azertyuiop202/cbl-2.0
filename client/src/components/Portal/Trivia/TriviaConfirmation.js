import React from 'react';

import Link from '../UI/Link';

const TriviaConfirmation = () => {
  return (
    <>
      <p>Your answers have been submitted. Remember that you can check in the Trivia tab in your User Hub if the answer was correct.</p>
      
      <Link url={`/portal/trivia`} text='Submit Different Answer' />

      <Link url={`/portal`} text='Main Menu' />
    </>
  );
}

export default TriviaConfirmation;