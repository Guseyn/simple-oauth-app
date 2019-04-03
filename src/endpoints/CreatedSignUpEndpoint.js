
'use strict'

const { AsyncObject } = require('@cuties/cutie')
const SignUpEndpoint = require('./SignUpEndpoint')

class CreatedSignUpEndpoint extends AsyncObject {
  constructor (regexp, type, mongoClient) {
    super(regexp, type, mongoClient)
  }

  syncCall () {
    return (regexp, type, mongoClient) => {
      return new SignUpEndpoint(regexp, type, mongoClient)
    }
  }
}

module.exports = CreatedSignUpEndpoint
