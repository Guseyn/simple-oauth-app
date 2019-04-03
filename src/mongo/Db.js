'use strict'

const { AsyncObject } = require('@cuties/cutie')

class Db extends AsyncObject {
  constructor (client, name, options) {
    super(client, name, options || {})
  }

  syncCall () {
    return (client, name, options) => {
      return client.db(name, options)
    }
  }
}

module.exports = Db
