
'use strict'

const { AsyncObject } = require('@cuties/cutie')

class UserQueryByEmail extends AsyncObject {
  constructor (user) {
    super(user)
  }

  syncCall () {
    return (user) => {
      return user.queryByEmail()
    }
  }
}

module.exports = UserQueryByEmail
