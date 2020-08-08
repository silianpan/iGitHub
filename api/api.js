import Vue from 'vue'
import MinRequest from '@/utils/MinRequest'
import globalConfig from '@/config'

const minRequest = new MinRequest()

// intercept request
minRequest.interceptors.request((request) => {
	const accessToken = Vue.prototype.$store.getters.accessToken
	if (accessToken) {
		request.header['Authorization'] = `token ${accessToken}`
	}
	return request
})

// intercept response
minRequest.interceptors.response((response) => {
	return response.data
})

// default configure
minRequest.setConfig((config) => {
	// default: baseUrl after authorized
	config.baseURL = globalConfig.baseUrl
	return config
})

export default {
	apis: {
		loginAuth(params = {}) {
			return minRequest.post('/login/oauth/access_token?client_id=' + globalConfig.githubClientId + '&client_secret=' +
				globalConfig.githubClientSecret + '&code=' + params.code + '&state=' + params.state, null, {
					baseURL: globalConfig.baseUrlToken
				})
		},
		getContributions(params = {}) {
			return minRequest.get(`/users/${params.name}/contributions`, null, {
				baseURL: globalConfig.baseUrlToken,
				header: {
					'Accept': 'text/html',
					'content-type': 'text/html; charset=utf-8'
				}
			})
		},
		listTrendingRepo(params = {}) {
			return minRequest.get('/repositories', params, {
				baseURL: globalConfig.baseUrlTrending
			})
		},
		listTrendingDeveloper(params = {}) {
			return minRequest.get('/developers', params, {
				baseURL: globalConfig.baseUrlTrending
			})
		},
		listLanguages() {
			return minRequest.get('/languages', null, {
				baseURL: globalConfig.baseUrlTrending
			})
		},
		getAuthUser() {
			return minRequest.get('/user')
		},
		// repos detail
		getRepos(owner, repo) {
			return minRequest.get(`/repos/${owner}/${repo}`)
		},
		// repo languages
		listReposLanguages(owner, repo) {
			return minRequest.get(`/repos/${owner}/${repo}/languages`)
		},
		// pull requests
		listPullRequests(owner, repo) {
			return minRequest.get(`/repos/${owner}/${repo}/pulls`)
		},
		// branches
		listBranches(owner, repo) {
			return minRequest.get(`/repos/${owner}/${repo}/branches`)
		},
		// readme
		getReposReadme(owner, repo) {
			return minRequest.get(`/repos/${owner}/${repo}/readme`, null, {
				header: {
					'Accept': 'application/vnd.github.v3.html+json'
				}
			})
		},
		// get repos content
		getReposContent(owner, repo, path = '', options = {}) {
			return minRequest.get(`/repos/${owner}/${repo}/contents/${path}`, null, options)
		},
		// list received_events
		listAuthUserReceivedEvents(username, page = 1, perPage = 30) {
			return minRequest.get(`/users/${username}/received_events?page=${page}&per_page=${perPage}`)
		},
		// list events
		// listAuthUserEvents(username, page = 1, perPage = 30) {
		// 	return minRequest.get(`/users/${username}/events?page=${page}&per_page=${perPage}`)
		// },
		// list public received_events
		// listPublicReceivedEvents(username, page = 1, perPage = 30) {
		// 	return minRequest.get(`/users/${username}/received_events/public?page=${page}&per_page=${perPage}`)
		// },
		// list public events
		// listPublicEvents() {
		// 	return minRequest.get('/events')
		// },
		// list notifications
		// listAuthNotifications(params) {
		// 	return minRequest.get('/notifications', params)
		// }
		// List repositories starred by the authenticated user
		listAuthUserReposStarred(params) {
			return minRequest.get('/user/starred', params)
		},
		// List repositories for the authenticated user
		listAuthUserRepos(params) {
			return minRequest.get('/user/repos', params)
		},
		searchRepos(params) {
			return minRequest.get('/search/repositories', params)
		}
	}
}
