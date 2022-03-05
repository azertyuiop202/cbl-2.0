import React from 'react';

import Link from '../UI/Link';

const SlotsConfirmation = () => {
  return (
    <>
      <p>You have cashed in your prizes.</p>

      <p>
        A Mod/Volunteer will distribute it when they are able.<br/>
        There may be a delay during busy periods.
      </p>

      <Link url='/portal' text='Main Menu' />
    </>
  );
}

export default SlotsConfirmation;