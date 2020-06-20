<template>
	<div class="page-wrapper">
		<h3 class="page-title">添加线路信息</h3>
		<div class="input-wrapper">
			<div class="i-inner-wrapper">
				<div class="input-item">
					<span class="input-name"><em class="tips">*</em>线路名称:</span>
					<el-input class="input-value" v-model="formData.name" placeholder="请输入线路名称"></el-input>
				</div>
				<div class="input-item">
					<span class="input-name"><em class="tips">*</em>产品形式:</span>
					<el-select class="input-value" filterable v-model="formData.lineTravelType" placeholder="请选择产品形式">
				    <el-option
				      v-for="item in lineModeList"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				</div>
				<div class="input-item">
					<span class="input-name"><em class="tips">*</em>线路类型:</span>
					<el-select class="input-value" filterable v-model="formData.lineType" placeholder="请选择">
				    <el-option
				      v-for="item in lineTypeList"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				</div>
				<div class="input-item" v-if="formData.lineTravelType == 1">
					<span class="input-name"><em class="tips">*</em>跟团游价格:</span>
					<el-input class="input-value" v-model="formData.lineFee" placeholder="请输入跟团游价格"></el-input>
				</div>
				<div class="input-item">
					<span class="input-name"><em class="tips">*</em>天数:</span>
					<el-input class="input-value input-value-small" v-model="formData.days"></el-input><span class="i-v-split">天</span><el-input class="input-value input-value-small" v-model="formData.nights"></el-input><span class="i-v-split">晚</span>
				</div>
				<div class="input-item">
					<span class="input-name"><!-- <em class="tips" v-if="formData.lineTravelType == 1">*</em> -->上传路线视频:</span>
					<Upload accept=".mp4,.3gp,.m3u8" file-size="20" limit="8" file-type="video" @fileChange="lineVideoChange" :file-list="lineVideo"/>
				</div>
				<div class="input-item">
					<span class="input-name"><em class="tips" v-if="formData.lineTravelType == 1">*</em>上传线路封面:</span>
					<Upload accept=".png,.jpeg,.jpg" file-size="2" limit="1" file-type="image" @fileChange="lineCoverImgChange" :file-list="lineCoverImg"/>
				</div>
				<div class="input-item">
					<span class="input-name"><em class="tips"></em>产品链接:</span>
					<el-input class="input-value" v-model="formData.mallLink" placeholder="请输入产品链接"></el-input>
				</div>
				<div class="input-item">
					<span class="input-name"><em class="tips">*</em>线路介绍:</span>
					<el-input
					  type="textarea"
					  class="input-value"
					  :autosize="{ minRows: 4, maxRows: 8}"
					  placeholder="请输入线路介绍"
					  v-model="formData.lineMark">
					</el-input>
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
			}
			.input-name{
				display: inline-block;
				width: 120px;
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
				&.input-value-small{
					width: 150px;
				}
			}
			.i-v-split{
				font-size: 14px;
				width: 18px;
				text-align: center;
				display: inline-block;
				vertical-align: middle;
				margin: 0 6px;
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