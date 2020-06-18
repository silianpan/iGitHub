<template>
	<view>
		<view class="cu-list menu">
			<view class="cu-item" v-for="item in fileList" :key="item.sha" @tap="tapFileOrDir(item)">
				<view class="content">
					<text :class="[getFileIconClass(item.type), FileIcons.getClassWithColor(item.name)]" class="margin-right-xs u-font-xl file-icon" />
					<text class="u-font-xl">{{ item.name }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import FileIcons from 'file-icons-js'
	export default {
		data() {
			return {
				FileIcons,
				owner: '',
				repo: '',
				path: '',
				fileList: []
			}
		},
		onLoad(option) {
			this.owner = option.owner
			this.repo = option.repo
			if (option.path) {
				this.path = option.path
			}
			this.getReposContent()
		},
		methods: {
			async getReposContent(path = '') {
				const res = await this.$minApi.getReposContent(this.owner, this.repo, this.path)
				// 排序
				let dirList = this.$_.filter(res, { 'type': 'dir' })
				let fileList = this.$_.filter(res, o => { return o.type !== 'dir' })
				// dirList = this.$_.sortBy(dirList, ['name'])
				// fileList = this.$_.sortBy(fileList, ['name'])
				this.fileList = this.$_.concat(dirList, fileList)
			},
			getFileIconClass(type) {
				switch (type) {
					case 'dir':
						return 'iconfont iconfolder text-blue'
					default:
						return 'iconfont iconfile1 text-blue'
				}
			},
			tapFileOrDir(item) {
				switch (item.type) {
					case 'dir':
						uni.navigateTo({
							url: `/pages/repos/code/code?owner=${this.owner}&repo=${this.repo}&path=${item.path}`
						})
						break
					case 'file':
						// show code
						break
				}
			}
		}
	}
</script>

<style>
	.file-icon::before {
		font-size: 34rpx;
	}
</style>
