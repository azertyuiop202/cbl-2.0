import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Radio, Table } from 'semantic-ui-react';

import { getHeatmapStyle } from '../../../utils/cardUtils';
import { getCelebNumber } from '../../../utils/celebUtils';
import fetch from '../../../utils/fetch';
import getUser from '../../../utils/getUser';

export default () => {
  const [cards, setCards] = useState([]);
  const [types, setTypes] = useState([]);
  const sort = useSelector((state) => state.cards.heatmapSort);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`/api/cards/${getUser().id}`).then(setCards);
    fetch(`/api/cards/types/all`).then(setTypes);
  }, []);

  const updateSort = (sort) => dispatch({ type: 'UPDATE_SORT_HEATMAP', payload: sort })

  const celebsCards = cards.sort((card1, card2) => {
    const order = sort.order === 'desc' ? -1 : 1;
    if (card1[sort.field] < card2[sort.field]) return -1 * order;
    if (card1[sort.field] > card2[sort.field]) return 1 * order;

    return card1.name > card2.name ? -1 : 1;
  }).reduce(
    (acc, card) => {
      return {
        ...acc,
        [card.name]: { 
          ...(card.name in acc ? acc[card.name] : {}),
          [card.type]: [
            ...(card.name in acc && card.type in acc[card.name] ? acc[card.name][card.type] : []),
            card
          ]
        }
      };
    },
    {}
  );
  
  const haveSig = [];
  const sTypes = ['Base', 'IF', 'SIF', 'XIF'];
  const missingType = sTypes.reduce((acc, type) => { return { ...acc, [type]: [] } }, { S: [] });
  Object.values(celebsCards).forEach((value) => {
    const name = Object.values(value)[0][0].name;

    const missing = [];
    sTypes.forEach((type) => {
      if (!(type in value)) {
        missing.push(type);
      }
    });
    if (missing.length === 1) {
      missingType[missing[0]].push(name);
    } else if (missing.length === 0) {
      if ('S' in value) haveSig.push(name);
      else missingType.S.push(name);
    }
  });
  const rows = Object.values(missingType).reduce( (acc, value) => Math.max(acc, value.length), haveSig.length);

  return (
    <>
      <h1>Heatmap</h1>

      <Grid style={{ width: '3000px' }}>
        <Grid.Column style={{ width: 'fit-content' }}>
          <Table celled style={{ fontSize: '11px' }}>
            <Table.Header>
              <Table.Row className='border-top border-left border-right border-bottom'>
                <Table.HeaderCell>DB No</Table.HeaderCell>
                <Table.HeaderCell>Celeb</Table.HeaderCell>
                { types.map((type, idx, types) => (
                  <Table.HeaderCell key={idx}>{type.id}</Table.HeaderCell>
                )) }
              </Table.Row>
            </Table.Header>

            <Table.Body>
              { Object.keys(celebsCards).map((celebId, idx, list) => {
                let classes = 'border-left border-right';
                if (idx === list.length - 1) classes += ' border-bottom';

                const firstCard = Object.values(celebsCards[celebId])[0][0];

                return (
                  <Table.Row key={idx} className={classes}>
                    <Table.Cell>{ getCelebNumber(firstCard) }</Table.Cell>
                    <Table.Cell style={{ whiteSpace: 'nowrap' }}>{firstCard.name}</Table.Cell>
                    { types.map((type, idx, types) => {
                      const value = (celebsCards[celebId][type.id] || []).reduce((acc, card) => acc + card.amount, 0);
                      return <Table.Cell key={idx} style={ getHeatmapStyle(value) }>{value}</Table.Cell>;
                    } ) }
                  </Table.Row>
                );
              }) }
            </Table.Body>
          </Table>
        </Grid.Column>

        <Grid.Column style={{ width: '310px' }}>
          <Table celled fixed style={{ fontSize: '12px' }}>
            <Table.Header>
              <Table.Row className='border-top border-left border-right border-bottom'>
                <Table.HeaderCell style={{ width: '100%' }}>
                  Choose a sorting option below
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>

          <Table celled fixed style={{ fontSize: '12px' }}>
            <Table.Header>
              {
                [
                  { field: 'number', label: 'Sort by DB Number', order: 'asc' },
                  { field: 'name', label: 'Sort by A-Z', order: 'asc' }
                ].map((value, idx, list) => {
                  let classes = 'border-left border-right';
                  if (idx === 0) classes += ' border-top';
                  if (idx + 1 === list.length) classes += ' border-bottom';

                  return (
                    <Table.Row key={idx} className={classes}>
                      <Table.HeaderCell>{value.label}</Table.HeaderCell>
                      <Table.Cell className='green'>
                        <Radio name='sort'
                          checked={ value.field === sort.field }
                          onChange={ () => updateSort({ field: value.field, order: value.order }) } />
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              }
            </Table.Header>
          </Table>
        </Grid.Column>

        <Grid.Column style={{ width: 'fit-content' }}>
          <Table celled style={{ width: '800px', fontSize: '11px' }}>
            <Table.Header>
              <Table.Row className='border-top border-left border-right border-bottom'>
                <Table.HeaderCell style={{ width: '16%' }}>Have S ({haveSig.length})</Table.HeaderCell>
                <Table.HeaderCell style={{ width: '16%' }}>Due S ({missingType.S.length})</Table.HeaderCell>
                <Table.HeaderCell style={{ width: '16%' }}>Missing just Base ({missingType.Base.length})</Table.HeaderCell>
                <Table.HeaderCell style={{ width: '16%' }}>Missing just IF ({missingType.IF.length})</Table.HeaderCell>
                <Table.HeaderCell style={{ width: '16%' }}>Missing just SIF ({missingType.SIF.length})</Table.HeaderCell>
                <Table.HeaderCell style={{ width: '16%' }}>Missing just XIF ({missingType.XIF.length})</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                Array.from(Array(rows).keys()).map((idx, _, list) => {
                  let classes = 'border-left border-right';
                  if (idx + 1 === list.length) classes += ' border-bottom';

                  return (
                    <Table.Row key={idx} className={classes}>
                      <Table.Cell>{ haveSig[idx] || 'none' }</Table.Cell>
                      <Table.Cell>{ missingType.S[idx] || 'none' }</Table.Cell>
                      <Table.Cell>{ missingType.Base[idx] || 'none' }</Table.Cell>
                      <Table.Cell>{ missingType.IF[idx] || 'none' }</Table.Cell>
                      <Table.Cell>{ missingType.SIF[idx] || 'none' }</Table.Cell>
                      <Table.Cell>{ missingType.XIF[idx] || 'none' }</Table.Cell>
                    </Table.Row>
                  );
                })
              }
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    </>
  );
}