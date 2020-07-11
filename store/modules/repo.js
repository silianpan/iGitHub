import Vue from 'vue'
import _ from 'lodash'
export default {
	state: {
		langParams: {}
	},
	getters: {
		langParams: state => {
			if (!_.isEmpty(state.langParams)) {
				return state.langParams
			}
			return Vue.prototype.$cache.get('_langParams')
		}
	},
	mutations: {
		updateLangParams: (state, langParams) => {
			state.langParams = langParams
			Vue.prototype.$cache.set('_langParams', langParams, 0)
		}
	},
	actions: {
		updateLangParams({ commit }, langParams) {
			commit('updateLangParams', langParams)
		}
	}
}
