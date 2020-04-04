<template>
	<!-- 行程页面 -->
	<view>
		<!-- 列表内容 -->
		<uni-list>
		    <uni-list-item v-for="(item,index) in dataList" :key='index' :title="item.meetingName" @tap="goDateils(index)" ></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import oidc from '../../js/is4Request.js'
	export default {
		components:{
			uniList,
			uniListItem
		},
		data(){
			return {
				//所有数据
				dataList:[],
				//传递给跳转页面的数据
				data:{},
			}
		},
		mounted() {
			let _this=this;
			_this.getdate();
		},
		onPullDownRefresh() {
			let _this=this;
			_this.getdate();
		    
		},
		methods:{
			//读取数据
			getdate(){
				let _this=this;
				let token='';
				//读取token
				uni.getStorage({
					key:'token',
					success(res) {
						token=res.data;
					}
				})
				
				//请求数据
				uni.request({
					header:{'Authorization':token},
					url:getApp().globalData.apiUrl+'/api/User_Meeting/TodayUserMeeting',
					success(res) {
						uni.stopPullDownRefresh();
						if(res.statusCode==200){
							_this.dataList=res.data
						}		
						if(res.statusCode==401){
							oidc.refresh(_this.getdate);
						}
					}
				})
			},
			//跳转并携带数据 
			goDateils(index){
				let _this=this;
				let str=JSON.stringify(_this.dataList[index])
				uni.navigateTo({
					url:"../dateils/dateils?meeting="+str
				})
			}
		}
	}
</script>

<style>
</style>
