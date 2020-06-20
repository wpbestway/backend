<template>
	<div class="page-wrapper">
		<div class="header-wrapper">
			<div class="left-wrapper">
				<img src="@/assets/image/logo.png" class="logo-icon"/>
				<span class="header-text">哎哟行信息管理平台</span>
			</div>
			<div class="right-wrapper">
				<!-- <div class="h-setting" @click="userSet()">
					<img src="@/assets/image/account-icon.png" class="account-icon h-icon"/>
					<span class="header-text">账户设置</span>
				</div> -->
				<div class="h-setting" @click="logout()">
					<img src="@/assets/image/out-icon.png" class="out-icon h-icon"/>
					<span class="header-text">退出登录</span>
				</div>
			</div>
		</div>
		<div class="content-wrapper">
			<nav class="slider-nav">
				<el-menu
			      :default-active="activeIndex"
			      @select="handleSelect">
			      <el-submenu index="1" class="nav-title">
			        <template slot="title">
			          <i class="el-icon-position"></i>
			          <span>行程信息管理</span>
			        </template>
			        <el-menu-item-group>
			          <el-menu-item index="caterers">餐饮管理</el-menu-item>
			          <el-menu-item index="traffic">交通管理</el-menu-item>
			          <el-menu-item index="attractions">景点管理</el-menu-item>
			          <el-menu-item index="hotel">酒店管理</el-menu-item>
			        </el-menu-item-group>
			      </el-submenu>
			      <el-submenu index="2" class="nav-title">
			        <template slot="title">
			          <i class="el-icon-rank"></i>
			          <span>旅游管理</span>
			        </template>
			        <el-menu-item-group>
			          <el-menu-item index="travelLine">旅游线路管理</el-menu-item>
			        </el-menu-item-group>
			      </el-submenu>
			      <el-submenu index="3" class="nav-title">
			        <template slot="title">
			          <i class="el-icon-s-custom"></i>
			          <span>用户管理</span>
			        </template>
			        <el-menu-item-group>
			          <el-menu-item index="wxUser">微信用户管理</el-menu-item>
			        </el-menu-item-group>
			      </el-submenu>
			      <el-submenu index="5" class="nav-title">
			        <template slot="title">
			          <i class="el-icon-mobile-phone"></i>
			          <span>小程序管理</span>
			        </template>
			        <el-menu-item-group>
			          <el-menu-item index="banner">首页Banner</el-menu-item>
			        </el-menu-item-group>
			      </el-submenu>
			      <el-submenu index="4"  class="nav-title hide">
			        <template slot="title">
			          <i class="el-icon-s-tools"></i>
			          <span>系统管理</span>
			        </template>
			        <el-menu-item-group>
			          <el-menu-item index="userSetting">账号管理</el-menu-item>
			        </el-menu-item-group>
			      </el-submenu>
			    </el-menu>
			</nav>
			<div class="handle-wrapper">
				<div class="breadcrumb">
					<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item v-for="(item,index) in breadList" :key="index">{{item}}</el-breadcrumb-item>
				</el-breadcrumb>
				</div>
				<router-view/>
			</div>
	    </div>
  	</div>
</template>
<script>
import chip from "./index";
export default chip;
</script>
<style>
	.slider-nav .el-submenu .el-menu-item{
		height: 40px;
    line-height: 40px;
	}
</style>
<style lang="scss" scoped>
	.header-wrapper{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 50px;
		line-height: 50px;
		background: rgb(70, 76, 91);
		padding: 0 20px;
		// text-align: left;
		.left-wrapper{
			float: left;
			.logo-icon{
				height: 32px;
				vertical-align: middle;
				border-radius: 50%;
			}
			.header-text{
				display: inline-block;
				color: #fff;
				margin-left: 6px;
			}
		}
		.right-wrapper{
			float: right;
			.h-setting{
				cursor: pointer;
				display: inline-block;
				width: 120px;
				padding: 14px 0;
				line-height: 22px;
				color: #fff;
				.h-icon{
					width: 22px;
					height: 22px;
					vertical-align: middle;
				}
				&:hover{
					background : rgb(26, 188, 156);
				}
			}
		}
	}
	.content-wrapper{
	  position: absolute;
	  top: 50px;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  .slider-nav{
	    position: absolute;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    width: 200px;
	    background: #fff;
	    .nav-title{
	    	text-align: left;
	    }
	  }
	  .handle-wrapper{
	    position: absolute;
	    left: 220px;
	    right: 0;
	    top: 0;
	    bottom: 0;
	    overflow-x: hidden;
	    overflow-y: auto;
	    .breadcrumb{
	    	margin-top: 20px;
	    	border-left: 5px solid rgb(26, 188, 156);
	    	padding-left: 6px;
	    }
	    &::-webkit-scrollbar{
	    	width: 2px;
	    	height: 10px;
	    	background: #1ABCA5;
	    }
	  }
	}
</style>