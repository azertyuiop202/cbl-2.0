import React from 'react';

import Link from '../UI/Link';

const Instructions = () => {
  return (
    <>
      <p>
        Each week, three database celebrities are chosen at random.<br/>
        You can then exchange Base, IF, SIF and XIF versions<br/>
        of those cards for points.
      </p>

      <p>
        How many points you acquire determines the prize that<br/>
        you receive in exchange.
      </p>

      <p>
        Please note that any prizes that require manual distribution<br/>
        may be delayed during busy periods.
      </p>

      <Link url='/portal/exchange' text='Exchange' />
    </>
  );
}

export default Instructions;