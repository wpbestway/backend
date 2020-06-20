<template>
	<div class="page-wrapper">
		<div class="choice-wrapper">
			<h3 class="choice-title">数据筛选</h3>
			<div class="choice-list clearfix">
				<div class="choice-item hide">
					<span class="choice-name">注册时间：</span>
					<el-date-picker
						class="date-range"
			      v-model="registerTime"
			      type="daterange"
			      align="right"
			      unlink-panels
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期"
			      :picker-options="registerOptions">
			    </el-date-picker>
				</div>
				<div class="choice-item hide">
					<span class="choice-name">最近使用：</span>
					<el-date-picker
						class="date-range"
			      v-model="useTime"
			      type="daterange"
			      align="right"
			      unlink-panels
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期"
			      :picker-options="useTimeOptions">
			    </el-date-picker>
				</div>
				<div class="choice-item">
					<span class="choice-name">手机号：</span>
					<el-input class="input-item" v-model="phone" placeholder="请输入手机号"></el-input>
				</div>
				<div class="choice-item hide">
					<span class="choice-name">是否定制路线：</span>
					<el-select class="input-item" filterable v-model="lineType" placeholder="请选择">
				    <el-option
				      v-for="item in lineTypeList"
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
					<el-button icon="el-icon-refresh-left" @click="reset()" type="primary">重置</el-button>
				</div>
				<div class="choice-item hide">
					<el-button icon="el-icon-download" @click="exportInfo()" type="primary">导出</el-button>
				</div>
			</div>
		</div>
		<div class="choice-result">
			<h3 class="choice-title">微信用户管理<i class="el-icon-refresh refresh-icon"></i></h3>
			<div class="reslut-list">
				<el-table
		      :data="userList"
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
		        prop="wxOpenId"
		        label="openId"
		        align="center">
		      </el-table-column>
		      <el-table-column
		        prop="phone"
		        label="手机号码"
		        align="center">
		      </el-table-column>
		      <el-table-column
		        prop="regDate"
		        label="注册日期"
		        align="center">
		      </el-table-column>
		      <el-table-column
		        prop="loginTime"
		        label="最近使用"
		        align="center">
		      </el-table-column>
		      </el-table-column>
		      <el-table-column
		        label="操作"
		        align="center">
		        <template slot-scope="scope">
		          <el-button class="modify" @click="lookDetail(scope.row)" type="text" size="small">用户线路</el-button>
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
				.date-range{
					width: 380px;
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