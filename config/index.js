/**
 * ip or domain name
 */
// OAuth address
const ipAddressToken = 'https://github.com'
// Trending address
const ipAddressTrending = 'https://ghapi.huchen.dev'
// after authorized
const ipAddress = 'https://api.github.com'
// contributions
const ipAddressContributions = 'https://ghchart.rshah.org'
const ipAddress3dContri = 'https://github-3d-contribution.herokuapp.com'
// github raw url
const githubRawUrl = 'https://raw.githubusercontent.com'
/**
 * github secure authorize address
 */
const githubClientId = ''
const githubClientSecret = ''
const githubAuthUrl = ipAddressToken + '/login/oauth/authorize?client_id=' + githubClientId + '&state=funcode&scope=notifications,user,repo'
/**
 * api prefix
 */
const apiPrefixToken = '/apitoken'
const apiPrefixTrending = '/trending'
const apiPrefix = '/apiv3'
const apiPrefix3dContri = '/api3dcontri'
/**
 * OAuth baseUrl
 */
const getBaseUrlToken = () => {
	// #ifdef H5
	return apiPrefixToken
	// #endif
	// #ifdef APP-PLUS
	return ipAddressToken
	// #endif
}
/**
 * trending for repos baseURL
 */
const getBaseUrlTrending = () => {
	// #ifdef H5
	return apiPrefixTrending
	// #endif
	// #ifdef APP-PLUS
	return ipAddressTrending
	// #endif
}
/**
 * api after authorized
 */
const getBaseUrl = () => {
	// #ifdef H5
	return apiPrefix
	// #endif
	// #ifdef APP-PLUS
	return ipAddress
	// #endif
}
/**
 * get 3d contribution url
 */
const get3dContriBaseUrl = () => {
	// #ifdef H5
	return apiPrefix3dContri
	// #endif
	// #ifdef APP-PLUS
	return ipAddress3dContri
	// #endif
}
export default {
	baseUrl: getBaseUrl(),
	baseUrlToken: getBaseUrlToken(),
	baseUrlTrending: getBaseUrlTrending(),
	baseUrl3dContri: get3dContriBaseUrl(),
	githubClientId,
	githubClientSecret,
	githubAuthUrl,
	ipAddressContributions,
	ipAddressToken,
	githubRawUrl
}
