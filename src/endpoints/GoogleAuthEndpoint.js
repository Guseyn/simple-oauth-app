'use strict'

const { as } = require('@cuties/cutie')
const { If, Else } = require('@cuties/if-else')
const { ResponseWithStatusCode, ResponseWithHeader, ResponseWithHeaders, EndedResponse, ResponseBody } = require('@cuties/http')
const { ResponseFromHttpsGetRequest } = require('@cuties/https')
const { Endpoint, RequestBody } = require('@cuties/rest')
const { ParsedJSON, StringifiedJSON, Value } = require('@cuties/json')
const { StringFromBuffer } = require('@cuties/buffer')
const { IsNull } = require('@cuties/is')
const GeneratedJWTByUser = require('./../async/GeneratedJWTByUser')
const CreatedUser = require('./../async/CreatedUser')
const CreatedUserByDataFromDb = require('./../async/CreatedUserByDataFromDb')
const ExpirationTime = require('./../auth/ExpirationTime')
const Secret = require('./../auth/Secret')
const ObjectID = require('mongodb').ObjectID
const Db = require('./../mongo/Db')
const Collection = require('./../mongo/Collection')
const UserQueryByEmail = require('./../async/UserQueryByEmail')
const GoogleAuthRequestOptions = require('./../async/GoogleAuthRequestOptions')
const InsertedDocument = require('./../mongo/InsertedDocument')
const FoundDocument = require('./../mongo/FoundDocument')
const clientId = '8310979471-0a4knr38ku66hgig0cv74156sjvrkbm3.apps.googleusercontent.com'
const clientSecret = '0Uwu8x2bPcPZphBkoWLqrO9b'

class GoogleAuthEndpoint extends Endpoint {
  constructor (regexpUrl, type, mongoClient) {
    super(regexpUrl, type)
    this.mongoClient = mongoClient
  }

  body (request, response) {
    return new ParsedJSON(
      new StringFromBuffer(
        new ResponseBody(
          new ResponseFromHttpsGetRequest(
            new GoogleAuthRequestOptions(
              new Value(
                new ParsedJSON(
                  new StringFromBuffer(
                    new RequestBody(request)
                  )
                ),
                'googleToken'
              )
            )
          )
        )
      )
    ).as('googleUserData').after(
      new Collection(
        new Db(
          this.mongoClient,
          'db'
        ),
        'users'
      ).as('usersCollection').after(
        new CreatedUser(
          new ObjectID(),
          as('googleUserData')
        ).as('newUser').after(
          new If(
            new IsNull(
              new FoundDocument(
                as('usersCollection'),
                new UserQueryByEmail(
                  as('newUser')
                )
              ).as('existingUser')
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
                ),
                new StringifiedJSON(
                  new GeneratedJWTByUser(
                    new CreatedUserByDataFromDb(
                      as('newUser')
                    ),
                    new ExpirationTime(15),
                    new Secret()
                  )
                )
              )
            ),
            new Else(
              new EndedResponse(
                new ResponseWithStatusCode(
                  new ResponseWithHeader(
                    response, 'Content-Type', 'application/json'
                  ), 200
                ),
                new StringifiedJSON(
                  new GeneratedJWTByUser(
                    new CreatedUserByDataFromDb(
                      as('existingUser')
                    ),
                    new ExpirationTime(15),
                    new Secret()
                  )
                )
              )
            )
          )
        )
      )
    )
  }
}

module.exports = GoogleAuthEndpoint
