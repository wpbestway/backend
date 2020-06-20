export default {
  name: 'caterersAdd',
  components: {},
  data() {
    return {
      foodName : '',
      foodType : '',
      foodTypeList :  [{
        value: 1,
        label: '全部'
      }, {
        value: 2,
        label: '饮品'
      }, {
        value: 3,
        label: '菜类'
      }, {
        value: 4,
        label: '主食'
      }],
      foodSpecial : ''
    }
  },
  created(){},
  methods: {
    choiceAction(){
    },
    modifyItem(item){
      console.log(item)
    },
    deleteItem(item){
    },
    handleSizeChange(){
    },
    handleCurrentChange(){
    }
  }
}