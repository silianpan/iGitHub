<template>
	<view>
		<block v-if="item.type === 'WatchEvent'">
			<view class="title">
				<text selectable>{{ item.actor.login }}</text>
				<text class="event-action">{{ ' ' + item.payload.action + ' ' }}</text>
				<text class="sub-title" style="color: #0965d2!important;" @tap="clickRepoDetail(item.repo.name)">{{ item.repo.name }}</text>
			</view>
		</block>
		<block v-if="item.type === 'CommitCommentEvent'">
			<view class="title">
				<text selectable>{{ item.actor.login }}</text>
				<text class="event-action">{{ ' ' + item.payload.action + ' ' }}</text>
				<text class="sub-title" style="color: #0965d2!important;" @tap="clickRepoDetail(item.repo.name)">{{ item.repo.name }}</text>
				<text class="event-action">{{ ' commit comment ' }}</text>
				<text class="sub-title" style="color: #0965d2!important;">{{ item.payload.commit.commit_id.substring(0, 7) }}</text>
				<text class="event-action">{{ ' ' + item.payload.commit.body }}</text>
			</view>
		</block>
		<block v-if="item.type === 'CreateEvent'">
			<view class="title">
				<text selectable>{{ item.actor.login }}</text>
				<text class="event-action">{{ ' created ' + item.payload.ref_type + ' ' }}</text>
				<text class="sub-title" style="color: #0965d2!important;" @tap="clickRepoDetail(item.repo.name)">{{ item.repo.name }}</text>
			</view>
		</block>
		<block v-if="item.type === 'DeleteEvent'">
			<view class="title">
				<text selectable>{{ item.actor.login }}</text>
				<text class="event-action">{{ ' deleted ' + item.payload.ref_type + ' ' }}</text>
				<text class="sub-title" style="color: #0965d2!important;" @tap="clickRepoDetail(item.repo.name)">{{ item.repo.name }}</text>
			</view>
		</block>
		<block v-if="item.type === 'ForkEvent'">
			<view class="title">
				<text selectable>{{ item.actor.login }}</text>
				<text class="event-action">{{ ' forked ' }}</text>
				<text class="sub-title" style="color: #0965d2!important;" @tap="clickRepoDetail(item.repo.name)">{{ item.repo.name }}</text>
				<text class="event-action">{{ ' to ' }}</text>
				<text class="sub-title" style="color: #0965d2!important;" @tap="clickRepoDetail(item.payload.forkee.full_name)">{{ item.payload.forkee.full_name }}</text>
			</view>
		</block>
		<block v-if="item.type === 'GollumEvent'">
			<view class="title">
				<text selectable>{{ item.actor.login }}</text>
				<text class="event-action">{{ ' pages updated at ' }}</text>
				<text class="sub-title" style="color: #0965d2!important;" @tap="clickRepoDetail(item.repo.name)">{{ item.repo.name }}</text>
			</view>
		</block>
		<block v-if="item.type === 'IssueCommentEvent'">
			<view class="title">
				<text selectable>{{ item.actor.login }}</text>
				<text class="event-action">{{ ' ' + item.payload.action + ' issue commit in ' }}</text>
				<text class="sub-title" style="color: #0965d2!important;" @tap="clickRepoDetail(item.repo.name)">{{ item.repo.name }}</text>
			</view>
		</block>
		<block v-if="item.type === 'IssuesEvent'">
			<view class="title">
				<text selectable>{{ item.actor.login }}</text>
				<text class="event-action">{{ ' ' + item.payload.action + ' issue in ' }}</text>
				<text class="sub-title" style="color: #0965d2!important;" @tap="clickRepoDetail(item.repo.name)">{{ item.repo.name }}</text>
			</view>
		</block>
		<block v-if="item.type === 'MemberEvent'">
			<view class="title">
				<text selectable>{{ item.actor.login }}</text>
				<text class="event-action">{{ ' ' + item.payload.action + ' member ' }}</text>
				<text class="sub-title" style="color: #0965d2!important;">{{ item.payload.member.name }}</text>
				<text class="event-action">{{ ' in ' }}</text>
				<text class="sub-title" style="color: #0965d2!important;" @tap="clickRepoDetail(item.repo.name)">{{ item.repo.name }}</text>
			</view>
		</block>
		<block v-if="item.type === 'PublicEvent'">
			<view class="title">
				<text selectable>{{ item.actor.login }}</text>
				<text class="event-action">{{ ' made ' }}</text>
				<text class="sub-title" style="color: #0965d2!important;" @tap="clickRepoDetail(item.repo.name)">{{ item.repo.name }}</text>
				<text class="event-action">{{ ' public ' }}</text>
			</view>
		</block>
		<block v-if="item.type === 'PullRequestEvent'">
			<view class="title">
				<text selectable>{{ item.actor.login }}</text>
				<text class="event-action">{{ ' ' + item.payload.action + ' pull request ' }}</text>
				<text class="sub-title" style="color: #0965d2!important;" @tap="clickRepoDetail(item.repo.name)">{{ item.repo.name }}</text>
			</view>
		</block>
		<block v-if="item.type === 'PullRequestReviewCommentEvent'">
			<view class="title">
				<text selectable>{{ item.actor.login }}</text>
				<text class="event-action">{{ ' ' + item.payload.action + ' pull request review commit ' }}</text>
				<text class="sub-title" style="color: #0965d2!important;" @tap="clickRepoDetail(item.repo.name)">{{ item.repo.name }}</text>
			</view>
		</block>
		<block v-if="item.type === 'PushEvent'">
			<view class="title">
				<text selectable>{{ item.actor.login }}</text>
				<text class="event-action">{{ ' ' + item.payload.action + ' push ' }}</text>
				<text class="sub-title" style="color: #0965d2!important;" @tap="clickRepoDetail(item.repo.name)">{{ item.repo.name }}</text>
			</view>
		</block>
		<block v-if="item.type === 'ReleaseEvent'">
			<view class="title">
				<text selectable>{{ item.actor.login }}</text>
				<text class="event-action">{{ ' ' + item.payload.action + ' release ' }}</text>
				<text class="sub-title" style="color: #0965d2!important;" @tap="clickRepoDetail(item.repo.name)">{{ item.repo.name }}</text>
			</view>
		</block>
		<block v-if="item.type === 'SponsorshipEvent'">
			<view class="title">
				<text selectable>{{ item.actor.login }}</text>
				<text class="event-action">{{ ' ' + item.payload.action + ' sponsorship ' }}</text>
				<text class="sub-title" style="color: #0965d2!important;" @tap="clickRepoDetail(item.repo.name)">{{ item.repo.name }}</text>
			</view>
		</block>
		<view class="remark2"><text class="iconfont icongithub-star margin-right-xs" />{{ $u.timeFrom(new Date(item.created_at).getTime(), 'yyyy-mm-dd hh:MM:ss') }}</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			}
		},
		methods: {
			clickRepoDetail(repoName) {
				const tmp = this.$_.split(repoName, '/')
				uni.navigateTo({
					url: `/pages/repos/detail?owner=${tmp[0]}&repo=${tmp[1]}`
				})
			}
		}
	}
</script>
