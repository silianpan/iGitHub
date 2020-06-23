import globalConfig from '@/config'
/**
 * preview: text、image、other
 */
export const filePreview = (owner, repo, path, defaultBranch = 'master') => {
	// file type
	if (path && typeof path === 'string') {
		let index = path.lastIndexOf('.')
		let suffix = path.substring(index + 1)
		if (suffix) {
			suffix = suffix.toLowerCase()
			switch (suffix) {
				case 'jpg':
				case 'jpeg':
				case 'png':
				case 'bmp':
				case 'gif':
					uni.previewImage({
						urls: [`${globalConfig.githubRawUrl}/${owner}/${repo}/${defaultBranch}/${path}`]
					})
					break
				default:
					uni.navigateTo({
						url: `/pages/repos/code/text?owner=${owner}&repo=${repo}&path=${path}&defaultBranch=${defaultBranch}`
					})
			}
		}
	}
}
