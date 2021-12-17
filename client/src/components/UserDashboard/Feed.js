import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';

const Feed = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = () => {
    fetch('/api/info/feed').then((res) => res.json()).then(setFeed);
  }

  return (
    <>
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
    </>
  );
}

export default Feed;
