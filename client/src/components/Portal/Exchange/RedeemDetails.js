import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Dropdown, Input, Message } from 'semantic-ui-react';

import Button from '../UI/Button';
import Link from '../UI/Link';

import fetch from '../../../utils/fetch';

const RedeemDetails = () => {
  const { id } = useParams();

  const [redeemDetails, setRedeemDetails] = useState(null);
  const [postData, setPostData] = useState({});
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/portal/exchange/redeemRates/${id}/details`).then((redeemDetails) => {
      setRedeemDetails(redeemDetails);

      const postData = { xp: redeemDetails['xp'], name: redeemDetails['name'] };
      for (let detail of redeemDetails.details) {
        switch (detail.options_type) {
          case 'List':
            postData[detail.value] = detail.options.split(', ')[0];
            break;
          case 'Text':
            postData[detail.value] = 'default';
            break;
        }
      }
      setPostData(postData);
    });
  }, []);

  const updatePostData = (key, value) => {
    setPostData({ ...postData, [key]: value });
  }

  const submitredeem = () => {
    const isValid = validateForm();
    if (!isValid) return;

    fetch(`/api/portal/exchange/submitRedeem`, 'POST', true, postData).then();
      
    navigate(`/portal/exchange/redeemConfirmation/${id}`);
  }

  const validateForm = () => {
    for (let detail of redeemDetails.details) {
      const value = (postData[detail.value] || '');
      switch (detail.options_type) {
        case 'DB_Number':
          if (value.length !== 3 || value === '000') {
            setError('A DB Number needs to consist of 3 numbers');
            return false;
          }
          break;
        case 'Text':
          if (value.length === 0) {
            setError('Please enter a value in the text field');
            return false;
          }
      }
    }

    return true;
  }

  return !redeemDetails ? null : (
    <>
      <p>{redeemDetails.description}</p>
      <br/>

      { redeemDetails.details.map((detail, idx) => {
        let input = null;
        switch (detail.options_type) {
          case 'DB_Number':
          case 'Text':
            input = (<>
              <Input
                value={ postData[detail.value] || (detail.options_type === 'DB_Number' ? '000' : 'default') }
                onChange={ (e) => updatePostData(detail.value, e.target.value) } />
              <br/><br/>
            </>);
            break;
          case 'List':
            const options = detail.options.split(', ');
            input = (<>
              <Dropdown
                value={ postData[detail.value] || options[0] }
                selection
                options={ options.map((option, idx, options) => { return { key: idx, text: option, value: option }; }) }
                onChange={ (e, { value }) => { updatePostData(detail.value, value); } } />
              <br/><br/>
            </>);
            break;
        }

        return (
          <div key={idx}>
            <p>{detail.text}</p>
            { input }
            <br/>
          </div>
        );
      }) }

      { !error ? null : <Message negative><Message.Header>{error}</Message.Header></Message> }

      <Button text='Continue' callback={submitredeem} />

      <Link url='/portal/redeem' text='Back' />
    </>
  );
}

export default RedeemDetails;