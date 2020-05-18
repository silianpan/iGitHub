import GitHub from 'github-api'

class GithubApi {
	static login(username, password) {
		return new GitHub({
			username,
			password
		})
	}
	
	static loginAuth(token) {
		return new GitHub({token})
	}
	
	static login({ username, password }) {
		return new GitHub({username, password})
	}
}

export default GithubApi