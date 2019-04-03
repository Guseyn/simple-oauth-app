'use strict'

class ExpirationTime {
  constructor (minutes) {
    this.minutes = minutes
  }

  value() {
    let date = new Date()
    date.setMinutes(date.getMinutes() + this.minutes)
    return date.getTime()
  }
}

module.exports = ExpirationTime
