import Vue from 'vue'
import MinRequest from '@/utils/MinRequest'
import globalConfig from '@/config'

const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
	return request
})

// 响应拦截器
minRequest.interceptors.response((response) => {
	return response.data
})

// 设置默认配置
minRequest.setConfig((config) => {
	config.baseURL = globalConfig.baseUrl
	return config
})

export default {
	// 这里统一管理api请求
	apis: {
		login(code) {
			return minRequest.post('/login/oauth/access_token?client_id=' + globalConfig.githubClientId + '&client_secret=' +
				globalConfig.githubClientSecret + '&code=' + code + '&state=igithub')
		}
	}
}
