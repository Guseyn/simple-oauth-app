
'use strict'

const { AsyncObject } = require('@cuties/cutie')
const JWT = require('./../auth/JWT')

class GeneratedJWTByUser extends AsyncObject {
  constructor (user, exp, secret) {
    super(user, exp, secret)
  }

  syncCall () {
    return (user, exp, secret) => {
      return { jwt: new JWT().valueByUser(user, exp, secret) }
    }
  }
}

module.exports = GeneratedJWTByUser
