import './App.css';
import './styles/general.css';
import './styles/table.css';
import { Container } from 'semantic-ui-react';

import Main from './components/Main';
import Navbar from './components/Navbar';

export default () => (
  <div style={{ paddingBottom: '20px' }}>
    <Container style={{ width: '90%', minWidth: '1500px' }}>
      <Navbar />
      <Main />
    </Container>
  </div>
);