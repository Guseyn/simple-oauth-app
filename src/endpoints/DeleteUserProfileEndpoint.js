'use strict'

const { as } = require('@cuties/cutie')
const { If, Else } = require('@cuties/if-else')
const { ResponseWithStatusCode, ResponseWithHeader, ResponseWithHeaders, EndedResponse, HeadersOfIncomingMessage } = require('@cuties/http')
const { Value } = require('@cuties/object')
const { Endpoint, RequestBody } = require('@cuties/rest')
const { ParsedJSON, StringifiedJSON } = require('@cuties/json')
const { StringFromBuffer } = require('@cuties/buffer')
const GeneratedJWTByUser = require('./../async/GeneratedJWTByUser')
const CreatedUserWithOnlyId = require('./../async/CreatedUserWithOnlyId')
const ExpirationTime = require('./../auth/ExpirationTime')
const Secret = require('./../auth/Secret')
const ObjectID = require('mongodb').ObjectID
const Db = require('./../mongo/Db')
const Collection = require('./../mongo/Collection')
const UserQueryById = require('./../async/UserQueryById')
const DeletedDocument = require('./../mongo/DeletedDocument')
const GeneratedJWTByAuthHeader = require('./../async/GeneratedJWTByAuthHeader')
const UserIdByJWT = require('./../async/UserIdByJWT')
const IsJWTValid = require('./../async/IsJWTValid')
const UpdatedUserData = require('./../async/UpdatedUserData')

class DeleteUserProfileEndpoint extends Endpoint {
  constructor (regexpUrl, type, mongoClient) {
    super(regexpUrl, type)
    this.mongoClient = mongoClient
  }

  body (request, response) {
    return new If(
      new IsJWTValid(
        new GeneratedJWTByAuthHeader(
          new Value(
            new HeadersOfIncomingMessage(request),
            'authorization'
          )
        ).as('jwt'),
        new Secret()
      ),
      new CreatedUserWithOnlyId(
        new UserIdByJWT(
          as('jwt')
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
              new DeletedDocument(
                new Collection(
                  new Db(this.mongoClient, 'db'),
                  'users'
                ),
                new UserQueryById(
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

module.exports = DeleteUserProfileEndpoint
