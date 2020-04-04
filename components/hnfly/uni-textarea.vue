<template>
	<view class="box">
		<label :class="['label',labelfocus,value?'labelfocus':'']">{{msg}}</label>
		<textarea 
			:class="['inputitem',value?'inval':'']" 
			@focus="focus" 
			@blur="blur" 
			@input="input" 
			:type='type'
			:value="value"
			:name="name"
			:id="name"
			:disabled="disabled"
			:password="password"
			 rows=5
		></textarea>
	</view>
</template>

<script>
	export default {
		data() {
			var This = this;
			return {
				labelfocus:'',
				msg:This.value?This.after:This.before
			};
		},
		props: {
			type: {
				type: String,
				value: 'text'
			},
			password: {
				type: Boolean,
				value: false
			},
			name:{
				type: String,
				value: ''
			},
			before:{
				type: String,
				value: '请输入'
			},
			after:{
				type: String,
				value: '名称'
			},
			value:{
				type: String,
				value:''
			},
			disabled:{
				type:Boolean,
				value:false
			},
			errmsg:{
				type: String,
				value: ''
			}
		},
		created() {
			var This = this;
			This.labelfocus = This.value ? 'labelfocus' : '';
		},
		methods:{
			focus: function (e) {
				var This = this;
				var val = e.detail.value;
				This.labelfocus = 'labelfocus';
			},
			blur: function (e) {
				var This = this;
				This.$emit("blur", e);
				var val = e.detail.value;
				if(val!=''){
					This.labelfocus = 'labelfocus';
				}else{
					This.labelfocus = '';
					This.value = '';
				}
			},
			input: function (e) {
				var This = this;
				var val = e.detail.value;
				This.msg = val!='' ? This.after : This.before;
			}
		}
	}
</script>

<style>
.box {position: relative;height: 70px;padding: 0;margin: 0;width: 90%;display: block; }
.box .label {position: absolute;left: 0;top: 24px;font-size: 16px;color: #999;transition-duration: .2s; }
.box .label.labelfocus {top: 5px;transition-duration: .2s;font-size: 10px;color: #aaa; }
.box .inputitem {height: 26px; line-height: 26px;padding: 20px 0 10px 0; transition-duration: .2s;font-size:16px;color: #5D5D5D;position: absolute;top: 0;left: 0;width: 100%; border-bottom: 1px solid #5D5D5D; transition :border-bottom,1s}
.box .inputitem:hover{border-bottom: 1px solid #8a8a8a;}
.box .inputitem:disabled {color: #5D5D5D;-webkit-text-fill-color:#5D5D5D; }
.box .label.labelfocus + .inputitem {padding: 28px 0 0 0; transition-duration: .1s;color: #5D5D5D;}
.box .inval {color: #5D5D5D; }
.box input:disabled {-webkit-text-fill-color: #5D5D5D!important;-webkit-opacity: 1!important;color: #5D5D5D!important; }
</style>
