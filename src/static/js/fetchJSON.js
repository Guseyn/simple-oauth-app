function fetchJSON(url = '', method, data, headers, okCallback, errCallback) {
  headers['Content-Type'] = 'application/json'
  headers['Accept'] = 'application/json'
  return fetch(url, {
    method: method,
    headers: headers,
    body: data === null ? null : JSON.stringify(data),
  })
  .then(response => {
    if (response.status !== 200) {
      response.json().then(data => {
        errCallback(data.errMessage)
      })
    } else {
      response.json().then(data => {
        okCallback(data)
      })
    }
  })
}
