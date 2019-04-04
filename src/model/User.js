'use strict'

const ObjectID = require('mongodb').ObjectID

class User {
  constructor (id, name, email, password, description, signupDate) {
    this._id = id
    this.name = name || 'default name'
    this.email = email || 'default@email'
    this.password = password || 'default password'
    this.description = description || ''
    this.signupDate = signupDate || new Date()
  }

  payload (exp) {
    return {
      sub: this._id,
      exp: exp
    }
  }

  queryById () {
    return {
      _id: new ObjectID(this._id)
    }
  }

  queryByEmail () {
    return {
      email: this.email
    }
  }

  queryByEmailAndPassword () {
    return {
      email: this.email,
      password: this.password
    }
  }

  updatedData () {
    return {
      '$set': {
        name: this.name,
        description: this.description
      }
    }
  }
}

module.exports = User
