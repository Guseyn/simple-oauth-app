
'use strict'

const { AsyncObject } = require('@cuties/cutie')

class UserQueryById extends AsyncObject {
  constructor (user) {
    super(user)
  }

  syncCall () {
    return (user) => {
      return user.queryById()
    }
  }
}

module.exports = UserQueryById
