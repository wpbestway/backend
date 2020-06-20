<template>
	<div class="page-wrapper">
		<div class="choice-wrapper">
			<h3 class="choice-title">数据筛选</h3>
			<div class="choice-list clearfix">
				<div class="choice-item">
					<span class="choice-name">食物名称：</span>
					<el-input class="input-item" v-model="foodName" placeholder="请输入食物名称"></el-input>
				</div>
				<div class="choice-item">
					<span class="choice-name">食物类型：</span>
					<el-select class="input-item" filterable v-model="foodType" placeholder="请选择">
				    <el-option
				      v-for="item in foodTypeList"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				</div>
				<div class="choice-item">
					<el-button icon="el-icon-search" @click="choiceAction()" type="primary">查询</el-button>
				</div>
				<div class="choice-item">
					<el-button icon="el-icon-plus" @click="addCaterers()" type="primary">添加</el-button>
				</div>
				<div class="choice-item">
					<el-button icon="el-icon-refresh-left" @click="choiceAction()" type="primary">重置</el-button>
				</div>
				<div class="choice-item">
					<el-button icon="el-icon-download" @click="choiceAction()" type="primary">导出</el-button>
				</div>
			</div>
		</div>
		<div class="choice-result">
			<h3 class="choice-title">食物列表<i class="el-icon-refresh refresh-icon"></i></h3>
			<div class="reslut-list">
				<el-table
		      :data="foodList"
		      border
		      style="width: 100%">
		      <el-table-column
		        type="index"
		        label="序号"
		        width="100"
		        align="center">
		      </el-table-column>
		      <el-table-column
		        prop="name"
		        label="食物名称"
		        align="center">
		      </el-table-column>
		      <el-table-column
		        prop="type"
		        label="食物类型"
		        align="center">
		      </el-table-column>
		      <el-table-column
		        prop="special"
		        label="食物特点"
		        align="center">
		      </el-table-column>
		      <el-table-column
		        label="操作"
		        align="center">
		        <template slot-scope="scope">
		          <el-button class="modify" @click="modifyItem(scope.row)" type="text" size="small">编辑</el-button>
          		<el-button class="delete" @click="deleteItem(scope.row)" type="text" size="small">删除</el-button>
		        </template>
      		</el-table-column>
		    </el-table>
		    <el-pagination
		    	class="pagination-wrapper"
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="currentPage"
		      :page-sizes="[10, 20, 50, 100]"
		      :page-size="10"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="listSize">
		    </el-pagination>
			</div>	
		</div>
		<div class="dialog-wrapper">
			<el-dialog
			  title="提示"
			  :visible.sync="deleteDialog"
			  width="30%">
			  <span>这是一段信息</span>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="deleteDialog = false">取 消</el-button>
			    <el-button type="primary" @click="deleteDialog = false">确 定</el-button>
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
		}
		.choice-title{
			font-weight: bold;
			line-height: 24px;
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