
'use strict'

const { AsyncObject } = require('@cuties/cutie')
const User = require('./../model/User')

class CreatedUserWithOnlyId extends AsyncObject {
  constructor (id) {
    super(id)
  }

  syncCall () {
    return (id) => {
      return new User(id)
    }
  }
}

module.exports = CreatedUserWithOnlyId
