<template>
	<view>
		<view class="cu-list menu sm-border">
			<view class="cu-item" v-for="item in fileList" :key="item.sha">
				<view class="content">
					<text :class="FileIcons.getClassWithColor(item.name)"></text>
					<text class="text-grey">{{ item.name }}</text>
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
				fileList: []
			}
		},
		onLoad(option) {
			this.owner = option.owner
			this.repo = option.repo
			this.getReposContent()
		},
		methods: {
			async getReposContent(path = '') {
				this.fileList = await this.$minApi.getReposContent(this.owner, this.repo, path)
			}
		}
	}
</script>
