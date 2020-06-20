<template>
	<div class="file-upload-wrapper">
		<div class="u-inner-wrapper"><el-upload
			  class="input-value upload-demo"
			  drag
			  :multiple="multiple"
			  :on-success="upLoadSuccesss"
			  :before-upload="upLoadBefore"
			  :show-file-list="false"
			  :on-progress="upLoadProgress"
			  :on-error="upLoadError"
			  :action="uploadUrl"
			  :accept="accept"
			  >
			  <i class="el-icon-upload"></i>
		      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			  <div slot="tip" class="el-upload__tip">只能上传{{accept.replace(/,/g,'/')}}文件，且不超过{{fileSize}}M</div>
			</el-upload>
			<div class="file-info-wrapper" v-for="(item,index) in innerList">
				<div class="f-i-main clearfix">
					<span class="f-name"><i class="el-icon-document"></i> {{item.name}}</span>
					<span class="right" v-if="item.progress && item.progress != '100%'">{{item.progress}}</span>
					<span v-else class="f-preview-btn right" ><em v-if="limit != 1" @click="deleteMainImg(item.name)">删除</em><em @click="previewImg(item.url)">预览</em></span>
				</div>
				<div v-if="item.progress && item.progress != '100%'" class="f-u-progress-wrapper">
					<div class="f-u-progress" :style="{ width: item.progress}"></div>
				</div>
			</div>
		</div>
		<el-dialog :visible.sync="previewDialog">
			<video v-if="fileType == 'video'" :src="previewUrl" width="100%" controls="controls" autoplay ></video>
		  	<img v-else width="100%" :src="previewUrl" alt=""/>
		</el-dialog>
		<el-dialog :visible.sync="cropperDialog" width="80%" top="10vh">
			<div class="cropper-dialog">
				<vue-cropper 
					class="cropper-dom"
					autoCrop
					centerBox
					ref="cropper"
					:img="cropperImg"
					:enlarge="cropperOptions.enlarge"
					:fixed="cropperOptions.fixed"
		            :fixedNumber="cropperOptions.fixedNumber"
		            :fixedBox="cropperOptions.fixedBox"/>
				<el-button class="submit-btn" type="primary" @click="cropperAction()">确认剪裁</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import api from '@/services/api';
