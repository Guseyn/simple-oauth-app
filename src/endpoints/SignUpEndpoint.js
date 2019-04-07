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
const Secret = require('./../async/Secret')
const ObjectID = require('mongodb').ObjectID
const Db = require('./../mongo/Db')
const Collection = require('./../mongo/Collection')
const UserQueryByEmail = require('./../async/UserQueryByEmail')
const FoundDocument = require('./../mongo/FoundDocument')
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
      new If(
        new IsNull(
          new FoundDocument(
            new Collection(
              new Db(
                this.mongoClient, 'db'
              ),
              'users'
            ).as('usersCollection'),
            new UserQueryByEmail(
              as('newUser')
            )
          )
        ),
        new InsertedDocument(
          as('usersCollection'),
          as('newUser')
        ).after(
          new EndedResponse(
            new ResponseWithStatusCode(
              new ResponseWithHeader(
                response, 'Content-Type', 'application/json'
              ), 200
            ), new StringifiedJSON(
              new GeneratedHS256JWT(
                new PayloadOfUser(
                  as('newUser')
                ),
                new Secret(),
                15
              )
            )
          )
        ),
        new Else(
          new EndedResponse(
            new ResponseWithStatusCode(
              new ResponseWithHeader(
                response, 'Content-Type', 'application/json'
              ), 400
            ), new StringifiedJSON({
              errMessage: 'User with specified email already exists'
            })
          )
        )
      )
    )
  }
}

module.exports = SignUpEndpoint
