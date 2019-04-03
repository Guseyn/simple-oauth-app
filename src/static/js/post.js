function postData(url = '', data, headers, okCallback, errCallback) {
  headers['Content-Type'] = 'application/json'
  return fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
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
