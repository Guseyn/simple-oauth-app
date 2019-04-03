'use strict'

const { as } = require('@cuties/cutie')
const { If, Else } = require('@cuties/if-else')
const { ResponseWithStatusCode, ResponseWithHeader, ResponseWithHeaders, EndedResponse } = require('@cuties/http')
const { Endpoint, RequestBody } = require('@cuties/rest')
const { ParsedJSON, StringifiedJSON } = require('@cuties/json')
const { StringFromBuffer } = require('@cuties/buffer')
const GeneratedJWTByUser = require('./../async/GeneratedJWTByUser')
const CreatedUser = require('./../async/CreatedUser')
const ExpirationTime = require('./../auth/ExpirationTime')
const Secret = require('./../auth/Secret')
const ObjectID = require('mongodb').ObjectID
const Db = require('./../mongo/Db')
const Collection = require('./../mongo/Collection')
const UserQueryByEmail = require('./../async/UserQueryByEmail')
const DoesDocumentExist = require('./../mongo/DoesDocumentExist')
const InsertedDocument = require('./../mongo/InsertedDocument')

class SignUpEndpoint extends Endpoint {
  constructor (regexpUrl, type, mongoClient) {
    super(regexpUrl, type)
    this.mongoClient = mongoClient
  }

  body (request, response) {
    return new CreatedUser(
      new ObjectID(),
      new ParsedJSON(
        new StringFromBuffer(
          new RequestBody(
            request
          )
        )
      )
    ).as('newUser').after(
      new If (
        new DoesDocumentExist(
          new Collection(
            new Db(
              this.mongoClient, 'db'
            ),
            'users'
          ).as('usersCollection'),
          new UserQueryByEmail(
            as('newUser')
          )
        ),
        new EndedResponse(
          new ResponseWithStatusCode(
            new ResponseWithHeader(
              response, 'Content-Type', 'application/json'
            ), 400
          ), new StringifiedJSON({
            errMessage: 'User with specified email already exists'
          })
        ),
        new Else(
          new InsertedDocument(
            as('usersCollection'),
            as('newUser')
          ).after(
            new StringifiedJSON(
              new GeneratedJWTByUser(
                as('newUser'),
                new ExpirationTime(15),
                new Secret()
              )
            ).as('jwt').after(
              new EndedResponse(
                new ResponseWithStatusCode(
                  new ResponseWithHeader(
                    response, 'Content-Type', 'application/json'
                  ), 200
                ), as('jwt')
              )
            )
          )
        )
      )
    )
  }
}

module.exports = SignUpEndpoint
