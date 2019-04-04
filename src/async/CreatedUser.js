
'use strict'

const { AsyncObject } = require('@cuties/cutie')
const User = require('./../model/User')

class CreatedUser extends AsyncObject {
  constructor (id, data) {
    super(id, data)
  }

  syncCall () {
    return (id, data) => {
      return new User(id, data.name, data.email, data.password || '', data.description || '')
    }
  }
}

module.exports = CreatedUser
