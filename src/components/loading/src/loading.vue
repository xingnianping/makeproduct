<template>
	<div>
		<div 
			class="st-loading"
		>
			<i class="el-icon-loading"></i>
			<p class="mt10 f16"><slot></slot></p>
		</div>
		<div class="mask"></div>
	</div>
</template>

<script>
export default {
  name: 'st-loading'
}
</script>

<style scoped>
.st-loading {
	position: fixed;
	left: 50%;
	top: 50%;
	padding: 15px 30px 15px;
	color: #fff;
	text-align: center;
	background-color: rgba(0, 0, 0, .6);
	border-radius: 8px;
	transform: translate(-50%,-50%);
	z-index: 10;
}

.st-loading .el-icon-loading {
	font-size: 40px;
}

.mask {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0);
	z-index: 9;
}
</style>

