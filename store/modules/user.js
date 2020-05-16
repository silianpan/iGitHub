import Vue from 'vue'
import GithubApi from '@/utils/GithubApi'
import globalConfig from '@/config'
import { checkStatus } from '@/utils/checkResponse'
export default {
	state: {
		accessToken: ''
	},
	getters: {
		accessToken: state => {
			if (state.accessToken) {
				return state.accessToken
			}
			return Vue.prototype.$cache.get('_accessToken')
		}
	},
	mutations: {
		loginSuccess: (state, accessToken) => {
			state.accessToken = accessToken
			Vue.prototype.$cache.set('_accessToken', accessToken, 0)
		},
		logoutSuccess: state => {
			state.accessToken = ''
			Vue.prototype.$cache.delete('_accessToken')
		}
	},
	actions: {
		authLogin({ commit }, code, stateStr) {
			if (code) {
				// #ifdef H5
				const url = '/apitoken/login/oauth/access_token?client_id=' + globalConfig.githubClientId + '&client_secret=' +
						globalConfig.githubClientSecret + '&code=' + code + '&state=' + stateStr
				// #endif
				// #ifdef APP-PLUS
				const url = 'https://github.com/login/oauth/access_token?client_id=' + globalConfig.githubClientId + '&client_secret=' +
						globalConfig.githubClientSecret + '&code=' + code + '&state=' + stateStr
				// #endif
				uni.request({
					url,
					header: {
						'content-type': 'application/json; charset=utf-8',
						'Accept': 'application/json',
					},
					withCredentials: true,
					method: 'POST',
					success: res => {
						if (res.data && res.data.access_token) {
							const accessToken = res.data.access_token
							commit('loginSuccess', accessToken)
							const gh = GithubApi.loginAuth(accessToken)
							Vue.prototype.$gh = gh
							uni.reLaunch({
								url: '/pages/index/index'
							})
						} else {
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}
					},
					fail: res => {
						checkStatus(res)
					}
				})
			}
		}
	}
}
