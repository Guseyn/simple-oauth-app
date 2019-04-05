
'use strict'

const { AsyncObject } = require('@cuties/cutie')
const User = require('./../model/User')

class CreatedUserByDataFromDb extends AsyncObject {
  constructor (data) {
    super(data)
  }

  syncCall () {
    return (data) => {
      return new User(data._id, data.name, data.email, data.password, data.description)
    }
  }
}

module.exports = CreatedUserByDataFromDb
