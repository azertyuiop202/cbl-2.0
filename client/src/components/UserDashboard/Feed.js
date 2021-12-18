import React, { useEffect, useState } from 'react';
import { Image, Table } from 'semantic-ui-react';

import BreakingNewsImage from '../../assets/images/Breaking_News.png';

const Feed = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = () => {
    fetch('/api/info/feed').then((res) => res.json()).then(setFeed);
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Image
        src={BreakingNewsImage}
        className='center-image'
        style={{ width: '350px', marginBottom: '-50px', border: '5px solid black' }} />
      <Table celled fixed>
        <Table.Header>
          <Table.Row className='border-top border-left border-right'>
            <Table.HeaderCell>Breaking News</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { feed.map((news, idx, feed) => {
            let classes = 'border-left border-right';
            if (idx + 1 === feed.length) classes += ' border-bottom';

            return (
              <Table.Row key={news.index} className={classes}>
                <Table.Cell>{news.text}</Table.Cell>
              </Table.Row>
            );
          }) }
        </Table.Body>
      </Table>
    </div>
  );
}

export default Feed;
