function initGithubLogin() {
  let githubButton = document.getElementById('githubCustomBtn')
  githubButton.onclick = () => {
    window.location = 'https://github.com/login/oauth/authorize?client_id=9740bb12713949b1c23d&redirect_uri=http://localhost:8000/html/github.html/&scope=user,repo'
  }
}
