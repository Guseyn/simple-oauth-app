'use strict'

const { AsyncObject } = require('@cuties/cutie')

class FoundDocument extends AsyncObject {
  constructor (collection, query, options) {
    super(collection, query, options || {})
  }

  asyncCall () {
    return (ollection, query, options, callback) => {
      collection.findOne(query, options, callback)
    }
  }
}

module.exports = FoundDocument
