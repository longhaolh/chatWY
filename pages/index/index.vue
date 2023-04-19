<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<button type="primary" @click="toPage(0)">聊天界面</button>
		</view>
		<text class="version">聊天记录生成器V1.0</text>
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

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.version {
		color: #ccc;
		font-size: 24rpx;
		margin-top: 36rpx;
		position: fixed;
		bottom: 20rpx;
		left: 50%;
		transform: translateX(-50%);
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
		flex-direction: column;
		
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
