<template>
	<view>
		<view class="login-logo">
			<image mode="aspectFit" src="../../assets/img/Octocat.jpg" />
		</view>
		<u-cell-group>
			<u-field v-model="mobile" label="手机号" placeholder="请填写手机号">
			</u-field>
			<u-field v-model="code" label="验证码" placeholder="请填写验证码">
			</u-field>
		</u-cell-group>
	</view>
</template>

<script>
</script>

<style lang="less">
	.login-logo {
		display: table-cell;
		vertical-align: middle;
		text-align: center;
		width: calc(100vw);
		height: 30vh;

		uni-image {
			width: 200rpx;
			height: 200rpx;
		}
	}
</style>
