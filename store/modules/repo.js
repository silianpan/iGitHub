import Vue from 'vue'
import _ from 'lodash'
export default {
	state: {
		langParams: {},
		// search history
		langParamsHistory: []
	},
	getters: {
		langParams: state => {
			if (!_.isEmpty(state.langParams)) {
				return state.langParams
			}
			return Vue.prototype.$cache.get('_langParams')
		},
		langParamsHistory: state => {
			if (!_.isEmpty(state.langParamsHistory)) {
				return state.langParamsHistory
			}
			return Vue.prototype.$cache.get('_langParamsHistory') || []
		}
	},
	mutations: {
		updateLangParams: (state, langParams) => {
			state.langParams = langParams
			Vue.prototype.$cache.set('_langParams', langParams, 0)
		},
		updateLangParamsHistory: (state, langParamsHistory) => {
			state.langParamsHistory = langParamsHistory
			Vue.prototype.$cache.set('_langParamsHistory', langParamsHistory, 0)
		},
		clearLangParams: state => {
			state.langParams = {}
			state.langParamsHistory = []
			Vue.prototype.$cache.delete('_langParams')
			Vue.prototype.$cache.delete('_langParamsHistory')
		}
	},
	actions: {
		clearLangParams({ commit }) {
			commit('clearLangParams')
		},
		updateLangParams({ commit, getters }, langParams) {
			commit('updateLangParams', langParams)
			if (langParams.language) {
				let oldHistoryList = getters.langParamsHistory
				if (_.isEmpty(oldHistoryList)) {
					oldHistoryList = []
				} else {
					const index = oldHistoryList.findIndex(text => text.language === langParams.language);
					console.log(index)
					if (index !== -1) {
						oldHistoryList.splice(index, 1);
					}
				}
				oldHistoryList.push({
					language: langParams.language,
					langName: langParams.langName
				})
				oldHistoryList = oldHistoryList.slice(-5)
				commit('updateLangParamsHistory', oldHistoryList)
			}
		}
	}
}
