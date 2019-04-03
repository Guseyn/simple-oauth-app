
'use strict'

const { AsyncObject } = require('@cuties/cutie')
const User = require('./../model/User')

class CreatedUser extends AsyncObject {
  constructor (id, requestBody) {
    super(id, requestBody)
  }

  syncCall () {
    return (id, requestBody) => {
      return new User(id, requestBody.name, requestBody.email, requestBody.password, requestBody.description)
    }
  }
}

module.exports = CreatedUser
