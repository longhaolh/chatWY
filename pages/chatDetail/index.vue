<template>
	<view class="content">
		<ChatItem :chatContent="item" :isMe="item.isme" v-for="(item,index) in chatInfo" :key="index"></ChatItem>
	</view>
</template>

<script>
	import ChatItem from "../../components/chatItem/index.vue";
	export default {
		data() {
			return {
				chatInfo: [{
						isme: true, //true为自己的消息 false为他人消息
						avatar: '../../static/images/me.jpg', //头像
						nickName: "锄禾", //昵称
						content: "锄禾日当午，汗滴禾下土", //聊天内容
						cancel: false, //是否已撤回
						type: '0' //内容类型 0纯文本 1带emoji表情 2图片 3转账 4红包
					},
					{
						isme: false, //true为自己的消息 false为他人消息
						avatar: '../../static/images/you.jpg', //头像
						nickName: "当午", //昵称
						content: "谁知盘中餐，粒粒皆辛苦", //聊天内容
						cancel: false, //是否已撤回
						type: '0' //内容类型 0纯文本 1带emoji表情 2图片 3转账 4红包
					}
				], //聊天记录
				robotInfo: {
					avatar: "../../static/images/you.jpg", //头像
					nickName: "当午" //昵称
				}, //聊天对象的基本信息
				myInfo: {
					avatar: "../../static/images/me.jpg", //头像
					nickName: "锄禾" //昵称
				}, //自己的基本信息
			}
		},
		components: {
			ChatItem
		},
		onLoad(options) {
			
		},
		methods: {
			// 添加聊天记录
			addChatInfo(who) {
				let chatObj = {}
				chatObj
				this.chatInfo.push(arr)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>