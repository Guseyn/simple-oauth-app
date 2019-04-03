
'use strict'

const { AsyncObject } = require('@cuties/cutie')
const JWT = require('./../auth/JWT')

class GeneratedJWTByAuthHeader extends AsyncObject {
  constructor (authHeader) {
    super(authHeader)
  }

  syncCall () {
    return (authHeader) => {
      return new JWT().valueByAuthHeader(authHeader)
    }
  }
}

module.exports = GeneratedJWTByAuthHeader
