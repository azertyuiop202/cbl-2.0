import React from 'react';
import { Grid } from 'semantic-ui-react';

import BonusCelebs from './BonusCelebs.js';
import CardOfTheWeek from './CardOfTheWeek.js';
import ExchangeCelebs from './ExchangeCelebs.js';
import Feed from './Feed.js';
import UsefulLinks from './UsefulLinks.js';
import UserGeneralInfo from './UserGeneralInfo.js';

const UserDashboard = () => {
  return (
    <>
      <h1>User Dashboard</h1>
      <Grid centered>
        <Grid.Column style={{ width: '15%' }}>
          <Grid.Row style={{ height: '215px' }}></Grid.Row>
          <Grid.Row><UsefulLinks /></Grid.Row>
        </Grid.Column>
        <Grid.Column style={{ width: '50%' }}>
          <Grid.Row style={{ height: '215px' }}><UserGeneralInfo /></Grid.Row>
          <Grid.Row><Feed /></Grid.Row>
        </Grid.Column>
        <Grid.Column style={{ width: '15%' }}>
          <BonusCelebs/>
        </Grid.Column>
        <Grid.Column style={{ width: '15%' }}>
          <Grid.Row><CardOfTheWeek/></Grid.Row><br/>
          <Grid.Row><ExchangeCelebs/></Grid.Row>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default UserDashboard;
