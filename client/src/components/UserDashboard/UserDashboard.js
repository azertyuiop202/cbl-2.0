import React from 'react';
import { Grid } from 'semantic-ui-react';
import UsefulLinks from './UsefulLinks.js';

import UserGeneralInfo from './UserGeneralInfo.js';

const UserDashboard = () => {
  return (
    <>
      <h1>User Dashboard</h1>
      <Grid centered>
        <Grid.Column style={{ width: '15%' }}>
          <Grid.Row style={{ height: '250px' }}></Grid.Row>
          <Grid.Row><UsefulLinks /></Grid.Row>
        </Grid.Column>
        <Grid.Column style={{ width: '50%' }}>
          <UserGeneralInfo />
        </Grid.Column>
        <Grid.Column style={{ width: '35%' }}>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default UserDashboard;
