'use strict'

const { AsyncObject } = require('@cuties/cutie')

class UpdatedDocument extends AsyncObject {
  constructor (collection, filter, update, options) {
    super(collection, filter, update, options || {})
  }

  asyncCall () {
    return (collection, filter, update, options) => {
      collection.findOneAndUpdate(filter, update, options)
    }
  }
}

module.exports = UpdatedDocument
