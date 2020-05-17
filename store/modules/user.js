import Vue from 'vue'
import GithubApi from '@/utils/GithubApi'
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
		async authLogin({ commit }, params) {
			if (params && params.code) {
				uni.showLoading({
					title: '努力加载中...'
				})
				const res = await Vue.prototype.$minApi.loginAuth(params)
				uni.hideLoading()
				if (res.access_token) {
					const accessToken = res.access_token
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
			}
		}
	}
}
