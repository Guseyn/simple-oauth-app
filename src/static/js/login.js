function initLogin () {
  let signInLink = document.getElementById('sign-in')
  let signUpLink = document.getElementById('sign-up')
  let name = document.getElementById('name')
  let email = document.getElementById('email')
  let password = document.getElementById('password')
  let goButton = document.getElementById('go-button')
  let mode = 'signIn'
  signInLink.onclick = () => {
    name.style['display'] = 'none'
    goButton.value = 'Sign in'
    mode = 'signIn'
  }
  signUpLink.onclick = () => {
    name.style['display'] = ''
    goButton.value = 'Sign up'
    mode = 'signUp'
  }
}
