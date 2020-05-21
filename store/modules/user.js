import Vue from 'vue'
import _ from 'lodash'
import globalConfig from '@/config'
export default {
	state: {
		accessToken: ''
	},
	getters: {
		isAuthed: (state, getters) => {
			return !_.isEmpty(getters.accessToken)
		},
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
		autoLogin({ getters, dispatch }) {
			if (getters.isAuthed) {
				dispatch('loginAuth')
			}
		},
		loginAuth() {
			//#ifdef APP-PLUS
			uni.navigateTo({
				url: '/pages/login/auth'
			})
			//#endif
			//#ifdef H5
			window.location.href = globalConfig.githubAuthUrl
			//#endif
		},
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
					// #ifndef H5
					uni.reLaunch({
						url: '/pages/index/index'
					})
					// #endif
				} else {
					uni.reLaunch({
						url: '/pages/login/login'
					})
				}
			}
		}
	}
}
