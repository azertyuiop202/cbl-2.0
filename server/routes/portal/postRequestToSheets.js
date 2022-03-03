import axios from 'axios';

import connection from '../../connection.js';

export default (sendData, callback) => {
  const query = `SELECT \`value\` FROM settings WHERE \`key\` = 'sheets_url'`;

  connection.query(query, (err, url) => {
    axios.post(url[0].value, sendData).then(callback);
  });
}