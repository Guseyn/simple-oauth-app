
'use strict'

const { AsyncObject } = require('@cuties/cutie')
const UserProfileEndpoint = require('./UserProfileEndpoint')

class CreatedUserProfileEndpoint extends AsyncObject {
  constructor (regexp, type, mongoClient) {
    super(regexp, type, mongoClient)
  }

  syncCall () {
    return (regexp, type, mongoClient) => {
      return new UserProfileEndpoint(regexp, type, mongoClient)
    }
  }
}

module.exports = CreatedUserProfileEndpoint
