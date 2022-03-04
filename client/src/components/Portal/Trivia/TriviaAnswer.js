import React, { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Input } from 'semantic-ui-react';

import Button from '../UI/Button';
import Link from '../UI/Link';

import fetch from '../../../utils/fetch';

const TriviaAnswer = () => {
  const { day } = useParams();

  const [answer, setAnswer] = useState('Answer');

  const navigate = useNavigate();

  const submitAnswer = () => {
    if (answer === 'Answer' || answer === '') return;

    fetch(`/api/portal/trivia/submit`, 'POST', true, { day, answer });

    navigate('/portal/trivia/confirmation');
  }

  return (
    <>
      <p>{ `What is your answer to ${day === 'Other' ? 'the' : `${day}'s`} trivia?` }</p>
      <Input
        value={answer}
        onChange={ (e) => setAnswer(e.target.value) } />
        
      <Button callback={submitAnswer} text='Submit Answer' />

      <Link url={`/portal/trivia`} text='Back' />
    </>
  );
}

export default TriviaAnswer;