<template>
	<div class="page-wrapper">
		<h3 class="page-title">添加交通信息</h3>
		<div class="input-wrapper">
			<div class="i-inner-wrapper">
				<div class="input-item">
					<span class="input-name"><em class="tips">*</em>方案名称:</span>
					<el-input class="input-value" v-model="formData.carBrand" placeholder="请输入方案名称"></el-input>
				</div>
				<div class="input-item">
					<span class="input-name"><em class="tips">*</em>交通方式:</span>
					<el-select class="input-value" filterable v-model="formData.carStyle" placeholder="请选择交通方式">
				    <el-option
				      v-for="item in carTypeList"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				</div>
				<div class="input-item">
					<span class="input-name"><em class="tips"></em>车辆型号:</span>
					<el-input class="input-value" v-model="formData.carMode" placeholder="请输入型号"></el-input>
				</div>
				<div class="input-item">
					<span class="input-name"><em class="tips"></em>座位数:</span>
					<el-input class="input-value" v-model="formData.seatsNumber" placeholder="请输入座位数"></el-input>
				</div>
				<div class="input-item">
					<span class="input-name"><em class="tips">*</em>价格:</span>
					<el-input class="input-value" v-model="formData.priceDay" placeholder="请输入价格"></el-input>
					<span class="input-des">元/天</span>
				</div>
				<div class="input-item">
					<span class="input-name"><em class="tips"></em>上传图片:</span>
					<Upload accept=".png,.jpeg,.jpg" file-size="2" limit="8" file-type="image" @fileChange="carImageChange" :file-list="carImage"/>
				</div>
				<div class="btn-wrapper">
					<el-button v-if="pageType == 1" class="submit-btn" type="primary" @click="addAction()">确认添加</el-button>
					<el-button v-else class="submit-btn" type="primary" @click="modifyAction()">确认更改</el-button>
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