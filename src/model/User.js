'use strict'

class User {
  constructor (id, name, email, password, description = '', signupDate = new Date()) {
    this.id = id
    this.name = name
    this.email = email
    this.password
    this.description = description
    this.signupDate = signupDate
  }

  payload (exp) {
    return {
      sub: this.id,
      exp: exp
    }
  }

  queryById () {
    return {
      id: this.id
    }
  }

  queryByEmail () {
    return {
      email: this.email
    }
  }

  updatedData (name, email, description) {
    return {
      id: this.id,
      name: name,
      email: email,
      password: this.password,
      description: description,
      signupDate: this.signupDate
    }
  }
}

module.exports = User
