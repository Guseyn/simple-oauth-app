'use strict'

const crypto = require('crypto')

class JWT {
  constructor () { }
  
  valueByUser (user, exp, secret) {
    let header = {
      alg: 'HS256', typ: 'JWT'
    }
    let payload = user.payload(exp.value())
    let signature = crypto
      .createHmac('sha256', secret.value())
      .update(
        `${this.base64UrlEncode(header)}.${this.base64UrlEncode(payload)}`
      )
      .digest('base64')
    return `${this.base64UrlEncode(header)}.${this.base64UrlEncode(payload)}.${this.escape(signature)}`
  }

  valueByAuthHeader (header) {
    return header.split('Bearer ')[1]
  }

  userId (value) {
    let parts = value.split('.')
    let payload = this.base64UrlDecode(parts[1])
    return payload.sub
  }

  /* Super simple logic */
  verify (value, secret) {
    let parts = value.split('.')
    let header = this.base64UrlDecode(parts[0])
    let payload = this.base64UrlDecode(parts[1])
    let signature = parts[2]
    let exp = payload.exp
    if (exp < new Date().getTime()) {
      return false
    }
    return crypto
      .createHmac('sha256', secret.value())
      .update(
        `${this.base64UrlEncode(header)}.${this.base64UrlEncode(payload)}`
      )
      .digest('base64') === this.unescape(signature)
  }

  base64UrlEncode (json) {
    return this.escape(
      Buffer.from(
        JSON.stringify(json)
      )
      .toString('base64')
    )
  }

  base64UrlDecode (str) {
    return JSON.parse(
      Buffer.from(
        this.unescape(str), 'base64'
      ).toString('utf8')
    )
  }

  escape (str) {
    return str.replace(/\+/g, '-').replace(/\//g, '_')
  }

  unescape (str) {
    return str.replace(/-/g, '+').replace(/_/g, '/')
  } 

  hs256 (str) {
    crypto
      .createHmac('sha256', this.secret.value())
      .update(str)
      .digest('hex')
  }
}

module.exports = JWT
