<template>
	<view @tap="click" class="u-cell-item-box" :class="{'u-cell-border': itemIndex > 0 }" hover-stay-time="150"
	 :hover-class="hover ? 'u-hover-class' : ''" :style="{
		backgroundColor: bgColor
	}">
		<view class="u-cell-content">
			<view class="u-icon-wrap" v-if="icon">
				<u-icon size="32" :name="icon" class="u-icon"></u-icon>
			</view>
			<view class="u-icon-wrap">
				<slot name="icon"></slot>
			</view>
			<view class="u-cell-title" :style="[titleStyle]">
				<text class="u-title-text" v-if="title">{{title}}</text>
				<slot name="left"></slot>
			</view>
			<view class="u-cell-value" v-if="value">
				<text class="u-value-text" :style="[valueStyle]" v-if="value">{{value}}</text>
			</view>
			<view v-else class="u-slot-wrap">
				<slot name="right"></slot>
			</view>
			<view :style="[arrowStyle]" class="u-icon-wrap">
				<u-icon v-if="arrow" size="26" class="u-arror-right" color="#969799" name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="u-cell-label" v-if="label" :style="[labelStyle]">
			{{label}}
		</view>
	</view>
</template>

<script>
	/**
	 * cellItem 单元格Item
	 * @description cell单元格一般用于一组列表的情况，比如个人中心页，设置页等。搭配u-cell-group使用
	 * @tutorial https://www.uviewui.com/components/cell.html
	 * @property {String} title 左侧标题
	 * @property {String} icon 左侧图标名，只支持uView内置图标，见Icon 图标
	 * @property {String} value 右侧内容
	 * @property {String} label 标题下方的描述信息
	 * @property {Boolean} border 是否显示每个cell的下边框（默认true）
	 * @property {Boolean} hover 是否开启点击反馈，hover-class形式，如果右侧通过slot传递switch进去的话，可以将此值设置为false（默认true）
	 * @property {Boolean} arrow 是否显示右侧箭头（默认true）
	 * @property {Boolean} arrow-direction 箭头方向，可选值（默认right）
	 * @property {Object} title-style 标题样式，对象形式
	 * @property {Object} value-style 右侧内容样式，对象形式
	 * @property {Object} label-style 标题下方描述信息的样式，对象形式
	 * @property {String} bg-color 背景颜色（默认#ffffff）
	 * @property {String Number} index 用于在click事件回调中返回，标识当前是第几个Item
	 * @example <u-cell-item icon="integral-fill" title="会员等级" value="新版本"></u-cell-item>
	 */
	export default {
		name: "u-cell-item",
		props: {
			// 左侧图标名称(只能uView内置图标)，或者图标src
			icon: {
				type: String,
				default: ''
			},
			// 左侧标题
			title: {
				type: String,
				default: ''
			},
			// 右侧内容
			value: {
				type: String,
				default: ''
			},
			// 标题下方的描述信息
			label: {
				type: String,
				default: ''
			},
			// 是否显示内边框
			border: {
				type: Boolean,
				default: true
			},
			// 是否开启点击反馈，即点击是cell背景为灰色
			hover: {
				type: Boolean,
				default: true
			},
			// 是否显示右侧箭头
			arrow: {
				type: Boolean,
				default: true
			},
			// 右侧箭头方向，可选值：right|up|down，默认为right
			arrowDirection: {
				type: String,
				default: 'right'
			},
			// 控制标题的样式
			titleStyle: {
				type: Object,
				default () {
					return {};
				}
			},
			// 右侧显示内容的样式
			valueStyle: {
				type: Object,
				default () {
					return {};
				}
			},
			// 描述信息的样式
			labelStyle: {
				type: Object,
				default () {
					return {};
				}
			},
			// 背景颜色
			bgColor: {
				type: String,
				default: '#ffffff'
			},
			// 用于识别被点击的是第几个cell
			index: {
				type: [String, Number],
				default: ''
			}
		},
		inject: ['uCellGroup'],
		data() {
			return {
				itemIndex: 0,
			}
		},
		created() {
			this.itemIndex = this.uCellGroup.index++;
		},
		computed: {
			arrowStyle() {
				let style = {};
				if (this.arrowDirection == 'top') style.transform = 'rotate(-90deg)';
				else if (this.arrowDirection == 'bottom') style.transform = 'rotate(90deg)';
				else style.transform = 'rotate(0deg)';
				return style;
			}
		},
		methods: {
			click() {
				this.$emit('click', this.index);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-cell-item-box {
		padding: 28rpx 32rpx;
		position: relative;
	}

	.u-cell-border:after {
		left: 32rpx !important;
		position: absolute;
		box-sizing: border-box;
		content: ' ';
		pointer-events: none;
		right: 0;
		top: 0;
		border-bottom: 1px solid $u-border-color;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.u-cell-content {
		display: flex;
		align-items: center;
	}

	.u-cell-title {
		color: #323233;
		font-size: 30rpx;
		flex: 1;
		margin-left: 6rpx;
		text-align: left;
	}

	.u-cell-value {
		flex: 1;
		font-size: 26rpx;
		color: #969799;
		text-align: right;
	}

	.u-cell-label {
		color: #969799;
		font-size: 26rpx;
		margin-top: 10rpx;
		text-align: left;
	}

	.u-slot-wrap {
		display: flex;
		align-items: center;
	}

	// 微信小程序需要额外处理可能通过slot传入badge和switch的问题
	// 否则无法垂直居中
	/* #ifdef MP-WEIXIN */
	.u-slot-wrap /deep/ u-badge,
	.u-slot-wrap /deep/ u-switch {
		display: flex;
		align-items: center;
	}

	/* #endif */

	.u-icon {
		margin-right: 6rpx;
	}

	.u-value-text {
		margin-right: 10rpx;
	}

	.u-title-text {
		margin-right: 10rpx;
	}
</style>
