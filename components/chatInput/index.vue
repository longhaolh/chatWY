<template>
	<view class="chat-input" >
		<view class="top">
			<view class="mode">
				<uni-icons custom-prefix="iconfont" type="icon-yuyin" size="30"></uni-icons>
			</view>
			<view class="center">
				<!-- 文本输入 -->
				<uni-easyinput @focus="changeHeight" @blur="changeHeight" :focus="inputFoucs" :maxlength="-1" v-if="inputMode" class="input-box" :clearable="false" type="textarea" autoHeight :inputBorder="false" v-model="Msg" />
				<!-- 语音输入 -->
				<view class="talk-input" v-else></view>
			</view>
			<view class="emoji">
				<uni-icons custom-prefix="iconfont" type="icon-biaoqing" size="30"></uni-icons>
			</view>
			<view class="right">
				<uni-icons @click="showSetting" custom-prefix="iconfont" type="icon-tianjia" size="30" v-if="!Msg"></uni-icons>
				<text class="send-btn" v-if="Msg" @click="send(false)" @longtap="send(true)">发送</text>
			</view>
		</view>
		<view class="bottom" v-show="settingVisible">
			<swiper class="swiper" indicator-dots>
				<swiper-item class="swiper-item">
					<view class="setting-item" v-for="(item,index) in setting[0]" :key="index">
						<view class="setting-item-icon" @click="chooseSetting(item.type)">
							<uni-icons custom-prefix="iconfont" :type="item.icon" size="24"></uni-icons>
						</view>
						<view class="setting-item-text">{{item.text}}</view>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<view  class="setting-item" v-for="(item,index) in setting[1]" :key="index">
						<view class="setting-item-icon" @click="chooseSetting(item.type)">
							<uni-icons  custom-prefix="iconfont" :type="item.icon" size="28"></uni-icons>
						</view>
						<view class="setting-item-text">{{item.text}}</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="wraper" @click="settingVisible=false"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"chatInput",
		data() {
			return {
				Msg:"",//文本输入框内容
				settingVisible:false,//设置栏是否打开
				inputFoucs:true,//输入框是否聚焦
				setting:[
					[{
						icon:'icon-xiangce',
						text:'相册',
						disabled:false,
						type:11
					},
					{
						icon:'icon-paishe',
						text:'拍摄',
						disabled:false,
						type:12
					},
					{
						icon:'icon-faceCall',
						text:'视频通话',
						disabled:false,
						type:13
					},
					{
						icon:'icon-weizhi',
						text:'位置',
						disabled:false,
						type:14
					},
					{
						icon:'icon-yuyinshuru',
						text:'语音输入',
						disabled:false,
						type:15
					},
					{
						icon:'icon-shoucang',
						text:'我的收藏',
						disabled:false,
						type:16
					},
					{
						icon:'icon-minpian',
						text:'名片',
						disabled:false,
						type:17
					},
					{
						icon:'icon-wenjian',
						text:'文件',
						disabled:false,
						type:18
					}],[
						{
							icon:'icon-wenjian',
							text:'音乐',
							disabled:false,
							type:19
						}
					]
				],//功能模块
			};
		},
		props:{
			inputMode:{
				type:Boolean,
				default:true
			},
			keyBoardUp:{
				type:Boolean,
				default:false
			},
			userinfo:{
				type:Object,
				default:{}
			}
		},
		methods:{
			// 发送信息
			send(notme,imgUrl){
				let obj = {}
				notme?obj.isme=false:obj.isme=true
				notme?obj.avatar='':obj.avatar=this.$props.userinfo.avatar
				notme?obj.nickName='':obj.nickName=this.$props.userinfo.nickName
				obj.cancel=false
				imgUrl?obj.type="2":obj.type='0'
				imgUrl?obj.imgUrl=imgUrl:''
				obj.id = parseInt(Math.random()*100000000000)
				obj.timeStamp = new Date().getTime()
				obj.content=this.Msg
				this.$emit('sendMsg',obj)
				this.Msg = ''
				this.inputFoucs=true
			},
			// 点击加号展开功能模块
			showSetting(){
				this.settingVisible = !this.settingVisible
				this.$emit('statusChange')
				this.inputFoucs=true
			},
			changeHeight(){
				this.$emit('statusChange')
			},
			// 获取相册所有图片
			getImageList() {
				uni.chooseImage({
					count: 9,
					sizeType: ['original'],
					sourceType: ['album'], //这要注意，camera调拍照，album是打开手机相册
					success: (res)=> {
						console.log("res: ",res);
						const tempFilePaths = res.tempFilePaths;
						if(tempFilePaths.length>1){
							tempFilePaths.forEach(e=>{
								this.send(false,e)
							})
						}else{
							this.send(false,tempFilePaths[0])
						}
					}
				});
			},
			// 点击功能模块
			chooseSetting(id){
				console.log('选择了',id);
				switch (id){
					case 11:
						this.getImageList()
						break;
					default:
							uni.showToast({
								title:'此功能暂未开放',
								icon:'none'
							})
							this.inputFoucs=false
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>