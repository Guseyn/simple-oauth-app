
'use strict'

const { AsyncObject } = require('@cuties/cutie')
const JWT = require('./../auth/JWT')

class VerifiedJWT extends AsyncObject {
  constructor (token, secret) {
    super(token, secret)
  }

  syncCall () {
    return (token, secret) => {
      return new JWT().verify(token, secret)
    }
  }
}

module.exports = VerifiedJWT
