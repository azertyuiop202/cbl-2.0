import _ from 'lodash';
import React from 'react';
import { Image, Table } from 'semantic-ui-react';

export default (props) => {
  if (!props.cards?.length) {
    return (
      <Table celled>
        <Table.Body>
          { [1].map((row, idx, cards) => {
            let [classes1, classes2] = Array(2).fill('border-left border-right');
            if (idx === 0) classes1 += ' border-top';
            if (idx + 1 === cards.length) {
              if (props.showAmount) classes2 += ' border-bottom';
              else classes1 += ' border-bottom';
            }

            return (
              <React.Fragment key={idx}>
                <Table.Row key={idx*2} className={classes1} style={{ height: props.rowHeight }}>
                  { Array.from(Array(props.chunksLength).keys()).map((idx2) => (
                    <Table.Cell key={idx2} className='dark' style={{ width: props.cellWidth}}></Table.Cell>
                  )) }
                </Table.Row>

                { props.showAmount && (
                  <Table.Row key={idx*2+1} className={classes2}>
                    { Array.from(Array(props.chunksLength).keys()).map((idx2) => (
                      <Table.Cell key={idx2} className='dark'></Table.Cell>
                    )) }
                  </Table.Row>
                ) }
              </React.Fragment>
            );
          }) }
        </Table.Body>
      </Table>
    );
  }

  const cardsChunks = _.chunk(props.cards, props.chunksLength);

  return (
    <Table celled>
      <Table.Body>
        { (cardsChunks || []).map((row, idx, cards) => {
          let [classes1, classes2] = Array(2).fill('border-left border-right');
          if (idx === 0) classes1 += ' border-top';
          if (idx + 1 === cards.length) {
            if (props.showAmount) classes2 += ' border-bottom';
            else classes1 += ' border-bottom';
          }

          return (
            <React.Fragment key={idx}>
              <Table.Row key={idx*2} className={classes1} style={{ height: props.rowHeight }}>
                { row.map((card, idx2, row) => (
                  <Table.Cell key={idx2} className='dark' style={{ width: props.cellWidth }}>
                    <a href={card.link} target='_blank'>
                      <Image src={card.link} style={{ width: props.imageWidth }} />
                    </a>
                  </Table.Cell>
                )) }
                { row.length === props.chunksLength ? null : (
                  Array.from(Array(props.chunksLength - row.length).keys()).map((idx2) => (
                    <Table.Cell key={props.chunksLength+idx2} className='dark' style={{ width: props.cellWidth}}></Table.Cell>
                  ))
                ) }
              </Table.Row>

              { props.showAmount && (
                <Table.Row key={idx*2+1} className={classes2}>
                  { row.map((card, idx2, row) => (
                    <Table.Cell key={idx2} className='dark'>
                      {card.amount || 0}
                    </Table.Cell>
                  )) }
                  { row.length === props.chunksLength ? null : (
                    Array.from(Array(props.chunksLength - row.length).keys()).map((idx2) => (
                      <Table.Cell key={props.chunksLength+idx2} className='dark'></Table.Cell>
                    ))
                  ) }
                </Table.Row>
              ) }
            </React.Fragment>
          );
        }) }
      </Table.Body>
    </Table>
  );
}