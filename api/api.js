import Vue from 'vue'
import MinRequest from '@/utils/MinRequest'
import globalConfig from '@/config'

const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
	const accessToken = Vue.prototype.$store.getters.accessToken
	if (accessToken) {
		request.header['Authorization'] = `token ${accessToken}`
	}
	return request
})

// 响应拦截器
minRequest.interceptors.response((response) => {
	return response.data
})

// 设置默认配置
minRequest.setConfig((config) => {
	// 默认为授权后的Api的baseUrl
	config.baseURL = globalConfig.baseUrl
	return config
})

export default {
	// 这里统一管理api请求
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
		getAuthUser() {
			return minRequest.get('/user')
		},
		// 获取repo明细
		getRepos(owner, repo) {
			return minRequest.get(`/repos/${owner}/${repo}`)
		},
		// 获取repo语言
		listReposLanguages(owner, repo) {
			return minRequest.get(`/repos/${owner}/${repo}/languages`)
		},
		// 获取pull requests
		listPullRequests(owner, repo) {
			return minRequest.get(`/repos/${owner}/${repo}/pulls`)
		},
		// 获取分支
		listBranches(owner, repo) {
			return minRequest.get(`/repos/${owner}/${repo}/branches`)
		},
		// 获取readme
		getReposReadme(owner, repo) {
			return minRequest.get(`/repos/${owner}/${repo}/readme`, null, {
				header: {
					'Accept': 'application/vnd.github.v3.html+json'
				}
			})
		},
		// get repos content
		getReposContent(owner, repo, path = '') {
			return minRequest.get(`/repos/${owner}/${repo}/contents/${path}`)
		},
		// get a tree
		getATree(owner, repo, treeSha) {
			return minRequest.get(`/repos/${owner}/${repo}/git/trees/${treeSha}`)
		}
	}
}
