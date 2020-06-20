import * as caterers from '@/services/caterers';
import {footerType,foodTimeType} from '@/config/common';
export default {
  name: 'caterers',
  components: {},
  data() {
    return {
      name : '',
      solutionType : '',
      solutionTypeList : footerType,
      foodTimeType : '',
      foodTimeTypeList : foodTimeType,
      caterersList : [],
      deleteDialog : false,
      currentPage : 1,
      pageSize : 10,
      listSize : 0,
      selectedItem : {}
    }
  },
  created(){
    this.init();
    this.getSiteList();
  },
  methods: {
    init(){ //初始化
      sessionStorage.removeItem('caterersItem');
    },
    query(){
      this.getSiteList();
    },
    reset(){
      this.name = '';
      this.solutionType = '';
      this.foodTimeType = '';
    },
    getSiteList(){
      //判断查询条件
      let travelScenic = {
        pageNum : this.currentPage,
        pageSize :  this.pageSize,
      };
      if(this.name){travelScenic["name"] = this.name;}
      if(this.solutionType){travelScenic['solutionType'] = this.solutionType;}
      if(this.foodTimeType){travelScenic['foodTimeType'] = this.foodTimeType;}
      //调用查询接口
      caterers.queryPage(travelScenic).then((res)=>{
        this.caterersList = res.list;
        this.listSize = res.total;
      });
    },
    add(){
      this.$router.push('/main/caterersAdd');
    },
    modifyItem(item){
      sessionStorage.setItem('caterersItem',JSON.stringify(item));
      this.$router.push('/main/caterersAdd');
    },
    deleteItem(item){
      this.deleteDialog = true;
      this.selectedItem = item;
    },
    deleteAction(){
      caterers.del({
        id : this.selectedItem.id
      }).then((res)=>{
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getSiteList();
        this.deleteDialog = false;
        this.selectedItem = null;
      });
    },
    handleSizeChange(page){
      this.pageSize = page;
      this.getSiteList();
    },
    handleCurrentChange(page){
      this.currentPage = page;
      this.getSiteList();
    },
    getFoodTimeType(value){
      let tmp = this.foodTimeTypeList.find((item)=>{
        return item.value == value;
      });
      return tmp ? tmp.label : '-';
    },
     getSolutionType(value){
      let tmp = this.solutionTypeList.find((item)=>{
        return item.value == value;
      });
      return tmp ? tmp.label : '-';
    }
  }
}