import { VueCropper }  from 'vue-cropper';
import {uploadUrl} from '@/services/interface';
import {filterFile,addFileSecnod} from '@/utils/utils';
import axios from 'axios';
export default {
	props: ['accept','fileSize','limit','fileType','fileList','cropperInfo'],
	components: {
		VueCropper,
	},
	data(){
		return {
			uploadUrl : uploadUrl,
			innerList : [],
			previewDialog : false,
			previewUrl : '',
			cropperDialog : false,
			cropperImg : '',
			fileInfo : {},
			multiple : false,
			cropperOptions : {
				fixedBox: true, // 固定截图框大小 不允许改变
		        fixed: true, // 是否开启截图框宽高固定比例
		        fixedNumber: [], // 截图框的宽高比例
		        enlarge : 2
			}
		}
	},
	created(){
		this.innerList = this.fileList;
		this.checkCropper();
		this.checkMultiple();
	},
	methods : {
		checkCropper(){
			//判断是否有剪裁信息
			if(this.cropperInfo){
				this.cropperOptions.fixedNumber = this.cropperInfo.fixedNumber;
			}
		},
		checkMultiple(){
			this.multiple = !this.cropperInfo && !this.checkOneOrMore();
		},	
		upLoadError(){
			this.$message({
				message: '上传失败',
				type: 'error'
			});
	    },
	    checkOneOrMore(){
	    	return this.limit == 1;
	    },
	    upLoadBefore(file,type){
	      if(file.size / 1024 / 1024 > this.fileSize*1){
	        this.$message({
	          message: `上传大小超过${this.fileSize}M`,
	          type: 'warning'
	        });
	      }else{
	      	if(this.checkOneOrMore()){
	      		this.innerList = []
	      	}
	      	this.innerList.push({
    			name : file.name,
    			progress : '0%',
    			url : ''
	      	});
	      	this.fileInfo = file;
	      	if(this.cropperInfo){
				const reader = new FileReader();
				reader.onload = ((ev)=>{
					this.cropperImg = ev.target.result;
					this.cropperDialog = true;
				});
				//发起异步读取文件请求，读取结果为data:url的字符串形式，
				reader.readAsDataURL(file);
	      	}else{
	      		this.httpRequest(file);
	      	}
	      }
	      return false;
	    },
	    findFile(value){
	    	let valueStr = filterFile(value); //过滤掉文件时间戳
	    	for(var i = this.innerList.length -1 ; i >= 0 ; i--){
	    		console.log(this.innerList[i].name,valueStr)
	    		if(this.innerList[i].name == valueStr){
	    			return i;
	    		}
	    	}
	    },
	    cropperAction(){
			this.$refs.cropper.getCropData(data => {
				this.httpRequest(this.dataURLtoBlob(data))
			});
		},
		getMillSecond(){
			return new Date().valueOf();
		},
		httpRequest(file){
			let fileData = new window.File([file],
				addFileSecnod(this.fileInfo.name),
				{type : this.fileInfo.type}
			);
			let formData = new FormData();
			formData.append('file', fileData);
			axios({
				method: 'post',
				url : '/admin/uploadFile',
				data: formData,
				headers : { 'Content-Type': 'multipart/form-data'},
				onUploadProgress:(event=>{
					event.percent = event.loaded/event.total;
					this.upLoadProgress(event,fileData)
				})
			}).then(res=>{
				this.upLoadSuccesss(res,fileData);
			});
		},
    upLoadProgress(event,file){
    	let lastIndex = this.findFile(file.name);
			this.innerList[lastIndex].progress = `${event.percent.toFixed(0)}%`;
			return true;
    },
    upLoadSuccesss(res,file){
    	let lastIndex = this.findFile(file.name);
    	this.innerList[lastIndex].url = res.fileDownloadUri.replace('http://www.aiuzou.com','https://www.aiuzou.com');
			this.innerList[lastIndex].progress = '100%';
			this.$emit('fileChange',this.innerList);
			this.cropperDialog = false;
    },
    deleteMainImg(name) {
      let list = this.innerList;
      list.splice(list.findIndex(item => item.name == name), 1)
    },
    previewImg(url){ //大图预览
  		this.previewDialog = true;
    	this.previewUrl = url;
    },
    dataURLtoBlob(dataurl) {
			var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
			while (n--) {
			  u8arr[n] = bstr.charCodeAt(n);
			}
			return new Blob([u8arr], { type: mime });
    },
	},
	watch : {
		fileList(value){
			this.innerList = value;
		}
	}
}
</script>
<style lang="scss">
.file-upload-wrapper{
	display: inline-block;
	.file-info-wrapper{
		color: #999;
		.f-i-main{
			cursor: pointer;
			height: 32px;
			line-height: 32px;
			border-bottom: 1px dashed #FFB6C1;
			text-align: left;
			.f-preview-btn{
				color: rgb(26, 188, 156);
			}
			span{
				font-size: 14px;
				em{
					margin-left: 10px;
					font-size: 14px;
				}
			}
			&:hover{
				background: #f5f7fa;
			}
		}
		.f-u-progress-wrapper{
			margin-top: -2px;
			height: 3px;
			width: 100%;
			background: #999;
			border-radius: 3px;
			overflow: hidden;
			.f-u-progress{
				height: 100%;
				background: rgb(26, 188, 156);
			}
		}
	}
	.cropper-dialog{
		width: 100%;
		.cropper-dom{
			width: 100%;
			height: 60vh;
		}
		.submit-btn{
			margin-top: 20px;
		}
	}
}
</style>
