<template>
	<div class="page-wrapper">
		<div class="choice-wrapper">
			<h3 class="choice-title">数据筛选</h3>
			<div class="choice-list clearfix">
				<div class="choice-item">
					<span class="choice-name">关联形式：</span>
					<el-select class="input-item" filterable v-model="relationType" placeholder="请选择">
				    <el-option
					  label="全部"
					  value="">
					</el-option>
				    <el-option
				      v-for="item in userLineType"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				</div>
				<div class="choice-item">
					<el-button icon="el-icon-search" @click="query()" type="primary">查询</el-button>
				</div>
				<div class="choice-item">
					<el-button icon="el-icon-plus" @click="add()" type="primary">新建关联</el-button>
				</div>
				<div class="choice-item">
					<el-button icon="el-icon-refresh-left" @click="reset()" type="primary">重置</el-button>
				</div>
			</div>
		</div>
		<div class="choice-result">
			<h3 class="choice-title">线路列表<i class="el-icon-refresh refresh-icon"></i></h3>
			<div class="reslut-list">
				<el-table
			      :data="lineList"
			      border
			      style="width: 100%">
			      <el-table-column
			        type="index"
			        label="序号"
			        width="100"
			        align="center">
			        <template slot-scope="scope">
	              		<span>{{pageSize*(currentPage-1) + scope.$index+1}}</span>
	            	</template>
			      </el-table-column>
			      <el-table-column
			        prop="name"
			        label="线路名称"
			        align="center">
			      </el-table-column>
			      <el-table-column
			        label="关联形式"
			        align="center">
			        <template slot-scope="scope">{{getUserLineType(scope.row.userLineType)}}</template>
			      </el-table-column>
			      <el-table-column
			      	prop="relativeTime"
			        label="关联日期"
			        align="center">
			      </el-table-column>
			      <el-table-column
			        label="产品形式"
			        align="center">
			        <template slot-scope="scope">{{getModeValue(scope.row.lineTravelType)}}</template>
			      </el-table-column>
			      <el-table-column
			        label="线路类型"
			        align="center">
			        <template slot-scope="scope">{{getTypeValue(scope.row.lineType)}}</template>
			      </el-table-column>
			      <el-table-column
			        prop="lineFee"
			        label="价格"
			        align="center">
			      </el-table-column>
			      <el-table-column
			        label="线路状态"
			        align="center">
			        <template slot-scope="scope">{{getStatusValue(scope.row.online)}}</template>
			      </el-table-column>
			      <el-table-column
			        label="天数"
			        align="center">
			        <template slot-scope="scope">{{scope.row.days}}天{{scope.row.nights}}夜</template>
			      </el-table-column>
			      <el-table-column
			        label="操作"
			        align="center">
			        <template slot-scope="scope">
			          <el-button class="primary" @click="lookItem(scope.row)" type="text" size="small">查看</el-button>
		          		<el-button class="success" @click="deleteItem(scope.row)" type="text" size="small">解除绑定</el-button>
		        	</template>
      		      </el-table-column>
		    	</el-table>
				<el-pagination
				  class="pagination-wrapper"
				  @size-change="handleSizeChange"
				  @current-change="handleCurrentChange"
				  :current-page="currentPage"
				  :page-sizes="[10, 20, 50, 100]"
				  :page-size="pageSize"
				  layout="total, sizes, prev, pager, next, jumper"
				  :total="listSize">
				</el-pagination>
			</div>	
		</div>
		<div class="dialog-wrapper">
			<el-dialog
			  title="解除路线绑定"
			  :visible.sync="deleteDialog"
			  width="30%">
			  <span>确定要解除路线绑定吗？</span>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="deleteDialog = false">取 消</el-button>
			    <el-button type="primary" @click="deleteAction()">确 定</el-button>
			  </span>
			</el-dialog>
			<el-dialog
			  title="提示"
			  :visible.sync="addSelectDialog"
			  width="30%">
			  <span>可新建线路，或直接关联/拷贝已有线路</span>
			  <span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="addNewLine()">新建</el-button>
			    <el-button type="primary" @click="relationLine()">关联/拷贝</el-button>
			  </span>
			</el-dialog>
			<el-dialog
			  title="提示"
			  :visible.sync="lineSelectDialog"
			  width="30%">
			  <div class="add-item">
		  		<span class="add-i-name">线路选择：</span>
		  		<el-select class="input-item" filterable v-model="selectedLine" placeholder="请选择线路">
				    <el-option
				      v-for="(item,index) in selectLineList"
				      :key="index"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				</el-select>
		  	</div>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="cloneLine()">拷贝编辑</el-button>
					<el-button type="primary" @click="relationAction()">直接关联</el-button>
				</span>
			</el-dialog>
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
		.choice-list{
			.choice-item{
				float: left;
				margin: 10px;
				&:last-child{
					margin-right: 0;
				}
			}
			.input-item{
				width: 200px;
				display: inline-block;
			}
			.price-item{
				width: 120px;
			}
		}
		.choice-title{
			font-weight: bold;
			margin: 20px 0;
			.refresh-icon{
				color: rgb(26, 188, 156);
				margin-left: 8px;
				font-size: 24px;
				cursor: pointer;
				vertical-align: middle;
			}
		}
		.modify{
			color: rgb(26, 188, 156);
		}
		.delete{
			color: rgb(255, 0, 0);
		}
		.pagination-wrapper{
			margin-top: 8px;
		}
	}

</style>