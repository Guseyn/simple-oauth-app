'use strict'

const { AsyncObject } = require('@cuties/cutie')

class InsertedDocument extends AsyncObject {
  constructor (collection, doc) {
    super(collection, doc)
  }

  asyncCall () {
    return (collection, doc, callback) => {
      collection.insert(doc, callback)
    }
  }
}

module.exports = InsertedDocument
