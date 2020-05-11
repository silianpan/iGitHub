import { Octokit } from '@octokit/rest'

class OctokitRequest {
	constructor(accessToken) {
		this.octokit = new Octokit({
			auth: accessToken
		})

		this.octokit.hook.before("request", async options => {
			// validate(options)
		})
		this.octokit.hook.after("request", async (response, options) => {
			console.log(`${options.method} ${options.url}: ${response.status}`)
		})
		this.octokit.hook.error("request", async (error, options) => {
			if (error.status === 304) {
				// return findInCache(error.headers.etag);
				console.log(error)
			}

			throw error
		})
		this.octokit.hook.wrap("request", async (request, options) => {
			// add logic before, after, catch errors or replace the request altogether
			return request(options)
		})
		return this.octokit
	}
}

export default OctokitRequest
