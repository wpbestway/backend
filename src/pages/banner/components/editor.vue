<template>
  <div class="banner-add">
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="140px">
      <el-form-item label="Banner主题" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="小程序内部跳转地址" prop="innerUrl">
        <el-input v-model="formData.innerUrl"></el-input>
      </el-form-item>
      <el-form-item label="H5跳转地址" prop="outterUrl">
        <el-input v-model="formData.outterUrl"></el-input>
      </el-form-item>
      <el-form-item label="Banner图片" prop="savePath" required>
        <el-upload
          ref="bannerUploader"
          class="upload-banner"
          drag
          action="/admin/uploadFile"
          name="file"
          :show-file-list="false"
          :on-success="bannerUploaderSuccess"
        >
          <img v-if="formData.savePath" :src="AUZOU_DOMAIN + formData.savePath">
          <div v-else class="drag-box">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="权重" prop="weight">
        <el-input v-model="formData.weight"></el-input>
      </el-form-item>

      <el-form-item label="是否显示" prop="outterUrl">
        <el-switch
          v-model="formData.isShow"
          active-text="显示"
          inactive-text="不显示"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="submitBanner" class="submit-btn">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addBanner, updateBanner } from '@/services/banner';
import { AUZOU_DOMAIN } from '../../../config/host';
export default {
  data() {
    return {
      formData: {
        title: '',
        savePath: '',
        isShow: 1,
        innerUrl: '',
        outterUrl: '',
        weight: ''
      },
      AUZOU_DOMAIN,
      rules: {
        savePath: [
          { required: true, message: '请选择图片' }
        ],
      }
    };
  },
  props: {
    banner: {
      type: Object
    }
  },
  watch: {
    banner(val) {
      if (val.id) {
        this.formData = {...val}
      }
    }
  },
  methods: {
    submitBanner() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let data = { ...this.formData }

          if (this.formData.id) {
            updateBanner(data).then(res => {
              this.$message.success('修改成功')
              this.$router.push({ path: '/main/banner' })
            })
          } else {
            addBanner(data).then(res => {
              this.$message.success('提交成功')
              this.$router.push({ path: '/main/banner' })
            })
          }
        }
      });
    },
    bannerUploaderSuccess(data) {
      this.formData.savePath = data.data.relativePath
    }
  }
};
</script>
<style lang="scss" scoped>
.banner-add {
  padding-right: 20px;
  text-align: left;
  .el-upload-dragger{
    width: 415px;
    height: 187px;
    img{
      width: 100%;
      height: 100%;
    }
    .el-icon-upload{
      margin-top: 20px;
    }
  }
  .submit-btn{
    width: 180px;
  }
}
</style>