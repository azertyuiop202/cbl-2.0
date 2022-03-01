import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';

import OrdersList from './OrdersList';
import OrdersSidebar from './OrdersSidebar';

import { getCelebNumber } from '../../../utils/celebUtils';
import fetch from '../../../utils/fetch';
import getUser from '../../../utils/getUser';

export default (props) => {
  const [orders, setOrders] = useState(null);
  const [bonusCelebs, setBonusCelebs] = useState([]);
  const [exchangeCelebs, setExchangeCelebs] = useState([]);

  useEffect(() => {
    fetch(`/api/orders/${getUser().id}`).then(setOrders);
    fetch('/api/celebs/bonus').then(setBonusCelebs);
    fetch('/api/celebs/exchange').then(setExchangeCelebs);
  }, []);

  const bonusCelebPrefixes = bonusCelebs.map((celeb) => getCelebNumber(celeb) + '-A-');
  const exchangeCelebPrefixes = exchangeCelebs.map((celeb) => getCelebNumber(celeb) + '-A-');
  
  return (
    <>
      <h1>Orders</h1>
      <Grid centered>
        <Grid.Column style={{ width: '85%' }}>
          <OrdersList orders={orders} bonusCelebPrefixes={bonusCelebPrefixes} exchangeCelebPrefixes={exchangeCelebPrefixes} />
        </Grid.Column>
        <Grid.Column style={{ width: '15%' }}>
          <OrdersSidebar bonusCelebs={bonusCelebs} exchangeCelebs={exchangeCelebs} />
        </Grid.Column>
      </Grid>
    </>
  );
}