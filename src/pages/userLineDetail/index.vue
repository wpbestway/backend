<template>
	<div class="page-wrapper">
		<h3 class="page-title">路线详情</h3>
		<div class="tab-list">
			<!-- <el-button icon="el-icon-plus" @click="addDay()" type="primary">添加天数</el-button> -->
			<el-tabs class="el-tabs-main" v-model="lineActive"  @tab-click="tabChange">
			    <el-tab-pane :label="'第'+dayMap[index]+'天'" :name="index.toString()" v-for="(item,index) in lineDaysList" :key="index">
			    	<div class="tab-title">行程内容</div>
			    	<div class="line-detail-list">
			    		<div class="line-detail-item"  v-for="(innerItem,innerIndex) in item.child" :key="innerIndex">
			    			<div class="l-d-i-name">{{innerItem.title}}</div>
		    				<div class="l-d-i-des">{{innerItem.des}}</div>
			    		</div>
			    	</div>
			    </el-tab-pane>
			    <el-tab-pane label="购买须知" name="buyMark">
			    	<el-input
						type="textarea"
						class="textarea-value"
						disabled
						:autosize="{ minRows: 15, maxRows: 30}"
						placeholder="请输入购买须知"
						v-model="lineInitInfo.buyMark">
					</el-input>
			    </el-tab-pane>
			    <el-tab-pane label="费用说明" name="feeMark">
			    	<el-input
						type="textarea"
						class="textarea-value"
						disabled
						:autosize="{ minRows: 15, maxRows: 30}"
						placeholder="请输入费用说明"
						v-model="lineInitInfo.feeMark">
					</el-input>
				</el-tab-pane>
		    </el-tabs>
		</div>
  </div>
</template>
<script>
import chip from "./index";
export default chip;
</script>
<style lang="scss">
	.dialog-wrapper.line-set{
		.el-dialog{
			width: 520px !important;
		}
	}
</style>
<style lang="scss" scoped>
	.page-wrapper{
		padding-right: 20px;
		margin-top: 10px;
		text-align: left;
		.page-title{
			font-weight: bold;
			line-height: 24px;
			margin: 20px 0;
		}
		.el-tabs-main{
			margin-top: 20px;
		}
		.tab-list{
			margin-top: 20px;
			.tab-title{
				padding : 6px 0;
				margin-top: 20px;
				font-size: 16px;
				color: rgb(26, 188, 156);
				border-bottom: 2px solid #1abc9c;
				display: inline-block;
			}
			.textarea-value{
				margin-top: 20px;
			}
		}
		.line-detail-item{
			margin-top: 8px;
			.l-d-i-name{
				font-size: 14px;
				color: #1abc9c;
			}
			.l-d-i-des{
				font-size: 14px;
				color: #666;
			}
			.l-d-i-del{
				color: #1abc9c;
				margin-left: 8px;
				cursor: pointer;
			}
		}
		.line-detail-item:first-child{
			margin-top: 20px;
		}
		.line-list{
			margin-top: 30px;
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
		.dialog-wrapper{
			.input-item,.input-value{
				width: 270px;
			}
			.input-value.input-value-small{
				width: 120px;
			}
			.add-item{
				margin-top: 15px;
				.add-i-name{
					display: inline-block;
					text-align: right;
					width: 90px;
					font-size: 14px;
					em{
						color: red;
					}
				}
			}
			.top-vertical{
				vertical-align: top;
			}
			.i-v-split{
				margin: 0 6px;
				font-size: 14px;
				width: 18px;
				height: 1px;
				text-align: center;
				display: inline-block;
				vertical-align: middle;
				background: #ddd;
			}
		}
	}
</style>