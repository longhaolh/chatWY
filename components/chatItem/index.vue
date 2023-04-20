<template>
	<view class="chat-item">
		<view :class="chatContent.isme?'me':'other'">
			<block v-if="isMe">
				<view class="textinfo" v-if="chatContent.type=='0'">
					<text v-if="chatContent.type=='0'">{{chatContent.content}}</text>
				</view>
				<view class="image-msg">
					<image v-if="chatContent.imgUrl&&chatContent.type=='2'" :src="chatContent.imgUrl" ></image>
				</view>
			</block>
			<view class="avatar">
				<image :src="isMe?chatContent.avatar:robotInfo.avatar" mode="widthFix"></image>
			</view>
			<block v-if="!isMe">
				<view class="textinfo" v-if="chatContent.type=='0'">
					<text v-if="chatContent.type=='0'">{{chatContent.content}}</text>
				</view>
				<view class="image-msg">
					<image v-if="chatContent.imgUrl&&chatContent.type=='2'" :src="chatContent.imgUrl" ></image>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			
		}
	},
	props:{
		chatContent:{
			type:[Object,Array],
			default:[]
		},
		isMe:{
			type:Boolean,
			default:false
		},
		robotInfo:{
			type:Object,
			default:{}
		}
	},
	created() {
		console.warn(" 聊天数据: ",this.$props.chatContent,this.$parent.$data);
	},
	methods:{
		
	}
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>