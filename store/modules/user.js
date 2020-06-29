import Vue from 'vue'
import _ from 'lodash'
import globalConfig from '@/config'
export default {
	state: {
		accessToken: '',
		authUserInfo: {}
	},
	getters: {
		isAuthed: (state, getters) => {
			return !_.isEmpty(getters.accessToken)
		},
		accessToken: state => {
			if (!_.isEmpty(state.accessToken)) {
				return state.accessToken
			}
			return Vue.prototype.$cache.get('_accessToken')
		},
		authUserInfo: state => {
			if (!_.isEmpty(state.authUserInfo)) {
				return state.authUserInfo
			}
			return Vue.prototype.$cache.get('_authUserInfo')
		}
	},
	mutations: {
		initAuthUserInfo: (state, authUserInfo) => {
			state.authUserInfo = authUserInfo
			Vue.prototype.$cache.set('_authUserInfo', authUserInfo, 0)
		},
		loginSuccess: (state, accessToken) => {
			state.accessToken = accessToken
			Vue.prototype.$cache.set('_accessToken', accessToken, 0)
		},
		logoutSuccess: state => {
			state.accessToken = ''
			state.authUserInfo = {}
			Vue.prototype.$cache.delete('_accessToken')
			Vue.prototype.$cache.delete('_authUserInfo')
		}
	},
	actions: {
		logoutAuth({ commit }) {
			commit('logoutSuccess')
			uni.reLaunch({
				url: '/pages/login/login'
			})
		},
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
			if (params && params.code && params.state === 'igithub') {
				uni.showLoading({
					title: '努力加载中...'
				})
				const res = await Vue.prototype.$minApi.loginAuth(params)
				uni.hideLoading()
				if (res.access_token) {
					const accessToken = res.access_token
					commit('loginSuccess', accessToken)
					// get user info
					const authUserInfo = await Vue.prototype.$minApi.getAuthUser()
					commit('initAuthUserInfo', authUserInfo)
					// reLaunch
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
