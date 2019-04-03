
'use strict'

const { AsyncObject } = require('@cuties/cutie')

class UpdatedUserData extends AsyncObject {
  constructor (user) {
    super(user)
  }

  syncCall () {
    return (user) => {
      return user.updatedData()
    }
  }
}

module.exports = UpdatedUserData
