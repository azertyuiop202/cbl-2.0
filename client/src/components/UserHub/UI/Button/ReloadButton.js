import { Button } from 'semantic-ui-react';

export default (props) => (
  <Button color='green' style={{ borderRadius: '1em' }} onClick={props.onClick}>
    <Button.Content style={{ color: 'black' }}>
      Reload
    </Button.Content>
  </Button>
);