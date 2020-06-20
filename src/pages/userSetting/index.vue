<template>
	<div class="page-wrapper">
		<div class="content-title">
			<h3 class="title">账户设置</h3> 
		</div>
		<div class="content-inner">
			<div class="setting-list">
				<div class="setting-item">
					<span class="setting-name"><em>*</em>人员姓名: </span>
					<el-input class="setting-value" v-model="userName" placeholder="请输入人员姓名"></el-input>
				</div>
				<div class="setting-item">
					<span class="setting-name"><em>*</em>手机号码: </span>
					<el-input class="setting-value" v-model="userPhone" placeholder="请输入手机号码"></el-input>
				</div>
				<div class="setting-item">
					<span class="setting-name"><em>*</em>登录密码: </span>
					<el-button class="s-btn" @click="sPassword()" type="primary">修改密码</el-button>
				</div>
			</div>
			<div class="setting-submit">
				<el-button class="s-btn" @click="sSubmit()" type="primary">提交</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import chip from "./index";
export default chip;
</script>
<style lang="scss" scoped>
	.page-wrapper{
		padding-right: 20px;
		.title{
			text-align: left;
			font-weight: bold;
			margin: 30px 0;
		}
		.content-inner{
			text-align: center;
			.setting-list{
				display: inline-block;
				text-align: left;
				.setting-item{
					margin-top: 20px;
					.setting-value{
						width: 240px;
					}
					em{
						color: #FF0000;
					}
					.s-btn{
						width: 240px;
					}
				}
			}
			.setting-submit{
				margin-top: 60px;
				text-align: center;
				.s-btn{
					margin-left: 80px;
					width: 240px;
				}
			}
		}
	}
</style>