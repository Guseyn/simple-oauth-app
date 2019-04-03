
'use strict'

const { AsyncObject } = require('@cuties/cutie')
const SignUpEndpoint = require('./SignUpEndpoint')

class CreatedSignUpEndpoint extends AsyncObject {
  constructor (regexp, type) {
    super(regexp, type)
  }

  syncCall () {
    return (regexp, type) => {
      return new SignUpEndpoint(regexp, type)
    }
  }
}

module.exports = CreatedSignUpEndpoint
