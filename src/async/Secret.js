
'use strict'

const { AsyncObject } = require('@cuties/cutie')

class Secret extends AsyncObject {
  constructor () {
    super()
  }

  syncCall () {
    return () => {
      return 'F4D395AA61BEAB63D519AFEA7CDDC'
    }
  }
}

module.exports = Secret
