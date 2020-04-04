<template>
	<view class="box">
		<view  >
			<text>您正在为这场会议签到：</text>
			<uniInput before="会议名称" after="会议名称" :value="meeting.meetingName" :disabled="display" name="meetingname" ></uniInput>
			<uniInput before="会议地址" after="会议地址" :value="meeting.address" :disabled="display" name="address" ></uniInput>
			<uniInput before="会议时间" after="会议时间" :value="meeting.dateTime" :disabled="display" name="date" ></uniInput>
			<button type="primary" size="mini" @click="signin()" >确定</button>
			<button type="default" size="mini" @click="backoff()">取消</button>
		</view>
		
	</view>
	
</template>

<script>
	import uniInput from '../../components/hnfly/uni-input.vue';
	import oidc from '../../js/is4Request.js'
	export default {
		components:{uniInput},
		data(){
			return {
				display:true,
				meeting:{}
			}
		},
		onLoad(option) {
			//接收传递数据，展示传递数据
			this.meeting= JSON.parse(option.meeting);
		},
		methods:{
			//签到
			signin(){
				let _this=this;
				
				let token='';
				//读取token
				uni.getStorage({
					key:'token',
					success(res) {
						token=res.data;
					}
				})
				
				
				uni.request({
					header:{'Authorization':token},
					url:getApp().globalData.apiUrl+"/api/User_Meeting/"+_this.meeting.meetingId,
					method:"POST",
					data:{
					},
					success(res) {
						if(res.statusCode==401){
							oidc.refresh(_this.signin);
						}
						
						if(res.statusCode==500){
							uni.showToast({
							    icon: 'none',
							    title: '服务器出错请重试！'
							});
						}
						else{
							uni.showToast({
							    icon: 'none',
							    title: res.data
							});
							
							setTimeout(function(){
								uni.navigateBack({})
							},1500)
						}
						
					}
				})
			},
			//后退
			backoff(){
				uni.navigateBack({})
			}
		}
	}
</script>

<style>
	.box{
		width: 600upx; 
		margin: 15upx auto;
		color: #999;
		
	}
	.tag{
		margin-top: 12px;
	}
	button{
		margin-bottom: 15upx;
		width: 100%;
	}
</style>
