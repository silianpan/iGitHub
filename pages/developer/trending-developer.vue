<template>
	<view class="page-box">
		<view class="order" v-for="(item, index) in developers" :key="index">
			<view class="item">
				<view class="left">
					<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
				</view>
				<view class="content">
					<view style="flex-flow: row wrap; justify-content: space-between; align-items: center; display: flex;">
						<view class="title u-line-2">{{ item.name }}<text class="sub-title">{{' (' + item.username + ')' }}</text></view>
						<uni-badge class="uni-badge-left-margin" :text="index+1" type="primary" size="small" />
					</view>
					<view class="remark2"><text class="iconfont iconbook1 margin-right-xs" />{{ item.repo.name }}</view>
					<view class="description">{{ item.repo.description }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				developers: []
			}
		},
		methods: {
			async listDeveloper() {
				this.developers = await this.$minApi.listTrendingDeveloper()
			}
		}
	}
</script>
