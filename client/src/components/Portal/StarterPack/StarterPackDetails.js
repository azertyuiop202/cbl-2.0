import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Image } from 'semantic-ui-react';
import fetch from '../../../utils/fetch';
import Center from '../UI/Center';

import Link from '../UI/Link';

const StarterPackDetails = () => {
  const { id } = useParams();

  const [pack, setPack] = useState({});

  useEffect(() => {
    fetch(`/api/portal/starterPacks/${id}`).then(setPack);
  }, []);

  const imagesChunks = _.chunk(pack.links, 3);

  return (
    <>
      <h3>{ `${pack.name} Starter Pack` }</h3>

      <Link url='/portal/starterPack' text='Back' />

      <Center>
        <Grid style={{ width: '570px' }}>
          { imagesChunks.map((imagesChunk, idx) => {
            return (
              <Grid.Row key={idx}>
                { imagesChunk.map((imageUrl, idx) => {
                  return (
                    <Grid.Column style={{ width: '200px', padding: '0px', margin: '-10px -5px' }} key={idx}>
                      <Image src={imageUrl} />
                    </Grid.Column>
                  );
                }) }
              </Grid.Row>
            );
          }) }
        </Grid>
      </Center>
    </>
  );
}

export default StarterPackDetails;