<template>
	<view class="chat-item">
		<view :class="chatContent.isme?'me':'other'">
			<view class="textinfo" v-if="isMe"><text>{{chatContent.content}}</text></view>
			<view class="avatar">
				<image :src="chatContent.avatar" mode="widthFix"></image>
			</view>
			<view class="textinfo" v-if="!isMe"><text>{{chatContent.content}}</text></view>
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
		}
	},
	created() {
		console.warn(" 聊天数据: ",this.$props.chatContent);
	},
	methods:{
		
	}
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>