
'use strict'

const { AsyncObject } = require('@cuties/cutie')
const GoogleAuthEndpoint = require('./GoogleAuthEndpoint')

class CreatedGoogleAuthEndpoint extends AsyncObject {
  constructor (regexp, type, mongoClient) {
    super(regexp, type, mongoClient)
  }

  syncCall () {
    return (regexp, type, mongoClient) => {
      return new GoogleAuthEndpoint(regexp, type, mongoClient)
    }
  }
}

module.exports = CreatedGoogleAuthEndpoint
