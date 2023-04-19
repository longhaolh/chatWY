<template>
	<view class="content">
		<ChatItem :chatContent="item" :isMe="item.isme" v-for="(item,index) in chatInfo" :key="index"></ChatItem>
		<ChatInput @sendMsg="addChatInfo" :inputMode="interface.textInput" :userinfo="myInfo"></ChatInput>
	</view>
</template>

<script>
	import ChatItem from "../../components/chatItem/index.vue";
	import ChatInput from "../../components/chatInput/index.vue";
	export default {
		data() {
			return {
				chatInfo: [{
						isme: true, //true为自己的消息 false为他人消息
						avatar: '../../static/images/me.jpg', //头像
						nickName: "锄禾", //昵称
						content: "锄禾日当午，汗滴禾下土", //聊天内容
						cancel: false, //是否已撤回
						type: '0' ,//内容类型 0纯文本 1带emoji表情 2图片 3转账 4红包 5语音
						id:100,//聊天记录id
						timeStamp:1674213110//时间戳
					},
					{
						isme: false, //true为自己的消息 false为他人消息
						avatar: '../../static/images/you.jpg', //头像
						nickName: "当午", //昵称
						content: "谁知盘中餐，粒粒皆辛苦", //聊天内容
						cancel: false, //是否已撤回
						type: '0' ,//内容类型 0纯文本 1带emoji表情 2图片 3转账 4红包 5语音
						id:101,//聊天记录id
						timeStamp:1674213218//时间戳
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
				interface:{
					backgroundImage:'',//聊天界面背景图
					draktheme:false,//是否开启深色模式
					textInput:true,//是否为文字输入模式
				}//界面设置
			}
		},
		components: {
			ChatItem,
			ChatInput
		},
		onLoad(options) {
			if(this.robotInfo.nickName){
				uni.setNavigationBarTitle({
					title:this.robotInfo.nickName
				})
			}
		},
		methods: {
			// 添加聊天记录
			addChatInfo(data) {
				let chatObj = {}
				console.log("data: ",data);
				if(data.isme){
					
				}
				// chatObj
				this.chatInfo.push(data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>