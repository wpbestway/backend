<template>
	<div class="page-wrapper">
		<h3 class="page-title hide">添加景区信息</h3>
		<div class="input-wrapper">
			<div class="i-inner-wrapper">
				<div class="input-item">
					<span class="input-name"><em class="tips">*</em>景区名称:</span>
					<el-input class="input-value" v-model="formData.name" placeholder="请输入景区名称"></el-input>
				</div>
				<div class="input-item">
					<span class="input-name"><em class="tips">*</em>所在地区:</span>
					<el-select class="input-value" filterable v-model="formData.addr" placeholder="请选择">
				    <el-option
				      v-for="(item,index) in addressList"
				      :key="index"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				</div>
				<!-- <div class="input-item">
					<span class="input-name"><em class="tips"></em>游玩时长:</span>
					<el-input class="input-value" v-model="formData.durationPlay" placeholder="请输入游玩时长"></el-input>
					<span class="input-des">小时</span>
				</div> -->
				<div class="input-item">
					<span class="input-name"><em class="tips"></em>推荐浏览时长:</span>
					<el-input class="input-value" v-model="formData.openTimeArea" placeholder="请输入推荐浏览时长"></el-input>
					<span class="input-des">小时</span>
				</div>
				<div class="input-item">
					<span class="input-name"><em class="tips">*</em>门票:</span>
					<el-input class="input-value" v-model="formData.price" placeholder="请输入门票价格"></el-input>
					<span class="input-des">元</span>
				</div>
				<div class="input-item">
					<span class="input-name"><em class="tips"></em>上传景区视频:</span>
					<Upload accept=".mp4,.3gp,.m3u8" file-size="20" limit="8" file-type="video" @fileChange="scenicVideoChange" :file-list="scenicVideo"/>
				</div>
				<div class="input-item">
					<span class="input-name"><em class="tips"></em>上传景区图片:</span>
					<Upload accept=".png,.jpeg,.jpg" file-size="2" limit="8" file-type="image" @fileChange="scenicMainChange" :file-list="scenicMainImgs"/>
				</div>
				<div class="input-item">
					<span class="input-name"><em class="tips">*</em>景区线上应用：</span>
					<el-select class="input-value" filterable v-model="formData.onlineModel" placeholder="请选择">
				    <el-option
				      v-for="item in siteTypeList"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				</div>
				<div class="input-item">
					<span class="input-name"><em class="tips" v-if="formData.onlineModel == 1">*</em>景区封面(横图):</span>
					<Upload accept=".png,.jpeg,.jpg" file-size="2" limit="1" file-type="image" @fileChange="scenicCoverChange" :file-list="scenicCoverImg"/>
				</div>
				<div class="input-item">
					<span class="input-name"><em class="tips" v-if="formData.onlineModel == 1">*</em>景区封面(竖图):</span>
					<Upload accept=".png,.jpeg,.jpg" file-size="2" limit="1" file-type="image" @fileChange="scenicCoverSubChange" :file-list="scenicCoverSubImg"/>
				</div>
				<div class="input-item">
					<span class="input-name"><em class="tips">*</em>景区介绍:</span>
					<el-input
					  type="textarea"
					  class="input-value"
					  :autosize="{ minRows: 4, maxRows: 8}"
					  placeholder="请输入景区介绍"
					  v-model="formData.scenicMark">
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