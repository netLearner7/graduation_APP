<template  >
	<!-- 首页 -->
	<view class="content">
		<view class="my-div">
			<view class="my-div-conter" @tap="scan()" >
				<img src="../../static/icon/scan.svg" alt="example" width="80%" style="margin: 0 auto;" >
			</view>
			<view class="my-div-conter">
				扫描二维码签到
			</view>
		</view>
		
		<view class="my-div">
			<view class="my-div-conter" @tap="goCreate()">
				<img src="../../static/icon/create.svg" alt="example" width="80%" style="margin: 0 auto;" >
			</view>
			<view class="my-div-conter">
				参加会议
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
		},
		methods: {
			//扫描二维码
			scan(){
				let dataArr=[];
				// 只允许通过相机扫码
				uni.scanCode({
				    onlyFromCamera: true,
				    success: function (res) {
				       dataArr= res.result.split(" ");
					   //判断扫描的是不是本系统的二维码
					   if(dataArr[0]!="graduation"){
						   uni.showToast({
						       icon: 'none',
						       title: '请扫描正确的二维码！'
						   });
						   return;
					   }
					   //读取扫描的数据
					   let str= JSON.stringify({
						   meetingId:parseInt(dataArr[1]),
						   meetingName:dataArr[2],
						   address:dataArr[3],
						   dateTime:dataArr[4]
					   })
					   
					   //跳转
					   uni.navigateTo({
					   	url:"../signin/signin?meeting="+str
					   })
					   
				    }
				});
			},
			
			//报名议会跳转
			goCreate(){
				uni.navigateTo({
					url:"../attend/attend"
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 25upx;
		color: #5d5d5d;
	}
	.my-div{
		width: 550upx;
		height:550upx; 
		margin-bottom: 25upx;
		border-radius:35upx;
		box-shadow:0upx 0upx 60upx 0upx rgba(18,150,219,0.3);
	}
	.my-div:hover{
		box-shadow:0upx 0upx 60upx 0upx rgba(18,150,219,0.6);
	}
	
	.my-div-conter{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 15upx;
	}

</style>
