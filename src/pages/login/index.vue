<template>
	<div class="page-wrapper">
		<div class="login-wrapper">
			<el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">
	        	<h1 class="login-title">登录</h1>
		        <el-form-item prop="username">
					<el-input
					class="input-item"
					v-model="loginForm.username"
					placeholder="请输入账号"
					name="username"
					type="text"
					auto-complete="on"/>
		        </el-form-item>
		        <el-form-item prop="password">
					<el-input
					class="input-item"
					type="password"
					v-model="loginForm.password"
					placeholder="请输入密码"
					name="password"
					auto-complete="on"
					@keyup.enter.native="handleLogin" />
			    </el-form-item>
		      <!-- <el-form-item prop="text">
						<el-input
						class="input-item v-code"
						type="text"
						v-model="loginForm.vCode"
						placeholder="请输入验证码"
						name="password"
						auto-complete="on"
						@keyup.enter.native="handleLogin" />
						<img class="v-code-image" :src="vCodeImg"/>
		      </el-form-item> -->
		       	<el-button type="primary" class="form-submit" @click.native.prevent="handleLogin">登 录</el-button>
			</el-form>
		</div>
  	</div>
</template>
<script>
import chip from "./index";
export default chip;
</script>
<style lang="scss" scoped>
	.page-wrapper{
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		background: url('../../assets/image/bg.jpg') no-repeat no-repeat;
		background-size: 100% 100%;
		overflow: hidden;
		// background-position:center;
	}
	.login-wrapper{
		position: absolute;
		top: 50%;
		left: 50%;
		width: 360px;
		background : #fff;
		border-radius: 6px;
		padding: 16px 40px 30px;
		transform: translate(-50%,-50%);
		.login-title{
			font-size: 18px;
			line-height: 1;
			font-weight: normal;
			margin-bottom: 30px;
		}
		.input-item{
			border: 1px solid #bbb;
			border-radius: 6px;
			&.v-code{
				width: 160px;
				float: left;
			}
		}
		.v-code-image{
			height: 42px;
			width: 100px;
			float: right;
			border-radius: 6px;
		}
		.form-submit{
			background: rgb(0,153,153);
			width: 100%;
		}
	}
</style>