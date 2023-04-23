<template>
	<view class="content" >
		<scroll-view class="scroll-view" scroll-y="true" :style="`height:${(systemInfo.windowHeight*2) - KeyboardHeight*2 - 88- 120 }rpx;`">
			<ChatItem :chatContent="item" :robotInfo="robotInfo" :isMe="item.isme" v-for="(item,index) in chatInfo" :key="index"></ChatItem>
		</scroll-view>
		<ChatInput :keyBoardUp="keyBoardUp" @statusChange="computeHeight" class="inputBox" @sendMsg="addChatInfo" :inputMode="interface.textInput" :userinfo="myInfo"></ChatInput>
		<!-- 设置选项 -->
		<uni-drawer ref="showRight" mode="right" class="setting" :width="systemInfo.windowWidth*0.6">
			<scroll-view style="height: 100%;" scroll-y="true">
				<uni-collapse  accordion v-model="accordionVal">
					<uni-collapse-item title="聊天对象设置">
						<view class="setting-item">
							<view class="left">头像</view>
							<view class="right">
								<view class="upImage" @click="chooseAvatar">选择</view>
							</view>
						</view>
						<view class="setting-item">
							<view class="left">昵称</view>
							<view class="right">
								<input @blur="changeRobotName" type="text" :placeholder="robotInfo.nickName" v-model="robotName">
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="'我'的设置">
						<view class="setting-item">
							<view class="setting-item">
								<view class="left">头像</view>
								<view class="right">
									<view class="upImage" @click="chooseAvatar">选择</view>
								</view>
							</view>
							<view class="setting-item">
								<view class="left">昵称</view>
								<view class="right">
									<input @blur="changeMyName" type="text" :placeholder="myInfo.nickName" v-model="MyName">
								</view>
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="其他设置">
						<view class="setting-item">
							<text class="text">手风琴效果同时只会保留一个组件的打开状态，其余组件会自动关闭。</text>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</scroll-view>
		</uni-drawer>
	</view>
</template>

<script>
import ChatItem from "../../components/chatItem/index.vue";
import ChatInput from "../../components/chatInput/index.vue";
import {mapState} from 'vuex' //引入mapGetters
import store from '@/store/index.js'
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
				},//界面设置
				keyBoardUp:false,
				accordionVal:'0',
				robotName:"",
				MyName:""
			}
		},
		components: {
			ChatItem,
			ChatInput
		},
		watch:{
			'robotInfo.nickName': {
			    handler(newV) {
			        uni.setNavigationBarTitle({
			        	title:newV
			        })
			    },
			    immediate: true
			}
		},
		computed: mapState([
			'systemInfo',
			'KeyboardHeight'
		]),
		onLoad(options) {
			console.log("storage ",uni.getStorageSync('robotInfo'));
			if(uni.getStorageSync('robotInfo')){
				this.robotInfo = JSON.parse(uni.getStorageSync('robotInfo'))
				uni.setNavigationBarTitle({
					title:this.robotInfo.nickName
				})
			}else{
				uni.setNavigationBarTitle({
					title:this.robotInfo.nickName
				})
			}
			this.computeHeight()
		},
		// 打开设置界面
		onNavigationBarButtonTap() {
			this.$refs.showRight.open();
		},
		methods: {
			// 添加聊天记录
			addChatInfo(data) {
				let chatObj = {}
				console.log("添加新记录: ",data);
				// chatObj
				this.chatInfo.push(data)
			},
			// 动态计算聊天区的高度
			computeHeight(){
				uni.onKeyboardHeightChange(res => {
					if(res.height>0){
						this.keyBoardUp=true
					}else{
						this.keyBoardUp=false
					}
					store.commit('updateKeyboardHeight', res.height)
				})
			},
			chooseAvatar(){
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						if(that.accordionVal=='0'){
							that.robotInfo.avatar = res.tempFilePaths[0]
							that.setRobotInfo()
						}else if(that.accordionVal=='1'){
							that.myInfo.avatar = res.tempFilePaths[0]
							that.setMyInfo()
						}
					}
				});
			},
			changeRobotName(){
				this.robotInfo.nickName = this.robotName
				this.setRobotInfo()
			},
			changeMyName(){
				this.myInfo.nickName = this.MyName
				this.setRobotInfo()
			},
			// 修改机器人信息
			setRobotInfo(){
				uni.setStorageSync('robotInfo',JSON.stringify(this.robotInfo))
				this.$forceUpdate()
			},
			// 修改我的信息
			setMyInfo(){
				uni.setStorageSync('MyInfo',JSON.stringify(this.MyInfo))
				this.$forceUpdate()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>