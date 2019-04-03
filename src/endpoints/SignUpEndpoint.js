'use strict'

const { ResponseWithStatusCode, ResponseWithHeader, ResponseWithHeaders, EndedResponse } = require('@cuties/http')
const { Endpoint, RequestBody } = require('@cuties/rest')
const { ParsedJSON, StringifiedJSON } = require('@cuties/json')
const { StringFromBuffer } = require('@cuties/buffer')
const GeneratedJWTByUser = require('./../async/GeneratedJWTByUser')
const CreatedUser = require('./../async/CreatedUser')
const ExpirationTime = require('./../auth/ExpirationTime')
const Secret = require('./../auth/Secret')

class SignUpEndpoint extends Endpoint {
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
        new GeneratedJWTByUser(
          new CreatedUser(
            new ParsedJSON(
              new StringFromBuffer(
                new RequestBody(
                  request
                )
              )
            ),
          ),
          new ExpirationTime(15),
          new Secret()
        )
      )
    )
  }
}

module.exports = SignUpEndpoint
