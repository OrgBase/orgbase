
const fetchWrapper = (path, method, data) => {
  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');

  return fetch(path, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify(data)
  });
};

export default fetchWrapper;