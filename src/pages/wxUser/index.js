import * as user from '@/services/user';
export default {
  name: 'wxUser',
  components: {},
  data() {
    return {
    	registerTime : '',
      registerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]  //暂时并未使用
      },
      useTime : '', //暂时并未使用
      useTimeOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]  //暂时并未使用
      },
      phone : '',
      lineType : '',
      lineTypeList : [{
        value: 1,
        label: '全部'
      }, {
        value: 2,
        label: '是'
      }, {
        value: 3,
        label: '否'
      }],
      userList : [],
      deleteDialog : false,
      currentPage : 1,
      pageSize : 10,
      listSize : 0
    }
  },
  created(){
    this.init();
    this.getUserList();
  },
  methods: {
    init(){ //初始化
      sessionStorage.removeItem('userItem');
    },
    query(){
      this.getUserList();
    },
    exportInfo(){ //暂时未处理

    },
    reset(){
      this.phone = '';
    },
    getUserList(){
      //判断查询条件
      let travelScenic = {
        pageNum : this.currentPage,
        pageSize :  this.pageSize,
      };
      if(this.phone){travelScenic["phone"] = this.phone;}
      //调用查询接口
      user.queryPage(travelScenic).then((res)=>{
        this.userList = res.list;
        this.listSize = res.total;
      });
    },
    // add(){
    //   this.$router.push('/main/caterersAdd');
    // },
    lookDetail(item){
      sessionStorage.setItem('userItem',JSON.stringify(item));
      this.$router.push('/main/userLine');
    },
    handleSizeChange(page){
      this.pageSize = page;
      this.getUserList();
    },
    handleCurrentChange(page){
      this.currentPage = page;
      this.getUserList();
    }
  }
}