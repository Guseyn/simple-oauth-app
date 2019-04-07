
'use strict'

const { AsyncObject } = require('@cuties/cutie')

class GoogleAuthRequestOptions extends AsyncObject {
  constructor (googleToken) {
    super(googleToken)
  }

  syncCall () {
    return (googleToken) => {
      return {
        hostname: 'www.googleapis.com',
        port: 443,
        path: `/oauth2/v3/tokeninfo?id_token=${googleToken}`,
        method: 'GET'
      }
    }
  }
}

module.exports = GoogleAuthRequestOptions
