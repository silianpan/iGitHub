<template>
	<uni-card :is-shadow="true" title="uni-app 框架" mode="style" thumbnail="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg" extra="DCloud 2019-05-20 12:32:19" note="true" @click="clickCard">
		<text class="content-box-text">uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可编译到iOS、Android、H5、以及各种小程序等多个平台。即使不跨端，uni-app同时也是更好的小程序开发框架</text>
		<block slot="footer">
			<view class="footer-box">
				<view class="" @click.stop="footerClick('喜欢')"><text class="footer-box__item"> 喜欢</text></view>
				<view class="" @click.stop="footerClick('评论')"><text class="footer-box__item"> 评论</text></view>
				<view class="" @click.stop="footerClick('分享')"><text class="footer-box__item"> 分享</text></view>
			</view>
		</block>
	</uni-card>
</template>

<script>
	export default {
		
	}
</script>
