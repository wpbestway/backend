<template>
	<div class="page-wrapper">
		<div class="choice-wrapper">
			<h3 class="choice-title">数据筛选</h3>
			<div class="choice-list clearfix">
				<div class="choice-item">
					<span class="choice-name">酒店名称：</span>
					<el-input class="input-item" v-model="name" placeholder="请输入酒店名称"></el-input>
				</div>
				<div class="choice-item">
					<span class="choice-name">酒店星级：</span>
					<el-select class="input-item" filterable v-model="hotelLevel" placeholder="请选择">
					<el-option
					  label="全部"
					  value="">
					</el-option>
				    <el-option
				      v-for="(item,index) in hotelTypeList"
				      :key="index"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				</div>
				<div class="choice-item">
					<el-button icon="el-icon-search" @click="query()" type="primary">查询</el-button>
				</div>
				<div class="choice-item">
					<el-button icon="el-icon-plus" @click="add()" type="primary">添加</el-button>
				</div>
				<div class="choice-item">
					<el-button icon="el-icon-refresh-left" @click="reset()" type="primary">重置</el-button>
				</div>
				<!-- <div class="choice-item">
					<el-button icon="el-icon-download" @click="export()" type="primary">导出</el-button>
				</div> -->
			</div>
		</div>
		<div class="choice-result">
			<h3 class="choice-title">酒店列表<i @click="query()" class="el-icon-refresh refresh-icon"></i></h3>
			<div class="reslut-list">
				<el-table
		      :data="hotelList"
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
		        label="酒店名称"
		        align="center">
		      </el-table-column>
		      <el-table-column
		        prop="addr"
		        label="所在地区"
		        align="center">
		      </el-table-column>
		      <el-table-column
		        prop="type"
		        label="酒店星级"
		        align="center">
		        <template slot-scope="scope">{{getTypeValue(scope.row.hotelLevel)}}</template>
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
			  title="删除酒店信息"
			  :visible.sync="deleteDialog"
			  width="30%">
			  <span>确定要删除该酒店信息吗？</span>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="deleteDialog = false">取 消</el-button>
			    <el-button type="primary" @click="deleteAction()">确 定</el-button>
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