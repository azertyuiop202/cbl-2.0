import './App.css';
import './styles/general.css';
import './styles/table.css';
import { Container } from 'semantic-ui-react';

import UserDashboard from './components/UserDashboard/UserDashboard';

export default () => (
  <div style={{ overflow: 'auto', overflowY: 'hidden', paddingBottom: '25px' }}>
    <Container style={{ width: '90%', minWidth: '1500px' }}>
      <h1></h1>
      <UserDashboard />
    </Container>
  </div>
);