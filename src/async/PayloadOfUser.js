
'use strict'

const { AsyncObject } = require('@cuties/cutie')

class PayloadOfUser extends AsyncObject {
  constructor (user) {
    super(user)
  }

  syncCall () {
    return (user) => {
      return user.payload()
    }
  }
}

module.exports = PayloadOfUser
