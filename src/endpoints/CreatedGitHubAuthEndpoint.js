
'use strict'

const { AsyncObject } = require('@cuties/cutie')
const GitHubAuthEndpoint = require('./GitHubAuthEndpoint')

class CreatedGitHubAuthEndpoint extends AsyncObject {
  constructor (regexp, type, mongoClient) {
    super(regexp, type, mongoClient)
  }

  syncCall () {
    return (regexp, type, mongoClient) => {
      return new GitHubAuthEndpoint(regexp, type, mongoClient)
    }
  }
}

module.exports = CreatedGitHubAuthEndpoint
