<template>
	<view>
		<view class="dateilsBox" v-if="isdisplay">
			
			<view class="textbox">
				<text style="">您是要参加这场会议么？</text>
			</view>
			
			<uniInput before="会议名称" after="会议名称" :value="data.meetingName" :disabled="isreadonly"  ></uniInput>
			<uniInput before="会议地点" after="会议地点" :value="data.address" :disabled="isreadonly" ></uniInput>
			<uniInput before="会议时间" after="会议时间" :value="data.date" :disabled="isreadonly" ></uniInput>
			
			<view class="buttonTeam">
				<uni-tag class="tag" text="取消" circle="true" @click="cancel()" ></uni-tag>
				<div class="gap"></div>
				<uni-tag  class="tag" text="确定" circle="true" @click="attend()" type="primary"  ></uni-tag>
			</view>
		</view>
	
		<view class="dataview">
			<wInput
				type="text"
				maxlength="11"
				placeholder="请输入邀请码"
				v-model="inviteCode"
				:disabled="iswrite"
			></wInput>			
			<wButton
				text="参加会议->"
				:rotate="isRotate" 
				@click.native="queryMeeting()"
				bgColor="#8a8a8a"
			></wButton>
		</view>
	</view>
</template>

<script>
	import uniInput from '../../components/hnfly/uni-input.vue';
	import wInput from '../../components/watch-login/watch-input.vue' 
	import wButton from '../../components/watch-login/watch-button.vue'
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import oidc from '../../js/is4Request.js'
	export default {
		components:{wInput,wButton,uniInput,uniTag},
		data(){
			return {
				//会议信息只读
				isreadonly:true,
				//是否显示会议信息
				isdisplay:false,
				//按钮动画
				isRotate:false,
				//邀请码输入框只读
				iswrite:false,
				//会议数据
				data:{
					meetingName:"年会",
					address:"山东省淄博市",
					date:"2020-12-03 12:00:00"
				},
				//邀请码
				inviteCode:"",
				//编码之后的邀请码
				encodeInviteCode:"",
				token:''
			}
		},
		methods:{
			//查询会议信息
			queryMeeting(){
				let _this=this;
				if(this.inviteCode.length<=0)
				{
					uni.showToast({
					    title: '请输入邀请码！',
						icon:'none',
						duration:800
					});
					return;
				}
				//读取数据
				uni.getStorage({
					key:'token',
					success(res) {
						_this.token=res.data;
					}
				})
				
				//进行编码
			    _this.encodeInviteCode=encodeURIComponent(_this.inviteCode);
				//解析邀请码
				uni.request({
					header:{'Authorization':_this.token},
					url:getApp().globalData.apiUrl+'/api/Meeting/analysisInviteCode',
					method:'GET',
					data:{
						inviteCode:_this.encodeInviteCode
					},
					success(res) {
						if(res.statusCode==401){
							oidc.refresh(_this.queryMeeting);
						}
						
						if(res.statusCode==200){
							//读取数据
							_this.data.meetingName=res.data.meetingName;
							_this.data.address=res.data.address;
							_this.data.dateTime=res.data.dateTime;
							//发起请求，显示数据
							_this.isdisplay=true;
							//禁用邀请码输入框
							_this.iswrite=true;
							return;
						}
						
						if(res.statusCode==500){
							uni.showToast({
								title:res.data,
								duration:1500,
								icon:'none'
							})
						}
						_this.inviteCode='';
					}
				})
				
			},
			//取消参加会议 重置表单
			cancel(){
				this.isdisplay=false;
				this.inviteCode="";
				this.data.name="";
				this.data.address="";
				this.data.date="";
				this.iswrite=false;
			},
			//确定参加会议
			attend(){
				let _this=this;
				let userId=''
				//读取userid
				uni.getStorage({
					key:'userId',
					success(res) {
						userId=res.data;
					}
				})
				
				//报名会议
				uni.request({
					header:{'Authorization':_this.token},
					url:getApp().globalData.apiUrl+"/api/User_Meeting",
					method:'POST',
					data:{
						inviteCode:_this.encodeInviteCode,
						userId:userId,
						User_MeetingStats:2
					},
					success(res) {						
						if(res.statusCode==401){
							oidc.refresh(_this.attend);
						}
						if(res.statusCode==201){							
							uni.showToast({
								title:'参会成功！',
								duration:1500
							})
							
							setTimeout(function(){
								uni.navigateBack({});
							},1500)		
							return;
						}
						if(res.statusCode==400){
							uni.showToast({
								icon:'none',
								title:res.data,
								duration:1500
							})
							return;
						}
						if(res.statusCode==500){
							uni.showToast({
								icon:'none',
								title:"服务器出错啦！",
								duration:1500
							})
							return;
						}
					}
				})
			}
		}
	}
</script>

<style>
	.dateilsBox{
		width: 600upx;
		margin: 0 auto;
		color: #999;
	}
	.buttonTeam{
		display: flex;
		justify-content: center;
	}
	.gap{
		width: 30px; 
		height: 100%;
	}
	.textbox{
		margin-bottom: 20upx; 
		margin-top: 20upx;
	}
	.dataview{
		width: 80%; 
		margin: 15px auto;
	}
</style>
