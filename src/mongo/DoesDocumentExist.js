'use strict'

const { AsyncObject } = require('@cuties/cutie')

class DoesDocumentExist extends AsyncObject {
  constructor (collection, query, options) {
    super(collection, query, options || {})
  }

  asyncCall () {
    return (collection, query, options, callback) => {
      collection.findOne(query, options, callback)
    }
  }

  onResult (result) {
    return result != null
  }
}

module.exports = DoesDocumentExist
