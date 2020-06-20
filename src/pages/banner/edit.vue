<template>
  <banner-editor :banner="banner" v-loading="loading"></banner-editor>
</template>
<script>
import { getBanner } from '@/services/banner';
import BannerEditor from './components/editor'
export default {
  components: { BannerEditor },
  data() {
    return {
      id: this.$route.params.id,
      loading: false,
      banner: {}
    }
  },
  created() {
    this.getBanner()
  },
  methods: {
    getBanner() {
      this.loading = true
      getBanner(this.id).then(res => {
        this.banner = res
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>