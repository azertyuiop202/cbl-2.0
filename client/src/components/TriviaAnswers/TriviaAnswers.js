import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Dropdown, Grid, Table } from 'semantic-ui-react';

import { formatDate } from '../../utils/datetime';
import fetch from '../../utils/fetch';
import getUser from '../../utils/getUser';

const TriviaAnswers = () => {
  const triviaDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Other'];

  const [answers, setAnswers] = useState([]);
  const [triviaPayouts, setTriviaPayouts] = useState([]);
  const currentDay = useSelector((state) => state.triviaAnswers.day);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`/api/triviaAnswers/${getUser().id}`).then(setAnswers);
    fetch(`/api/triviaAnswers/${getUser().id}/payouts`).then(setTriviaPayouts);
  }, []);

  const payouts = triviaPayouts.reduce((acc, payout) => { return { ...acc, [payout.day]: payout } }, {});

  return (
    <>
      <h1>Trivia Answers</h1>
      <Grid centered>
        <Grid.Column style={{ width: '45%' }}>
          <Table celled fixed>
            <Table.Header>
              <Table.Row className='border-top border-left border-right border-bottom'>
                <Table.HeaderCell style={{ width: '50px' }}>Date  Submitted</Table.HeaderCell>
                <Table.HeaderCell style={{ width: '40px' }}>Trivia Day</Table.HeaderCell>
                <Table.HeaderCell style={{ width: '120px' }}>Submitted Answer</Table.HeaderCell>
                <Table.HeaderCell style={{ width: '35px' }}>Correct?</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              { Array.from(Array(13).keys()).map((idx, _, array) => {
                let classes = 'border-left border-right';
                if (idx + 1 === array.length) classes += ' border-bottom';

                const answer = answers.length <= idx ? null : answers[idx];
                
                if (answer) {
                  if (answer.correct) classes += ' trivia-correct';
                  else classes += ' trivia-incorrect';
                }

                return (
                  <Table.Row key={idx} className={classes}>
                    <Table.Cell>{ formatDate(answer?.datetime || '') }</Table.Cell>
                    <Table.Cell>{answer?.day || ''}</Table.Cell>
                    <Table.Cell>{answer?.answer || ''}</Table.Cell>
                    <Table.Cell><Checkbox checked={(answer?.correct || false) == 1} /></Table.Cell>
                  </Table.Row>
                );
              }) }
            </Table.Body>
          </Table>
        </Grid.Column>
        
        <Grid.Column style={{ width: '35%' }}>
          <Table celled fixed>
            <Table.Header>
              <Table.Row className='border-top border-left border-right border-bottom'>
                <Table.HeaderCell style={{ width: '35%', height: '65px' }}>Show Day</Table.HeaderCell>
                <Table.Cell className='green'>
                  <Dropdown
                    style={{ position: 'absolute', top: '40px', left: '380px', zIndex: '10' }}
                    value={currentDay}
                    options={ triviaDays.map((day, idx, days) => { return { key: idx, text: day, value: day }; }) }
                    onChange={ (e, { value }) => {
                      dispatch({ type: 'UPDATE_TRIVIA_DAY', payload: value });
                    } } />
                </Table.Cell>
              </Table.Row>
            </Table.Header>
          </Table>
          
          <Table celled fixed>
            <Table.Header>
              <Table.Row className='border-top'>
                <Table.HeaderCell className='border-left border-bottom border-right' style={{ width: '35%' }} rowSpan='2'>Trivia Day</Table.HeaderCell>
                <Table.HeaderCell className='border-bottom' style={{ width: '35%', height: '65px' }} colSpan='2'>Your reward (already paid out to you)</Table.HeaderCell>
                <Table.HeaderCell className='border-right border-bottom border-left' style={{ width: '30%'}} rowSpan='2'>Trivia fully paid out to everyone?</Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell className='border-bottom' >tokens</Table.HeaderCell>
                <Table.HeaderCell className='border-bottom' >GC</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              { triviaDays.map((day, idx, days) => {
                let classes = 'border-left border-right';
                if (idx + 1 === days.length) classes += ' border-bottom';

                let currencyCells = null;
                if (day in payouts) {
                  currencyCells = (<>
                    <Table.Cell>{payouts[day].tokens}</Table.Cell>
                    <Table.Cell>{payouts[day].gc}</Table.Cell>
                    </>);
                } else {
                  currencyCells = <Table.Cell colSpan='2'>no answer or not processed</Table.Cell>
                }

                return (
                  <Table.Row className={classes} key={idx}>
                    <Table.Cell>{day}</Table.Cell>
                    {currencyCells}
                    <Table.Cell>
                      <Checkbox checked={payouts[day]?.fullyPaidOut || false} />
                    </Table.Cell>
                  </Table.Row>
                );
              }) }
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column style={{ width: '20%' }}>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default TriviaAnswers;
