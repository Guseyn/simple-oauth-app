'use strict'

const { as } = require('@cuties/cutie')
const { Backend, RestApi, ServingFilesEndpoint } = require('@cuties/rest')
const ConnectedMongoClient = require('./mongo/ConnectedMongoClient')
const CustomNotFoundEndpoint = require('./endpoints/CustomNotFoundEndpoint')
const CustomInternalServerErrorEndpoint = require('./endpoints/CustomInternalServerErrorEndpoint')
const CustomIndexEndpoint = require('./endpoints/CustomIndexEndpoint')
const CreatedSignInEndpoint = require('./endpoints/CreatedSignInEndpoint')
const CreatedSignUpEndpoint = require('./endpoints/CreatedSignUpEndpoint')
const CreatedUserProfileEndpoint = require('./endpoints/CreatedUserProfileEndpoint')
const CreatedUpdateUserProfileEndpoint = require('./endpoints/CreatedUpdateUserProfileEndpoint')
const CreatedDeleteUserProfileEndpoint = require('./endpoints/CreatedDeleteUserProfileEndpoint')
const notFoundEndpoint = new CustomNotFoundEndpoint(new RegExp(/\/not-found/))
const internalServerErrorEndpoint = new CustomInternalServerErrorEndpoint(new RegExp(/^\/internal-server-error/))
const path = require('path')

const mapper = (url) => {
  return path.join('src', 'static', ...url.split('/').filter(path => path !== ''))
}

new ConnectedMongoClient('mongodb://localhost:27017').as('mongoClient').after(
  new Backend(
    'http', 
    8000, 
    '127.0.0.1',
    new RestApi(
      new CustomIndexEndpoint('./src/static/html/index.html', notFoundEndpoint),
      new ServingFilesEndpoint(new RegExp(/^\/(html|css|js)/), mapper, notFoundEndpoint),
      new CreatedSignUpEndpoint(new RegExp(/^\/signup/), 'POST', as('mongoClient')),
      new CreatedSignInEndpoint(new RegExp(/^\/signin/), 'POST', as('mongoClient')),
      new CreatedUserProfileEndpoint(new RegExp(/^\/profile/), 'GET', as('mongoClient')),
      new CreatedUpdateUserProfileEndpoint(new RegExp(/^\/profile/), 'PUT', as('mongoClient')),
      new CreatedDeleteUserProfileEndpoint(new RegExp(/^\/profile/), 'DELETE', as('mongoClient')),
      notFoundEndpoint,
      internalServerErrorEndpoint
    )
  )
).call()
