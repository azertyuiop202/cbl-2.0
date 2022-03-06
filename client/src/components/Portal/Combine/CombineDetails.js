import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Dropdown, Input, Message } from 'semantic-ui-react';

import Button from '../UI/Button';
import Link from '../UI/Link';
import Text from '../UI/Text';

import fetch from '../../../utils/fetch';

const CombineDetails = () => {
  const { id } = useParams();

  const [combineDetails, setCombineDetails] = useState(null);
  const [postData, setPostData] = useState({});
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/portal/combine/options/${id}`).then((combineDetails) => {
      setCombineDetails(combineDetails);

      const postData = { pack: combineDetails.pack, Booster: combineDetails.Booster };
      for (let detail of combineDetails.details) {
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

  const submitCombine = () => {
    const isValid = validateForm();
    if (!isValid) return;

    fetch(`/api/portal/combine/submit`, 'POST', true, postData).then();
    
    navigate('/portal');
  }

  const validateForm = () => {
    for (let detail of combineDetails.details) {
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

  return !combineDetails ? null : (
    <>
      <Text>{combineDetails.description}</Text>
      <br/>

      { combineDetails.details.map((detail, idx) => {
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
            <Text>{detail.text}</Text>
            { input }
            <br/>
          </div>
        );
      }) }

      { !error ? null : <Message negative><Message.Header>{error}</Message.Header></Message> }

      <Button text='Continue' callback={submitCombine} />

      <Link url='/portal/combine' text='Back' />
    </>
  );
}

export default CombineDetails;