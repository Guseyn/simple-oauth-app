'use strict'

const { AsyncObject } = require('@cuties/cutie')

class DeletedDocument extends AsyncObject {
  constructor (collection, filter, options) {
    super(collection, filter, options || {})
  }

  asyncCall () {
    return (collection, filter, options, callback) => {
      collection.findOneAndDelete(filter, options, callback)
    }
  }
}

module.exports = DeletedDocument
