import Vue from 'vue'
/**
 * preview: text、image、other
 */
export const filePreview = (owner, repo, path) => {
	// file type
	if (path && typeof path === 'string') {
		let index = path.lastIndexOf('.')
		let suffix = path.substring(index + 1)
		if (suffix) {
			suffix = suffix.toLowerCase()
			switch (suffix) {
				case 'pdf':
				case 'doc':
				case 'docx':
				case 'xls':
				case 'xlsx':
				case 'ppt':
				case 'pptx':
					// TODO pdf preview
					uni.showToast({
						title: 'this file cannot preview!',
						icon: none
					})
					break
				case 'jpg':
				case 'jpeg':
				case 'png':
				case 'bmp':
				case 'gif':
					Vue.prototype.$minApi.getReposContent(owner, repo, path).then(res => {
						// image preview
						if (res) {
							uni.previewImage({
								urls: ['data:image/png;base64,' + res.content]
							})
						}
					})
					break
				default:
					// text preview
					uni.navigateTo({
						url: `/pages/repos/code/text?owner=${owner}&repo=${repo}&path=${path}`
					})
			}
		}
	}
}
