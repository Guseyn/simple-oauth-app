
'use strict'

const { AsyncObject } = require('@cuties/cutie')

class JWTResponse extends AsyncObject {
  constructor (token) {
    super(token)
  }

  syncCall () {
    return (token) => {
      return { jwt: token }
    }
  }
}

module.exports = JWTResponse
