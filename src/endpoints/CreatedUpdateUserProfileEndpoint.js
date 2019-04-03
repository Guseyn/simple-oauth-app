
'use strict'

const { AsyncObject } = require('@cuties/cutie')
const UpdateUserProfileEndpoint = require('./UpdateUserProfileEndpoint')

class CreatedUpdateUserProfileEndpoint extends AsyncObject {
  constructor (regexp, type, mongoClient) {
    super(regexp, type, mongoClient)
  }

  syncCall () {
    return (regexp, type, mongoClient) => {
      return new UpdateUserProfileEndpoint(regexp, type, mongoClient)
    }
  }
}

module.exports = CreatedUpdateUserProfileEndpoint
