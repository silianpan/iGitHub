import Vue from 'vue'
export default {
	state: {
		themeBgColor: ''
	},
	getters: {
		themeBgColor: state => {
			const color = Vue.prototype.$cache.get('_themeBgColor')
			if (_.isEmpty(color) && _.isEmpty(state.themeBgColor)) {
				return '#fa541c'
			}
			return !_.isEmpty(state.themeBgColor) ? state.themeBgColor : color
		}
	},
	mutations: {
		setThemeBgColor: (state, themeBgColor) => {
			// state.themeBgColor = themeBgColor
			Vue.set(state, 'themeBgColor', themeBgColor)
			Vue.prototype.$cache.set('_themeBgColor', themeBgColor, 0)
		}
	},
	actions: {
		initThemeBgColor({ commit }, themeBgColor) {
			commit('setThemeBgColor', themeBgColor)
		}
	}
}