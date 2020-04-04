<template>
	<view class="box">
		<view  >
			<uniInput before="会议名称" after="会议名称" :value="meeting.meetingName" :disabled="display" name="meetingname" ></uniInput>
			<uniInput before="会议地址" after="会议地址" :value="meeting.address" :disabled="display" name="address" ></uniInput>
			<uniInput before="会议时间" after="会议时间" :value="meeting.dateTime" :disabled="display" name="date" ></uniInput>
			<uniInput before="会议内容" after="会议内容" :value="meeting.content" :disabled="display" name="content" ></uniInput>
			<view>
				<lable style="font-size: 10px;">会议状态</lable>
				<uni-tag v-if="meeting.meetingState==1" class="tag" text="未开始" circle="true" type="warning"  inverted='true'></uni-tag>
				<uni-tag v-if="meeting.meetingState==2" class="tag" text="进行中" circle="true" type="success"  inverted='true'></uni-tag>
				<uni-tag v-if="meeting.meetingState==3" class="tag" text="已完成" circle="true" type="primary"  inverted='true'></uni-tag>
				<uni-tag v-if="meeting.meetingState==4" class="tag" text="已取消" circle="true" type="error"  inverted='true'></uni-tag>
			</view>
			
			<view>
				<lable style="font-size: 10px;">签到状态</lable>
				<uni-tag v-if="meeting.user_MeetingStats==1" class="tag" text="已签到" circle="true" type="success" ></uni-tag>
				<uni-tag v-if="meeting.user_MeetingStats==2" class="tag" text="未签到" circle="true" type="primary" ></uni-tag>
			</view>
			
			
		</view>
		
	</view>
	
</template>

<script>
	import uniInput from '../../components/hnfly/uni-input.vue';
	import unitextarea from '../../components/hnfly/uni-textarea.vue';
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	export default {
		components:{uniInput,uniTag,unitextarea},
		data(){
			return {
				meetingName:"",
				display:true,
				meeting:{}
			}
		},
		onLoad(option) {
			//接收传递数据，展示传递数据
			this.meeting= JSON.parse(option.meeting);
		}
	}
</script>

<style>
	.box{
		width: 600upx; 
		margin: 0 auto;
		color: #999;
	}
	.tag{
		margin-top: 12px;
	}
</style>
