# simple-oauth-app
Simple oauth app in Node.js. It's completely based on [Async Tree Pattern](https://guseyn.com/pdf/Async_Tree_Pattern.pdf). The main point of this app is to show that it's possible to create oauth app in the declarative way.

## Stack of technologies

`Node.js`, `MongoDB`, `@cuties`, `JWT` (basic implementation, without external libraries).

## Why this example is cool

1. It's based on `@cuties`, so you can write your asyncronous code in the declarative way (without callbacks, Promises, and async/await abstractions).
2. You can see how authentication can be implemented with only simple external https requests.
3. You can see how **JWT** works (this app don't use third party libraries for using **JWT**).

## Model

```js
User: {
  _id,
  name,
  email,
  password,
  description,
  signupDate
}
```

## OAuth types

1. Basic: `email` and `password`
2. Google OAuth
2. GitHub OAuth

All these types are synchronized, so you can everytime choose different way to sign in your profile.

## Screenshots

<img src="https://github.com/Guseyn/simple-oauth-app/blob/master/login.png?raw=true" width="350px"></img>
<img src="https://github.com/Guseyn/simple-oauth-app/blob/master/profile.png?raw=true" width="350px"></img>

## Demo

<a href="http://www.youtube.com/watch?feature=player_embedded&v=yn2tvSDwgII
" target="_blank"><img src="http://img.youtube.com/vi/yn2tvSDwgII/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="350" height="263" border="10" /></a>
