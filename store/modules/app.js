import Vue from 'vue'
export default {
	state: {
		themeBgColor: '',
		darkMode: false
	},
	getters: {
		themeBgColor: state => {
			const color = Vue.prototype.$cache.get('_themeBgColor')
			if (_.isEmpty(color) && _.isEmpty(state.themeBgColor)) {
				return '#fa541c'
			}
			return !_.isEmpty(state.themeBgColor) ? state.themeBgColor : color
		},
		darkMode: state => {
			const dark = Vue.prototype.$cache.get('_darkMode')
			return dark !== undefined && dark !== null ? dark : state.darkMode
		}
	},
	mutations: {
		setThemeBgColor: (state, themeBgColor) => {
			// state.themeBgColor = themeBgColor
			Vue.set(state, 'themeBgColor', themeBgColor)
			Vue.prototype.$cache.set('_themeBgColor', themeBgColor, 0)
		},
		setDarkMode: (state, darkMode) => {
			Vue.set(state, 'darkMode', darkMode)
			Vue.prototype.$cache.set('_darkMode', darkMode, 0)
		}
	},
	actions: {
		initThemeBgColor({ commit }, themeBgColor) {
			commit('setThemeBgColor', themeBgColor)
		},
		initDarkMode({ commit }, darkMode) {
			commit('setDarkMode', darkMode)
		}
	}
}