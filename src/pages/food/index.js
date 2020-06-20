export default {
  name: 'caterers',
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
      foodList : [{
        id : 1,
        name : '米线',
        type : '主食',
        special : '正宗过桥米线',
      },{
        id : 1,
        name : '米线',
        type : '主食',
        special : '正宗过桥米线',
      },{
        id : 1,
        name : '米线',
        type : '主食',
        special : '正宗过桥米线',
      },{
        id : 1,
        name : '米线',
        type : '主食',
        special : '正宗过桥米线',
      }],
      deleteDialog : false,
      currentPage : 1,
      listSize : 88
    }
  },
  created(){},
  methods: {
    choiceAction(){

    },
    addCaterers(){
      this.$router.push('caterersAdd');
    },
    modifyItem(item){
      console.log(item)
    },
    deleteItem(item){
      console.log(item)
      this.deleteDialog = true;
    },
    handleSizeChange(){

    },
    handleCurrentChange(){

    }
  }
}