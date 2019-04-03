'use strict'

const { AsyncObject } = require('@cuties/cutie')
const MongoClient = require('mongodb').MongoClient

class ConnectedMongoClient extends AsyncObject {
  constructor (url) {
    super(url)
  }

  asyncCall () {
    return (url, callback) => {
      this.client = new MongoClient(url, { useNewUrlParser: true })
      this.client.connect(callback)
    }
  }

  onResult () {
    return this.client
  }
}

module.exports = ConnectedMongoClient
