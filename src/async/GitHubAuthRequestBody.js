
'use strict'

const { AsyncObject } = require('@cuties/cutie')

class GitHubAuthRequestBody extends AsyncObject {
  constructor (code) {
    super(code)
  }

  syncCall () {
    return (code) => {
      return {
        client_id: '9740bb12713949b1c23d',
        client_secret: '300c8427a2562a2851e4dc7dbc1e3a7b50328c8c',
        code: code
      }
    }
  }
}

module.exports = GitHubAuthRequestBody
