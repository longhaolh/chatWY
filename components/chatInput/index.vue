<template>
	<view class="chat-input">
		<view class="mode">
			<uni-icons custom-prefix="iconfont" type="icon-yuyin" size="30"></uni-icons>
		</view>
		<view class="center">
			<!-- 文本输入 -->
			<uni-easyinput v-if="inputMode" class="input-box" :clearable="false" type="textarea" autoHeight :inputBorder="false" v-model="Msg" />
			<!-- 语音输入 -->
			<view class="talk-input" v-else></view>
		</view>
		<view class="emoji">
			<uni-icons custom-prefix="iconfont" type="icon-biaoqing" size="30"></uni-icons>
		</view>
		<view class="right">
			<uni-icons custom-prefix="iconfont" type="icon-tianjia" size="30" v-if="!Msg"></uni-icons>
			<text class="send-btn" v-if="Msg" @click="send">发送</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"chatInput",
		data() {
			return {
				Msg:"",//文本输入框内容
			};
		},
		props:{
			inputMode:{
				type:Boolean,
				default:true
			},
			userinfo:{
				type:Object,
				default:{}
			}
		},
		methods:{
			send(){
				let obj = {}
				obj.isme=true,
				obj.avatar=this.$props.userinfo.avatar
				obj.nickName=this.$props.userinfo.nickName
				obj.cancel=false
				obj.type="0",
				obj.id = Math.random()*100000000000
				obj.timeStamp = new Date().getTime()
				obj.content=this.Msg
				this.$emit('sendMsg',obj)
				this.Msg = ''
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>