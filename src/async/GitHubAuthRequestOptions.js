
'use strict'

const { AsyncObject } = require('@cuties/cutie')

class GitHubAuthRequestOptions extends AsyncObject {
  constructor (code) {
    super(code)
  }

  syncCall () {
    return (code) => {
      return {
        hostname: 'github.com',
        port: 443,
        path: `/login/oauth/access_token?client_id=9740bb12713949b1c23d&client_secret=300c8427a2562a2851e4dc7dbc1e3a7b50328c8c&code=${code}`,
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        }
      }
    }
  }
}

module.exports = GitHubAuthRequestOptions
