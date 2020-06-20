<template>
  <div class="container">
    <div class="left">
      <Calendar
        :months="months"
        :value="value"
        @next="next"
        @prev="prev"
        :events="events"
        lunar
        clean
        @select="select"
        ref="calendar"
        @selectMonth="selectMonth"
        @selectYear="selectYear"
        :arrowLeft="arrowLeft"
        :tileContent="tileContent"
        :almanacs="almanacs"
      />
      <button @click="setToday">返回今日</button>
      <button @click="dateInfo">日期信息</button>
      <button @click="renderer">重新渲染年月日期</button>
    </div>
    <div class="right">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Calendar from 'mpvue-calendar'
import 'mpvue-calendar/src/browser-style.css'

export default {
  data () {
    return {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      disabledArray: ['2018-6-27', '2018-6-25'],
      value: [2018, 6, 7],
      begin:[2016, 1, 1],
      end:[2020, 1, 1],
      events: {'2018-6-7': '今日备注', '2018-6-8': '一条很长的明日备注'},
      almanacs: {'9-3': '抗战胜利日', '11-17': '学生日'},
      tileContent: [
          {date: '2018-9-22', className: 'holiday', content: '休'},
          {date: '2018-9-23', className: 'holiday', content: '休'}
      ],
      ruleForm: {
        name: '',
        region: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  components: {
    Calendar
  },
  methods: {
    prev(year, month, weekIndex) {
      console.log(year, month, weekIndex)
    },
    next(year, month, weekIndex) {
      console.log(year, month, weekIndex)
    },
    selectYear(year) {
      console.log(year)
    },
    selectMonth(month, year) {
      console.log(year, month)
    },
    setToday() {
      this.$refs.calendar.setToday()
    },
    dateInfo() {
      const info = this.$refs.calendar.dateInfo(2018, 8, 23)
      console.log(info)
    },
    renderer() {
      this.$refs.calendar.renderer(2018, 8); //渲染2018年8月份
    },
    select(val, val2) {
      console.log(val)
      console.log(val2)
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  display: flex;
  align-items: center;
}
.left{
  width: 400px;
}
.right{
  width: 300px;
}
</style>