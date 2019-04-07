function initGoogleLogin () {
  gapi.load('auth2', () => {
    auth2 = gapi.auth2.init({
      client_id: '8310979471-lvmkisk1b33fjd25pjjqe8v8fa72rq2q.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      scope: 'profile'
    })
    attachSignin(document.getElementById('googleCustomBtn'))
  })
}

function attachSignin (element) {
  auth2.attachClickHandler(element, {},
    (googleUser) => {
      fetchJSON(
        '/google',
        'POST',
        {
          googleToken: googleUser.getAuthResponse().id_token
        },
        {},
        (data) => {
          let jwt = data.jwt
          localStorage.setItem('jwt', jwt)
          location.replace('/html/profile.html')
        },
        (errMessage) => {
          console.log(errMessage)
        }
      )
    },
    (error) => {
      console.log(JSON.stringify(error, undefined, 2))
    }
  )
}

function googleSignOut () {
  gapi.auth2.getAuthInstance().signOut().then(() => {
    console.log('google logout')
  })
}
