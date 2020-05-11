<template>
	<view>
		<uni-card v-for="(item, index) in repos" :key="index" :is-shadow="true" :title="`${item.author} / ${item.name}`" mode="style"
		 :thumbnail="item.avatar" :extra="item.description" note="true">
			<text class="content-box-text">{{ item.description }}</text>
			<block slot="footer">
				<view class="footer-box">
					<view class="" @click.stop="footerClick('喜欢')"><text class="footer-box__item"> 喜欢</text></view>
					<view class="" @click.stop="footerClick('评论')"><text class="footer-box__item"> 评论</text></view>
					<view class="" @click.stop="footerClick('分享')"><text class="footer-box__item"> 分享</text></view>
				</view>
			</block>
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				repos: []
			}
		},
		mounted() {
			this.listRepo()
		},
		methods: {
			async listRepo() {
				this.repos = await this.$minApiTrending.listRepo()
			}
		}
	}
</script>
