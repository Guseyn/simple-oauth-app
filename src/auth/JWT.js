'use strict'

const crypto = require('crypto')

class JWT {
  constructor () { }
  
  valueByUser (user, exp, secret) {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    }
    const payload = user.payload(exp.value())
    const encodedHeaderInBase64 = this.base64UrlEncode(header)
    const encodedPayloadInBase64 = this.base64UrlEncode(payload)
    const encodedSignatureInBase64 = this.generateSignature(
      `${encodedHeaderInBase64}.${encodedPayloadInBase64}`, secret.value()
    )
    return `${encodedHeaderInBase64}.${encodedPayloadInBase64}.${encodedSignatureInBase64}`
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
  isValid (value, secret) {
    const parts = value.split('.')
    const header = this.base64UrlDecode(parts[0])
    const payload = this.base64UrlDecode(parts[1])
    const signature = parts[2]
    const exp = payload.exp
    if (exp < new Date().getTime()) {
      return false
    }
    return this.generateSignature(`${parts[0]}.${parts[1]}`, secret.value()) === signature
  }

  base64UrlEncode (json) {
    return Buffer.from(
      JSON.stringify(json)
    ).toString('base64')
     .replace(/\+/g, '-')
     .replace(/\//g, '_')
  }

  base64UrlDecode (str) {
    return JSON.parse(
      Buffer.from(
        str.replace(/-/g, '+').replace(/_/g, '/'), 'base64'
      ).toString('utf8')
    )
  }

  generateSignature (str, secret) {
    return crypto
      .createHmac('sha256', secret)
      .update(str)
      .digest('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
  }
}

module.exports = JWT
