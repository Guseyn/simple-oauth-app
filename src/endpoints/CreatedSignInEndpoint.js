
'use strict'

const { AsyncObject } = require('@cuties/cutie')
const SignInEndpoint = require('./SignInEndpoint')

class CreatedSignInEndpoint extends AsyncObject {
  constructor (regexp, type) {
    super(regexp, type)
  }

  syncCall () {
    return (regexp, type) => {
      return new SignInEndpoint(regexp, type)
    }
  }
}

module.exports = CreatedSignInEndpoint
