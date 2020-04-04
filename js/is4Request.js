
	//登录之后获取个人信息
	function getUserInfo(token){
		uni.request({
			header:{'Authorization':token},
			url:getApp().globalData.is4Url+"/connect/userinfo",
			success(res) {
				//存储信息
				uni.setStorage({
					key:'userId',
					data:res.data.sub
				})
				uni.setStorage({
					key:'userName',
					data:res.data.given_name
				})
				//跳转页面
				uni.switchTab({
					url:'../index/index'
				})
				
			}
		})
	}

	//登录方法
	function login(userName,passWord){
		//请求登录，保存token，跳转而页面
		uni.request({
			header: {'Content-Type': 'application/x-www-form-urlencoded'},  
			url:getApp().globalData.is4Url+"/connect/token",
			
			data:{
				//关键信息可以考虑加密
				client_id:'pwdClient',
				client_secret:'secret',
				grant_type:'password',
				
				//账号密码
				username:userName,
				password:passWord
			},
			method:'POST',
			success(res) {
				//如果请求成功
				if(res.statusCode==200){
					//存储token
					uni.setStorage({
						key:'token',
						data:"Bearer "+ res.data.access_token
					})
					
					//存储token
					uni.setStorage({
						key:'refresh_token',
						data:res.data.refresh_token
					})
					
				 	getUserInfo("Bearer "+ res.data.access_token);
					
				 }
				
				if (res.statusCode==400) {
					uni.showToast({
						title:'账号或密码错误！',
						duration:1500,
						icon:'none'
					})
				}
				
				if (res.statusCode==500) {
					uni.showToast({
						title:'服务器内部错误',
						duration:1500,
						icon:'none'
					})
				}
				
			}
		})
	}
	
	//刷新token方法
	function refresh(myfuntion){
		let refresh_token=''
		uni.getStorage({
			key:"refresh_token",
			success(res) {
				refresh_token=res.data;
			}
		})
		
		uni.request({
			header: {'Content-Type': 'application/x-www-form-urlencoded'},
			url:getApp().globalData.is4Url+"/connect/token",
			
			data:{
				//关键信息可以考虑加密
				client_id:'pwdClient',
				client_secret:'secret',
				grant_type:'refresh_token',
				refresh_token:refresh_token
			},
			method:'POST',
			success(res) {
				//如果请求成功
				if(res.statusCode==200){
					//存储token
					uni.setStorage({
						key:'token',
						data:"Bearer "+ res.data.access_token
					})
					
					//存储token
					uni.setStorage({
						key:'refresh_token',
						data:res.data.refresh_token
					})
					
					myfuntion();
				 }
			}
		})
	}


export default{
	login,refresh
}