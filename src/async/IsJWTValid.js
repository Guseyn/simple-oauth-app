
'use strict'

const { AsyncObject } = require('@cuties/cutie')
const JWT = require('./../auth/JWT')

class IsJWTValid extends AsyncObject {
  constructor (token, secret) {
    super(token, secret)
  }

  syncCall () {
    return (token, secret) => {
      return new JWT().isValid(token, secret)
    }
  }
}

module.exports = IsJWTValid
