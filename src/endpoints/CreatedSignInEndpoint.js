
'use strict'

const { AsyncObject } = require('@cuties/cutie')
const SignInEndpoint = require('./SignInEndpoint')

class CreatedSignInEndpoint extends AsyncObject {
  constructor (regexp, type, mongoClient) {
    super(regexp, type, mongoClient)
  }

  syncCall () {
    return (regexp, type, mongoClient) => {
      return new SignInEndpoint(regexp, type, mongoClient)
    }
  }
}

module.exports = CreatedSignInEndpoint
