<template>
  <div class="mp-banner">
    <el-button type="primary" @click="addBanner" size="small">添加Banner</el-button>
    <el-table
      :data="banners"
      v-loading="loading"
      border
      stripe
      size="small"
      style="width: 100%">
      <el-table-column
        prop="weight"
        label="排序"
        width="100">
      </el-table-column>
      <el-table-column
        label="图片"
        width="200">
        <template slot-scope="scope">
          <img class="banner-img" :src="AUZOU_DOMAIN + scope.row.savePath" :alt="scope.row.title">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="主题">
      </el-table-column>
      <el-table-column
        prop="innerUrl"
        label="内部链接">
      </el-table-column>
      <el-table-column
        prop="outterUrl"
        label="外部链接">
      </el-table-column>
      <el-table-column
        label="是否展示">
        <template slot-scope="scope">
          {{ scope.row.isShow ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">修改</el-button>
          <el-button
            :loading="scope.row.deleting"
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { getBanners, deleteBanner } from '@/services/banner';
import { AUZOU_DOMAIN } from '../../config/host';
export default {
  data() {
    return {
      banners: [],
      pageSize: 0,
      total: 0,
      currentPage: 1,
      loading: false,
      AUZOU_DOMAIN
    }
  },
  created() {
    this.getBanners()
  },
  methods: {
    handleEdit(banner) {
      this.$router.push({ path: '/main/banner/edit/' + banner.id })
    },
    handleDelete(banner) {
      Vue.set(banner, 'deleting', true)
      deleteBanner(banner.id).then(res => {
        this.$message.success('已删除')
        this.getBanners()
      })
    },
    pageChange(page) {
      this.currentPage = page
      this.getBanners()
    },
    getBanners() {
      this.loading = true
      let data = { pageNum: this.currentPage }
      getBanners(data).then(res => {
        this.banners = res.list
        this.pageSize = res.pageSize
        this.total = res.total
      }).finally(() => {
        this.loading = false
      })
    },
    addBanner() {
      this.$router.push({ path: '/main/banner/add' })
    }
  }
}
</script>
<style lang="scss" scoped>
.mp-banner{
  text-align: left;
  padding-right: 20px;
  .el-table{
    margin-top: 20px;
    .banner-img{
      width: 160px;
    }
  }
  .pagination{
    margin-top: 20px;
    text-align: center;
  }
}
</style>