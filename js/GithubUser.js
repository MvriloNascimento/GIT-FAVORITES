export class GithubUser {
  static search(username) {
    const endpoint = `https://api.github.com/users/${username}`

  
    return fetch(endpoint).then(data => data.json())
    .then(({ login, name, public_repos, follower]s}) => ({
      login,
      name,
      public_repos,
      followers
    }))
  }
}