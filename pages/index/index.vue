<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<button type="primary" @click="toPage(0)">聊天界面</button>
			<text>聊天记录生成器V1.0</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			toPage(id){
				switch (id){
					case 0:
					uni.navigateTo({url:'/pages/chatDetail/index'})
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
		text{
			color: #999;
			font-size: 24rpx
		}
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
