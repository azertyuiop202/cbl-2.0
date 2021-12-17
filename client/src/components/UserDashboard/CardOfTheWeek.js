import React, { useEffect, useState } from 'react';
import { Image, Table } from 'semantic-ui-react';

const CardOfTheWeek = () => {
  const [card, setCard] = useState([]);

  useEffect(() => {
    fetchCard();
  }, []);

  const fetchCard = () => {
    fetch('/api/cards/cardOfTheWeek').then((res) => res.json()).then(setCard);
  }

  return (
    <>
      <Table celled fixed>
        <Table.Header>
          <Table.Row className='border-top border-left border-right'>
            <Table.HeaderCell>Card of the Week</Table.HeaderCell>
          </Table.Row>
          <Table.Row className='border-top border-left border-right border-bottom'>
            <Table.HeaderCell>
              <a href={card.link} target='_blank'>
                <Image src={card.link} style={{ width: '200px' }} />
              </a>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row className='border-left border-right border-bottom'>
            <Table.Cell>{card.name} {card.type}{card.make > 1 ? `-${card.make}` : ''}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
}

export default CardOfTheWeek;
