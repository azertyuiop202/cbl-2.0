import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Grid, Image, Table } from 'semantic-ui-react';

import { convertListToMap } from '../../utils/cardUtils';
import fetch from '../../utils/fetch';
import getUser from '../../utils/getUser';

export default () => {
  const [allCelebs, setAllCelebs] = useState([]);
  const [allCards, setAllCards] = useState({});

  const celeb = useSelector((state) => state.cards.search.celeb);
  const type = useSelector((state) => state.cards.search.type);
  const make = useSelector((state) => state.cards.search.make);
  const dispatch = useDispatch();
  
  const [links, setLinks] = useState([null]);
  const [owners, setOwners] = useState([null]);

  useEffect(() => {
    fetch(`/api/celebs/list`).then(setAllCelebs);

    fetch(`/api/cards/${getUser().id}`).then((cardsList) => {
      setAllCards(convertListToMap(cardsList));
    });
  }, []);

  useEffect(() => {
    const cards = allCards?.[celeb]?.[type] || null;
    if (cards === null) {
      setLinks([null]);
      return;
    }

    const links = Object.values(cards).map((card) => card.link);
    setLinks(links);
  }, [allCards, celeb, type]);

  useEffect(() => {
    const card = allCards?.[celeb]?.[type]?.[make] || null;
    if (card === null) return;

    let cardId = card.id;
    fetch(`/api/cards/${cardId}/owners`).then((owners) => {
      setOwners(owners.length ? owners : [null]);
    });
  }, [allCards, celeb, type, make]);

  const updateSearch = (field, value) => {
    dispatch({ type: 'UPDATE_SEARCH', payload: { [field]: value } });
  }

  return (
    <>
      <h1>Search</h1>
      <Grid>
        <Grid.Column style={{ width: '400px' }}>
          <Table celled>
            <Table.Header>
              <Table.Row className='border-left border-top border-right'>
                <Table.HeaderCell colSpan='2'>Choose Celeb</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row className='border-left border-right border-bottom green' style={{ height: '50px' }}>
                <Table.Cell style={{ width: '125px' }}>
                  <Dropdown
                    style={{ position: 'absolute', top: `60px`, left: '25px', zIndex: '10' }}
                    value={type}
                    options={ Object.keys(allCards[celeb] || {}).map((type, idx, types) => { return { key: idx, text: type, value: type }; }) }
                    onChange={ (e, { value }) => { updateSearch('type', value); } } />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    search
                    style={{ position: 'absolute', top: `60px`, left: '150px', zIndex: '10' }}
                    value={celeb}
                    options={ allCelebs.map((celeb, idx, celebs) => { return { key: celeb.number, text: celeb.name, value: celeb.number }; }) }
                    onChange={ (e, { value }) => { updateSearch('celeb', value); } } />
                </Table.Cell>
              </Table.Row>
              { links.map((link, idx, links) => {
                let classes = 'border-left border-right';
                if (idx === links.length-1) classes += ' border-bottom';
                return (
                  <Table.Row key={idx} className={classes}>
                    <Table.Cell colSpan='2' className='dark'>
                      { link === null ? '' : 
                        <a href={link} target='_blank'>
                          <Image src={link} style={{ height: '400px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                        </a>
                      }
                    </Table.Cell>
                  </Table.Row>
                )
              }) }
            </Table.Body>
          </Table>
        </Grid.Column>
        <span style={{ width: '100px' }} />
        <Grid.Column style={{ width: '300px' }}>
          <Table celled>
            <Table.Header>
              <Table.Row className='border-left border-top border-right green'>
                <Table.HeaderCell className='sub-header'>
                  If Celeb shows multiple Cards, chose the number below of which Card you wish to see info about and Owners of
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row className='border-left border-right green' style={{ height: '50px' }}>
                <Table.Cell>
                  <Dropdown
                    style={{ position: 'absolute', top: `122px`, left: '140px', zIndex: '10' }}
                    value={make}
                    options={ Object.keys((allCards[celeb] || {})[type] || {}).map((make, idx, makes) => { return { key: idx, text: make, value: make }; }) }
                    onChange={ (e, { value }) => { updateSearch('make', value); } } />
                </Table.Cell>
              </Table.Row>
              { owners.map((owner, idx, owners) => {
                let classes = 'border-left border-right';
                if (idx === owners.length-1) classes += ' border-bottom';
                return (
                  <Table.Row key={idx} className={classes} style={{ height: '30px' }}>
                    <Table.Cell>{owner ? owner.username : ''}</Table.Cell>
                  </Table.Row>
                )
              }) }
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    </>
  );
}