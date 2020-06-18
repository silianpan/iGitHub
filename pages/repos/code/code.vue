<template>
	<view>
		<u-sticky class="padding: 0 30rpx">
			<text v-for="item in pathList" :key="item">
				<u-icon name="arrow-right"></u-icon>
				<text>{{ item }}</text>
			</text>
		</u-sticky>
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
				fileList: [],
				pathList: []
			}
		},
		onLoad(option) {
			this.owner = option.owner
			this.repo = option.repo
			if (option.path) {
				this.path = option.path
			}
			this.pathList = []
			this.getReposContent()
		},
		methods: {
			async getReposContent() {
				if (this.path) {
					this.pathList.push(this.path.substring(this.path.lastIndexOf('/') + 1))
				}
				const res = await this.$minApi.getReposContent(this.owner, this.repo, this.path)
				// 排序
				let dirList = this.$_.filter(res, {
					'type': 'dir'
				})
				let fileList = this.$_.filter(res, o => {
					return o.type !== 'dir'
				})
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
						this.path = item.path
						this.getReposContent()
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
