'use strict'

const { AsyncObject } = require('@cuties/cutie')

class UpdatedDocument extends AsyncObject {
  constructor (collection, filter, update, options) {
    super(collection, filter, update, options || {})
  }

  asyncCall () {
    return (collection, filter, update, options, callback) => {
      collection.findOneAndUpdate(filter, update, options, callback)
    }
  }
}

module.exports = UpdatedDocument
