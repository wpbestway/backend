<template>
	<div class="page-wrapper">
		<h3 class="page-title">添加食物信息</h3>
		<div class="input-wrapper">
			<div class="i-inner-wrapper">
				<div class="input-item">
					<span class="input-name"><em class="tips">*</em>食物名称:</span>
					<el-input class="input-value" v-model="foodName" placeholder="请输入食物"></el-input>
				</div>
				<div class="input-item">
					<span class="input-name"><em class="tips">*</em>食物类型:</span>
					<el-select class="input-value" filterable v-model="foodType" placeholder="请选择">
				    <el-option
				      v-for="item in foodTypeList"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				</div>
				<div class="input-item">
					<span class="input-name"><em class="tips"></em>上传图片:</span>
					<el-upload
					  class="input-value"
					  drag
					  action="https://jsonplaceholder.typicode.com/posts/"
					  multiple>
					  <i class="el-icon-upload"></i>
					  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</div>
				<div class="input-item">
					<span class="input-name"><em class="tips"></em>食物特色:</span>
					<el-input
					  type="textarea"
					  class="input-value"
					  :autosize="{ minRows: 4, maxRows: 8}"
					  placeholder="请输入食物特色"
					  v-model="foodSpecial">
					</el-input>
				</div>
				<div class="btn-wrapper">
					<el-button class="submit-btn" type="primary">确认添加</el-button>
				</div>
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
		margin-top: 10px;
		text-align: left;
		.page-title{
			font-size: 14px;
			font-weight: bold;
			line-height: 24px;
			margin: 20px 0;
		}
		.input-wrapper{
			margin: 30px 0 ;
			text-align: center;
			font-size: 14px;
			.i-inner-wrapper{
				display: inline-block;
				text-align: left;
			}
			.input-item{
				margin-top: 42px;
				font-size: 14px;
			}
			.input-name{
				display: inline-block;
				width: 80px;
				font-size: 14px;
				line-height: 40px;
				text-align: right;
				margin-right: 8px;
				vertical-align: top;
				color: #666666;
				.tips{
					color: #FF0000;
					width: 5px;
					display: inline-block;
				}
			}
			.input-value{
				display: inline-block;
				width: 360px;
			}
			.input-des{
				font-size: 14px;
			}
			.btn-wrapper{
				margin: 42px;
				width: 100%;
				text-align: center;
				.submit-btn{
					display: inline-block;
					width: 320px;
				}
			}
			
		}
	}
</style>