
'use strict'

const { AsyncObject } = require('@cuties/cutie')
const JWT = require('./../auth/JWT')

class UserIdByJWT extends AsyncObject {
  constructor (value) {
    super(value)
  }

  syncCall () {
    return (value) => {
      return new JWT().userId(value)
    }
  }
}

module.exports = UserIdByJWT
