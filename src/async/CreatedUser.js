
'use strict'

const { AsyncObject } = require('@cuties/cutie')
const User = require('./../model/User')

class CreatedUser extends AsyncObject {
  constructor (requestBody) {
    super(requestBody)
  }

  syncCall () {
    return (requestBody) => {
      return new User('id', requestBody.name, requestBody.email, requestBody.password)
    }
  }
}

module.exports = CreatedUser
