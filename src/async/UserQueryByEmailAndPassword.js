
'use strict'

const { AsyncObject } = require('@cuties/cutie')

class UserQueryByEmailAndPassword extends AsyncObject {
  constructor (user) {
    super(user)
  }

  syncCall () {
    return (user) => {
      return user.queryByEmailAndPassword()
    }
  }
}

module.exports = UserQueryByEmailAndPassword
