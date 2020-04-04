<template>
	<!-- 登录页面 -->
	<view>
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image src="../../static/mylogo.png"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput
					type="text"
					maxlength="11"
					placeholder="用户名"
					v-model="userName"
				></wInput>
				<wInput
					type="password"
					maxlength="11"
					placeholder="密码"
					v-model="passWord"
				></wInput>
			</view>
			<wButton 
				text="登 录"
				:rotate="isRotate" 
				@click.native="startLogin()"
				style="margin-top: 96upx;"
			></wButton>
			
			<!-- 其他登录 -->
			<view class="other_login cuIcon">
				<view class="login_icon">
					<view class="cuIcon-weixin" ></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-weibo"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-github" ></view>
				</view>
			</view>
			
			<!-- 底部信息 -->
			<view class="footer">
				<text>Graduation Project ©2020 By 7</text>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import oidc from '../../js/is4Request.js'
	
	export default {
		data() {
			return {			
				userName:'', //用户/电话
				passWord:'', //密码
				isRotate: false, //是否加载旋转
			};
		},
		components:{
			wInput,
			wButton,
		},
		mounted() {
			_this= this;
		},
		methods: {
		    startLogin(){
				//登录
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.userName.length == "") {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '用户名不能为空'
				    });
				    return;
				}
		        if (this.passWord.length < 5) {
		            uni.showToast({
		                icon: 'none',
						position: 'bottom',
		                title: '密码不正确'
		            });
		            return;
		        }			
				
				_this.isRotate=true			
				
				//触发登录
				oidc.login(_this.userName,_this.passWord);
				
				setTimeout(function(){
					_this.isRotate=false;
				},1500)
		    }
			
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("../css/login.css");
</style>
