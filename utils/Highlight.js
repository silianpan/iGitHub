// highlight.js
import Vue from 'vue'
import Hljs from 'highlight.js'
let Highlight = {}
Highlight.install = (Vue, options) => {
	Vue.directive('highlight', el => {
		let blocks = uni.createSelectorQuery().selectAll('pre code')
		blocks.forEach((block) => {
			Hljs.highlightBlock(block)
		})
	})
}
export default Highlight
