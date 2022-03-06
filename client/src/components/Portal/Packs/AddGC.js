import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input } from 'semantic-ui-react';

import Link from '../UI/Link';

import Button from '../UI/Button';

const AddGC = () => {
  const pack = useSelector((state) => state.portal.pack);

  const [gc, setGC] = useState(pack.gc || 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = () => {
    if (gc > 5) return;

    dispatch({ type: 'UPDATE_PACK', payload: { gc: parseInt(gc) } });

    navigate('/portal/packs/addBoosters');
  }

  return (
    <>
      <p>
        If you would like to add any Gold Coins to your<br/>
        order, increasing the chances of better cards, enter the<br/>
        amount below.
      </p>

      <p>Note, it is highly inadvisable to spend Gold Coins on Basic packs.</p>

      <br/><br/>

      <p>Adding Gold Coins? (Max of 5)</p>

      <Input value={gc} type='number' min={0} max={5} onChange={ (e) => setGC(e.target.value) } />

      <Button callback={submit} text='Continue' />

      <Link url='/portal' text='Back' />
    </>
  );
}

export default AddGC;