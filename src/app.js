'use strict'

const { as } = require('@cuties/cutie')
const { Backend, RestApi, ServingFilesEndpoint } = require('@cuties/rest')
const { Created } = require('@cuties/created')
const ConnectedMongoClient = require('./mongo/ConnectedMongoClient')
const CustomNotFoundEndpoint = require('./endpoints/CustomNotFoundEndpoint')
const CustomInternalServerErrorEndpoint = require('./endpoints/CustomInternalServerErrorEndpoint')
const CustomIndexEndpoint = require('./endpoints/CustomIndexEndpoint')
const SignInEndpoint = require('./endpoints/SignInEndpoint')
const SignUpEndpoint = require('./endpoints/SignUpEndpoint')
const GoogleAuthEndpoint = require('./endpoints/GoogleAuthEndpoint')
const GitHubAuthEndpoint = require('./endpoints/GitHubAuthEndpoint')
const UserProfileEndpoint = require('./endpoints/UserProfileEndpoint')
const UpdateUserProfileEndpoint = require('./endpoints/UpdateUserProfileEndpoint')
const DeleteUserProfileEndpoint = require('./endpoints/DeleteUserProfileEndpoint')
const notFoundEndpoint = new CustomNotFoundEndpoint(new RegExp(/\/not-found/))
const internalServerErrorEndpoint = new CustomInternalServerErrorEndpoint(new RegExp(/^\/internal-server-error/))
const path = require('path')

const mapper = (url) => {
  return path.join('src', 'static', ...url.split('?')[0].split('/').filter(path => path !== ''))
}

new ConnectedMongoClient('mongodb://mongo:27017').as('mongoClient').after(
  new Backend(
    'http',
    8000,
    '0.0.0.0',
    new RestApi(
      new CustomIndexEndpoint('./src/static/html/index.html', notFoundEndpoint),
      new ServingFilesEndpoint(new RegExp(/^\/(html|css|js|images)/), mapper, {}, notFoundEndpoint),
      new Created(SignUpEndpoint, new RegExp(/^\/signup/), 'POST', as('mongoClient')),
      new Created(SignInEndpoint, new RegExp(/^\/signin/), 'POST', as('mongoClient')),
      new Created(GoogleAuthEndpoint, new RegExp(/^\/google/), 'POST', as('mongoClient')),
      new Created(GitHubAuthEndpoint, new RegExp(/^\/github/), 'POST', as('mongoClient')),
      new Created(UserProfileEndpoint, new RegExp(/^\/profile/), 'GET', as('mongoClient')),
      new Created(UpdateUserProfileEndpoint, new RegExp(/^\/profile/), 'PUT', as('mongoClient')),
      new Created(DeleteUserProfileEndpoint, new RegExp(/^\/profile/), 'DELETE', as('mongoClient')),
      notFoundEndpoint,
      internalServerErrorEndpoint
    )
  )
).call()
