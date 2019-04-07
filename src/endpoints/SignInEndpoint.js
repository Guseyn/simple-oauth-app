'use strict'

const { as } = require('@cuties/cutie')
const { If, Else } = require('@cuties/if-else')
const { ResponseWithStatusCode, ResponseWithHeader, EndedResponse } = require('@cuties/http')
const { Endpoint, RequestBody } = require('@cuties/rest')
const { GeneratedHS256JWT } = require('@cuties/jwt')
const { ParsedJSON, StringifiedJSON } = require('@cuties/json')
const { StringFromBuffer } = require('@cuties/buffer')
const { IsNull } = require('@cuties/is')
const CreatedUser = require('./../async/CreatedUser')
const PayloadOfUser = require('./../async/PayloadOfUser')
const CreatedUserByDataFromDb = require('./../async/CreatedUserByDataFromDb')
const Secret = require('./../async/Secret')
const Db = require('./../mongo/Db')
const Collection = require('./../mongo/Collection')
const UserQueryByEmailAndPassword = require('./../async/UserQueryByEmailAndPassword')
const FoundDocument = require('./../mongo/FoundDocument')
const JWTResponse = require('./../async/JWTResponse')

class SignInEndpoint extends Endpoint {
  constructor (regexpUrl, type, mongoClient) {
    super(regexpUrl, type)
    this.mongoClient = mongoClient
  }

  body (request, response) {
    return new CreatedUser(
      null,
      new ParsedJSON(
        new StringFromBuffer(
          new RequestBody(
            request
          )
        )
      )
    ).as('user').after(
      new If(
        new IsNull(
          new FoundDocument(
            new Collection(
              new Db(
                this.mongoClient, 'db'
              ),
              'users'
            ).as('usersCollection'),
            new UserQueryByEmailAndPassword(
              as('user')
            )
          ).as('foundUser')
        ),
        new EndedResponse(
          new ResponseWithStatusCode(
            new ResponseWithHeader(
              response, 'Content-Type', 'application/json'
            ), 404
          ), new StringifiedJSON({
            errMessage: 'User not found'
          })
        ),
        new Else(
          new EndedResponse(
            new ResponseWithStatusCode(
              new ResponseWithHeader(
                response, 'Content-Type', 'application/json'
              ), 200
            ),
            new StringifiedJSON(
              new JWTResponse(
                new GeneratedHS256JWT(
                  new PayloadOfUser(
                    new CreatedUserByDataFromDb(
                      as('foundUser')
                    )
                  ),
                  new Secret(),
                  15
                )
              )
            )
          )
        )
      )
    )
  }
}

module.exports = SignInEndpoint
