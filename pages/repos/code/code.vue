<template>
	<view>
		<u-sticky>
			<view class="primary-color u-font-xl" style="padding: 10rpx 30rpx;">
				<block v-for="(item, index) in pathList" :key="`${item}${index}`">
					<u-icon name="arrow-right" @tap="tapDir(index, item)"></u-icon>
					<text @tap="tapDir(index + 1, item)">{{ item }}</text>
				</block>
			</view>
		</u-sticky>
		<view class="cu-list menu">
			<view class="cu-item" v-for="(item, index) in fileList" :key="`${item.name}${index}`" @tap="tapFileOrDir(item)">
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
	import { filePreview } from '@/utils/preview'
	export default {
		onReady() {
			uni.setNavigationBarTitle({
			    title: this.$t('Code')
			})
		},
		data() {
			return {
				FileIcons,
				owner: '',
				repo: '',
				path: '',
				defaultBranch: '',
				fileList: []
			}
		},
		computed: {
			pathList() {
				return this.$_.split(this.path, '/')
			}
		},
		onLoad(option) {
			this.owner = option.owner
			this.repo = option.repo
			if (option.path) {
				this.path = option.path
			}
			if (option.defaultBranch) {
				this.defaultBranch = option.defaultBranch
			}
			this.getReposContent()
		},
		methods: {
			async getReposContent() {
				const res = await this.$minApi.getReposContent(this.owner, this.repo, this.path)
				// sort
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
						filePreview(this.owner, this.repo, item.path, this.defaultBranch)
						break
				}
			},
			tapDir(index, item) {
				this.path = this.$_.join(this.$_.slice(this.pathList, 0, index), '/')
				this.getReposContent()
			}
		}
	}
</script>

<style>
	.file-icon::before {
		font-size: 34rpx;
	}
</style>
