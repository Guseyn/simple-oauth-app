'use strict'

class User {
  constructor (id, name, email, password, description = '', signupDate = new Date()) {
    this._id = id
    this.name = name
    this.email = email
    this.password = password
    this.description = description
    this.signupDate = signupDate
  }

  payload (exp) {
    return {
      sub: this._id,
      exp: exp
    }
  }

  queryById () {
    return {
      id: this._id
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
