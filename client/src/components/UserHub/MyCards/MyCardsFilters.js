import React, { useEffect, useState } from 'react';
import { Checkbox, Radio, Table } from 'semantic-ui-react';

import fetch from '../../../utils/fetch';

const MyCardsFilters = (props) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = () => {
    fetch('/api/cards/types').then(setTypes);
  }

  return (
    <>
      <Table celled fixed style={{ fontSize: '12px' }}>
        <Table.Header>
          <Table.Row className='border-top border-left border-right border-bottom'>
            <Table.HeaderCell>Highlight in Trade?</Table.HeaderCell>
            <Table.Cell className='green'><Checkbox/></Table.Cell>
          </Table.Row>
        </Table.Header>
      </Table>

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
              { field: 'amount', label: 'Sort by Quantity', order: 'desc' },
              { field: 'type', label: 'Sort by Type', order: 'desc' },
              { field: 'name', label: 'Sort by A-Z', order: 'asc' },
              { field: 'number', label: 'Sort by DB Number', order: 'asc' },
              { field: 'total', label: 'Sort by Total Stats', order: 'desc' }
            ].map((value, idx, list) => {
              let classes = 'border-left border-right';
              if (idx === 0) classes += ' border-top';
              if (idx + 1 === list.length) classes += ' border-bottom';

              return (
                <Table.Row key={idx} className={classes}>
                  <Table.HeaderCell>{value.label}</Table.HeaderCell>
                  <Table.Cell className='green'>
                    <Radio name='sort'
                      checked={ value.field === props.sort.field }
                      onChange={ () => props.updateSort({ field: value.field, order: value.order }) } />
                  </Table.Cell>
                </Table.Row>
              );
            })
          }
        </Table.Header>
      </Table>
      
      <Table celled fixed style={{ fontSize: '12px' }}>
        <Table.Header>
          {
            [
              { field: 'face', label: 'Sort by Face', order: 'desc' },
              { field: 'chest', label: 'Sort by Chest', order: 'desc' },
              { field: 'legs', label: 'Sort by Legs', order: 'desc' },
              { field: 'rear', label: 'Sort by Rear', order: 'desc' },
              { field: 'ability', label: 'Sort by Ability', order: 'desc' },
              { field: 'desire', label: 'Sort by Desire', order: 'desc' }
            ].map((value, idx, list) => {
              let classes = 'border-left border-right';
              if (idx === 0) classes += ' border-top';
              if (idx + 1 === list.length) classes += ' border-bottom';

              return (
                <Table.Row key={idx} className={classes}>
                  <Table.HeaderCell>{value.label}</Table.HeaderCell>
                  <Table.Cell className='green'>
                    <Radio name='sort'
                      checked={ value.field === props.sort.field }
                      onChange={ () => props.updateSort({ field: value.field, order: value.order }) } />
                  </Table.Cell>
                </Table.Row>
              );
            })
          }
        </Table.Header>
      </Table>
      
      <br/>

      <Table celled fixed style={{ fontSize: '12px' }}>
        <Table.Header>
          <Table.Row className='border-top border-left border-right border-bottom'>
            <Table.HeaderCell className='sub-header' style={{ width: '100%' }}>
              The sorting - and optional filtering - in this tab also determines the order in the Album view tabs.
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
      
      <br/>

      <Table celled fixed style={{ fontSize: '12px' }}>
        <Table.Header>
          <Table.Row className='border-top border-left border-right border-bottom' style={{ height: '10px' }}>
            <Table.HeaderCell style={{ width: '100%' }}>
              Filtering:   Pick card types to hide	
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>

      { types.length ? (
        <Table celled fixed style={{ fontSize: '12px' }}>
          <Table.Header>
            <Table.Row className='border-top border-left border-right'>
              <Table.HeaderCell style={{ paddingTop: '0.1em', paddingBottom: '0em' }}>Show / Hide</Table.HeaderCell>
              <Table.Cell className='green' style={{ paddingTop: '0.4em', paddingBottom: '0em' }}>
                <Radio slider checked={ !props.filter.show } onChange={ () => props.toggleFilter('show/hide') } />
              </Table.Cell>
            </Table.Row>
            {
              types.map((type, idx, types) => {
                let classes = 'border-left border-right';
                if (idx === 0) classes += ' border-top';
                if (idx + 1 === Object.keys(types).length) classes += ' border-bottom';

                return (
                  <Table.Row key={idx} className={classes}>
                    <Table.HeaderCell style={{ paddingTop: '0em', paddingBottom: '0em' }}>{type.id}</Table.HeaderCell>
                    <Table.Cell className='green' style={{ paddingTop: '0em', paddingBottom: '0em' }}>
                      <Checkbox checked={ props.filter.types.includes(type.id) } onChange={ () => props.toggleFilter(type.id) }/>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            }
          </Table.Header>
        </Table>
      ) : null }
    </>
  );
}

export default MyCardsFilters;
