<template>
	<scroll-view scroll-y>
		<view class="order">
			<view class="item">
				<view class="left">
					<image class="avatar2" :src="authUser.avatar_url" mode="aspectFill"></image>
				</view>
				<view class="content">
					<view style="flex-flow: row wrap; justify-content: space-between; align-items: center; display: flex;">
						<view class="title u-line-2">{{ authUser.name }}<text class="sub-title">{{' (' + authUser.login + ')' }}</text></view>
					</view>
					<view class="remark2">{{ authUser.bio }}</view>
					<view class="description">{{ authUser.created_at }}</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				authUser: {}
			}
		},
		onReady() {
			this.getAuthUser()
		},
		methods: {
			async getAuthUser() {
				const user = await this.$minApi.getAuthUser()
				this.authUser = user
				console.log(this.authUser)
			}
		}
	}
</script>
