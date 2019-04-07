'use strict'

const { as } = require('@cuties/cutie')
const { If, Else } = require('@cuties/if-else')
const { ResponseWithStatusCode, ResponseWithHeader, EndedResponse } = require('@cuties/http')
const { JWTOfRequest, IsHS256JWTValid, JWTPayloadValue } = require('@cuties/jwt')
const { Value } = require('@cuties/object')
const { Endpoint } = require('@cuties/rest')
const { StringifiedJSON } = require('@cuties/json')
const CreatedUserWithOnlyId = require('./../async/CreatedUserWithOnlyId')
const Secret = require('./../async/Secret')
const Db = require('./../mongo/Db')
const Collection = require('./../mongo/Collection')
const UserQueryById = require('./../async/UserQueryById')
const DeletedDocument = require('./../mongo/DeletedDocument')

class DeleteUserProfileEndpoint extends Endpoint {
  constructor (regexpUrl, type, mongoClient) {
    super(regexpUrl, type)
    this.mongoClient = mongoClient
  }

  body (request, response) {
    return new If(
      new IsHS256JWTValid(
        new JWTOfRequest(
          request
        ).as('jwt'),
        new Secret()
      ),
      new CreatedUserWithOnlyId(
        new JWTPayloadValue(
          as('jwt'), 'sub'
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
