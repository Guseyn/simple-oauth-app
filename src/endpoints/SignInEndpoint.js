'use strict'

const { ResponseWithStatusCode, ResponseWithHeader, ResponseWithHeaders, EndedResponse } = require('@cuties/http')
const { Endpoint, RequestBody } = require('@cuties/rest')
const { ParsedJSON, StringifiedJSON } = require('@cuties/json')
const { StringFromBuffer } = require('@cuties/buffer')

class SignInEndpoint extends Endpoint {
  constructor (regexpUrl, type) {
    super(regexpUrl, type)
  }

  body (request, response) {
    return new EndedResponse(
      new ResponseWithStatusCode(
        new ResponseWithHeader(
          response, 'Content-Type', 'application/json'
        ), 200
      ),
      new StringifiedJSON(
        new ParsedJSON(
          new StringFromBuffer(
            new RequestBody(
              request
            )
          )
        )
      )
    )
  }
}

module.exports = SignInEndpoint
