<template>
  <div id="app">
    <router-view/>
    <!-- <Upload accept=".png,.jpeg,.jpg" file-size="2" limit="8" file-type="image" @fileChange="scenicMainChange" :file-list="fileList" :cropper-info="cropperInfo"/> -->
    <!-- <el-upload
      class="upload-demo"
      action="/uploadFile"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :before-upload="beforeUpLoad"
      :http-request="httpRequest"
      :high="options.high"
      list-type="picture"
      ref="upLoadFile">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <div class="cropper">
      <vue-cropper v-show="vueCropperShow"  autoCrop :img="cropperImg" ref="cropper" centerBox/>
      <button @click="getCropData()" style="margin:10px 0" type="primary">获取截图后的图片</button>
    </div> -->
    
  </div>
</template>
<script>
import Upload from "@/components/upload";
export default {
  name: 'App',
  components: {
    Upload,
  },
  data() {
    return {
      fileList: [],
      cropperInfo : {
        fixedNumber : [5,2]
      },
    };
  },
  methods : {
    scenicMainChange(list){
      this.fileList = list;
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
*,*:before,*:after{
  -webkit-box-sizing:border-box;
  -moz-box-sizing:border-box;
  box-sizing:border-box;
}
</style>
