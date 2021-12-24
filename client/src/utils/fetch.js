export default (url, method = 'get', authorization = true, body) => {
  const headers = { 'Content-Type': 'application/json' };
  if (authorization) headers['x-auth-token'] = localStorage.getItem('auth_token');
  return fetch(url, {
    method,
    headers,
    body: JSON.stringify(body)
  }).then(res => {
    return res.ok ? res.json() : Promise.reject(res);
  }).catch(Promise.reject.bind(Promise));
}