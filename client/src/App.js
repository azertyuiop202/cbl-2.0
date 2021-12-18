import './App.css';
import './styles/general.css';
import './styles/table.css';
import { Container } from 'semantic-ui-react';

import Main from './components/Main';
import Navbar from './components/Navbar';

export default () => (
  <div style={{ overflow: 'auto', overflowY: 'hidden', paddingBottom: '20px' }}>
    <Container style={{ width: '90%', minWidth: '1500px' }}>
      <Navbar />
      <Main></Main>
    </Container>
  </div>
);