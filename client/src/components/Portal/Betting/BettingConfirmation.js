import React from 'react';

import Link from '../UI/Link';

const BettingConfirmation = () => {
  return (
    <>
      <p>Your bet has been placed.</p>

      <Link url='/portal/betting' text='Place Another Bet' />

      <Link url='/portal' text='Main menu' />
    </>
  );
}

export default BettingConfirmation;