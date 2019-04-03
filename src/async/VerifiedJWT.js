
'use strict'

const { AsyncObject } = require('@cuties/cutie')
const JWT = require('./../auth/JWT')

class VerifiedJWT extends AsyncObject {
  constructor (token) {
    super(token)
  }

  syncCall () {
    return (token) => {
      return new JWT().verify(token)
    }
  }
}

module.exports = VerifiedJWT
