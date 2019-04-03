'use strict'

const { as } = require('@cuties/cutie')
const { If, Else } = require('@cuties/if-else')
const { ResponseWithStatusCode, ResponseWithHeader, ResponseWithHeaders, EndedResponse, HeadersOfIncomingMessage } = require('@cuties/http')
const { Value } = require('@cuties/object')
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
const UserQueryById = require('./../async/UserQueryById')
const UpdatedDocument = require('./../mongo/UpdatedDocument')
const GeneratedJWTByAuthHeader = require('./../async/GeneratedJWTByAuthHeader')
const UserIdByJWT = require('./../async/UserIdByJWT')
const VerifiedJWT = require('./../async/VerifiedJWT')
const DoesDocumentExist = require('./../mongo/DoesDocumentExist')
const UpdatedUserData = require('./../async/UpdatedUserData')

class UpdateUserProfileEndpoint extends Endpoint {
  constructor (regexpUrl, type, mongoClient) {
    super(regexpUrl, type)
    this.mongoClient = mongoClient
  }

  body (request, response) {
    return new If(
      new VerifiedJWT(
        new GeneratedJWTByAuthHeader(
          new Value(
            new HeadersOfIncomingMessage(request),
            'authorization'
          )
        ).as('jwt'),
        new Secret()
      ),
      new CreatedUser(
        new UserIdByJWT(
          as('jwt')
        ),
        new ParsedJSON(
          new StringFromBuffer(
            new RequestBody(request)
          )
        )
      ).as('user').after(
        new EndedResponse(
          new ResponseWithStatusCode(
            new ResponseWithHeader(
              response, 'Content-Type', 'application/json'
            ), 200
          ),
          new StringifiedJSON(
            new Value(
              new UpdatedDocument(
                new Collection(
                  new Db(this.mongoClient, 'db'),
                  'users'
                ),
                new UserQueryById(
                  as('user')
                ),
                new UpdatedUserData(
                  as('user')
                ),
                {
                  projection: { 
                    _id: 1,
                    name: 1,
                    email: 1,
                    description: 1,
                    signupDate: 1
                  },
                  returnOriginal: false
                }
              ),
              'value'
            )
          )
        )
      ),
      new Else(
        new EndedResponse(
          new ResponseWithStatusCode(
            new ResponseWithHeader(
              response, 'Content-Type', 'application/json'
            ), 401
          ),
          new StringifiedJSON({
            errMessage: 'JWT has expired'
          })
        )
      )
    )
  }
}

module.exports = UpdateUserProfileEndpoint
