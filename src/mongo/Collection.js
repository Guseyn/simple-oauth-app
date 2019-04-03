'use strict'

const { AsyncObject } = require('@cuties/cutie')

class Collection extends AsyncObject {
  constructor (db, name, options) {
    super(db, name, options || {})
  }

  asyncCall () {
    return (db, name, options, callback) => {
      db.collection(name, options, callback)
    }
  }
}

module.exports = Collection
