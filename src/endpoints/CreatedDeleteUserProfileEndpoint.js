
'use strict'

const { AsyncObject } = require('@cuties/cutie')
const DeleteUserProfileEndpoint = require('./DeleteUserProfileEndpoint')

class CreatedDeleteUserProfileEndpoint extends AsyncObject {
  constructor (regexp, type, mongoClient) {
    super(regexp, type, mongoClient)
  }

  syncCall () {
    return (regexp, type, mongoClient) => {
      return new DeleteUserProfileEndpoint(regexp, type, mongoClient)
    }
  }
}

module.exports = CreatedDeleteUserProfileEndpoint
