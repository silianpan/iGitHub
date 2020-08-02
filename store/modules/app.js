import Vue from 'vue'
export default {
	state: {
		themeBgColor: '#fa541c'
	},
	getters: {
		themeBgColor: state => {
			const color = Vue.prototype.$cache.get('_themeBgColor')
			return !_.isEmpty(color) ? color : state.themeBgColor
		}
	},
	mutations: {
		setThemeBgColor: (state, themeBgColor) => {
			state.themeBgColor = themeBgColor
			Vue.prototype.$cache.set('_themeBgColor', themeBgColor, 0)
		}
	},
	actions: {
		initThemeBgColor({ commit }, themeBgColor) {
			commit('setThemeBgColor', themeBgColor)
		}
	}
}