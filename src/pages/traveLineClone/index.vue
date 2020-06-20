<template>
	<div class="clone-line-wrapper">
		<div class="page-mask"></div>
		<div class="loading-status">
			<i class="el-icon-loading"></i><br/>
			<p class="loading-text">{{loadingText}}</p>
		</div>
	</div>
</template>
<script>
import chip from "./index";
export default chip;
</script>
<style lang="scss" scoped>
	.clone-line-wrapper{
		.page-mask{
			position: fixed;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			background-color: #000;
			opacity: 0.5;
		}
		.loading-status{
			position: fixed;
			top: 50%;
			left: 0;
			width: 100%;
			text-align: center;
			z-index: 10;
			color: #409eff;
			font-size: 24px;
			transform: translateY(-50%);
			.loading-text{
				margin-top: 10px;
			}
		}
	}
</style>