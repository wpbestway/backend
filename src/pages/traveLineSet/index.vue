<template>
	<div class="page-wrapper">
		<h3 class="page-title">配置行程 <el-button v-if="addType == 'travelRelation' && userId" class="submit-btn re-btn" @click="relativeLine()" type="primary">关联路线</el-button></h3>
		<div class="tab-list">
			<!-- <el-button icon="el-icon-plus" @click="addDay()" type="primary">添加天数</el-button> -->
			<el-tabs class="el-tabs-main" v-model="lineActive"  @tab-click="tabChange">
			    <el-tab-pane :label="'第'+dayMap[index]+'天'" :name="index.toString()" v-for="(item,index) in lineDaysList" :key="index">
			    	<el-button icon="el-icon-plus" @click="showAddTravelLine()" type="primary">添加行程</el-button><br/>
			    	<div class="tab-title">行程内容</div>
			    	<div class="line-detail-list">
			    		<div class="line-detail-item"  v-for="(innerItem,innerIndex) in item.child" :key="innerIndex">
			    			<div class="l-d-i-name">{{innerItem.title}}</div>
		    				<div class="l-d-i-des">{{innerItem.des}}<span class="l-d-i-del" @click="modifyDetail(innerItem)">编辑</span><span class="l-d-i-del" @click="delLineDetail(innerItem.id)">删除</span></div>
			    		</div>
			    	</div>
			    </el-tab-pane>
			    <el-tab-pane label="购买须知" name="buyMark">
			    	<el-input
						  type="textarea"
						  class="textarea-value"
						  :autosize="{ minRows: 15, maxRows: 30}"
						  placeholder="请输入购买须知"
						  v-model="lineInitInfo.buyMark">
					</el-input>
			    </el-tab-pane>
			    <el-tab-pane label="费用说明" name="feeMark">
			    	<el-input
					  type="textarea"
					  class="textarea-value"
					  :autosize="{ minRows: 15, maxRows: 30}"
					  placeholder="请输入费用说明"
					  v-model="lineInitInfo.feeMark">
					</el-input>
				</el-tab-pane>
		    </el-tabs>
		</div>
		<div class="btn-wrapper" v-if="lineActive == 'buyMark' || lineActive == 'feeMark'" >
			<el-button class="submit-btn" @click="upDataTravelLine()" type="primary">保存</el-button>
		</div>
		<div class="dialog-wrapper line-set">
			<el-dialog
			  title="添加行程"
			  :visible.sync="addLineShow"
			  width="30%">
			  <div class="add-wrapper">
			  	<div class="add-item">
			  		<span class="add-i-name"><em>*</em>行程类型：</span>
			  		<el-select class="input-item" filterable v-model="addLineInfo.type" placeholder="请选择">
					    <el-option
					      v-for="item in lineTypeList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
			  	</div>
			  	<div class="food-input" v-if="addLineInfo.type == 1">
			  		<div class="add-item">
				  		<span class="add-i-name"><em>*</em>餐饮方案：</span>
				  		<el-select class="input-item" filterable v-model="addLineInfo.elementId" placeholder="请选择菜品">
						    <el-option
						      v-for="(item,index) in caterersList"
						      :key="index"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						  </el-select>
				  	</div>
			  		<div class="add-item">
				  		<span class="add-i-name"><em>*</em>用餐时间：</span>
				  		<el-time-picker
					    is-range
					    value-format="HH:mm"
					    format="HH:mm"
					    v-model="addLineInfo.openTimeArea"
					    range-separator="至"
					    start-placeholder="开始时间"
					    end-placeholder="结束时间"
					    placeholder="选择时间范围">
							</el-time-picker>
				  	</div>
				  	<div class="add-item">
				  		<span class="add-i-name top-vertical"><em></em>备注：</span>
				  		<el-input class="input-value" type="textarea"  :rows="4" v-model="addLineInfo.elementDes" placeholder="输入餐饮相关信息"></el-input>
				  	</div>
			  	</div>
			  	<div class="food-input" v-if="addLineInfo.type == 2">
			  		<div class="add-item">
				  		<span class="add-i-name"><em>*</em>方案名称：</span>
				  		<el-select class="input-item" filterable v-model="addLineInfo.elementId" placeholder="请选择方案">
						    <el-option
						      v-for="(item,index) in trafficList"
						      :key="index"
						      :label="item.carBrand"
						      :value="item.id">
						    </el-option>
						  </el-select>
				  	</div>
				  	<div class="add-item">
				  		<span class="add-i-name top-vertical"><em></em>备注：</span>
				  		<el-input class="input-value" type="textarea"  :rows="4" v-model="addLineInfo.elementDes" placeholder="输入路程时间，以及目的地，例如：本次目的是敦煌，时长2.5个小时"></el-input>
				  	</div>
			  	</div>
			  	<div class="food-input" v-if="addLineInfo.type == 3">
			  		<div class="add-item">
				  		<span class="add-i-name"><em>*</em>酒店选择：</span>
				  		<el-select class="input-item" filterable v-model="addLineInfo.elementId" placeholder="请选择酒店">
						    <el-option
						      v-for="(item,index) in hotelList"
						      :key="index"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						  </el-select>
				  	</div>
				  	<div class="add-item">
				  		<span class="add-i-name top-vertical"><em></em>备注：</span>
				  		<el-input class="input-value" type="textarea"  :rows="4" v-model="addLineInfo.elementDes" placeholder="输入酒店相关信息"></el-input>
				  	</div>
			  	</div>
			  	<div class="food-input" v-if="addLineInfo.type == 4">
			  		<div class="add-item">
				  		<span class="add-i-name"><em>*</em>景区选择：</span>
				  		<el-select class="input-item" filterable v-model="addLineInfo.elementId" placeholder="请选择景区">
						    <el-option
						      v-for="(item,index) in attractionsList"
						      :key="index"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						  </el-select>
				  	</div>
				  	<div class="add-item">
				  		<span class="add-i-name top-vertical"><em></em>备注：</span>
				  		<el-input class="input-value" type="textarea"  :rows="4" v-model="addLineInfo.elementDes" placeholder="输入景区相关信息"></el-input>
				  	</div>
			  	</div>
			  	<div class="add-item order-flag">
			  		<span class="add-i-name"><em></em>插入位置：</span>
			  		<el-input class="input-value" v-model="addLineInfo.order" placeholder="默认插入末尾(数字，如:2)"></el-input>
			  	</div>
			  </div>
			  <span slot="footer" class="dialog-footer">
			    <el-button v-if="dialogType == 'add' " type="primary" @click="addOneLine()">添加</el-button>
			    <el-button v-else type="primary" @click="modifyLine()">修改</el-button>
			  </span>
			</el-dialog>
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
			.re-btn{
				float: right;
				margin-right: 100px;
			}
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