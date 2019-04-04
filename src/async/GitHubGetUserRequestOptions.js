
'use strict'

const { AsyncObject } = require('@cuties/cutie')

class GitHubGetUserRequestOptions extends AsyncObject {
  constructor (githubToken) {
    super(githubToken)
  }

  syncCall () {
    return (githubToken) => {
      return {
         hostname: 'api.github.com',
         port: 443,
         path: `/user?access_token=${githubToken}`,
         method: 'GET',
         headers: {
          'Accept': 'application/json',
          'Authorization': `token ${githubToken}`,
          'User-Agent': 'node.js'
         }
      }
    }
  }
}

module.exports = GitHubGetUserRequestOptions
