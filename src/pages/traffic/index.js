import * as traffic from '@/services/traffic';
import {carType} from '@/config/common';
export default {
  name: 'traffic',
  components: {},
  data() {
    return {
      carBrand : '',
      carStyle : '',
      carTypeList : carType,
      carList : [],
      deleteDialog : false,
      currentPage : 1,
      listSize : 0,
      pageSize : 10,
      selectedItem : {}
    }
  },
  created(){
    this.init();
    this.getSiteList();
  },
  methods: {
    init(){ //初始化
      sessionStorage.removeItem('trafficItem');
    },
    query(){
      this.getSiteList();
    },
    reset(){
      this.carBrand = '';
      this.carStyle = '';
    },
    getSiteList(){
      //判断查询条件
      let travelScenic = {
        pageNum : this.currentPage,
        pageSize :  this.pageSize,
      };
      if(this.carBrand){travelScenic["carBrand"] = this.carBrand;}
      if(this.carStyle){travelScenic['carStyle'] = this.carStyle;}
      //调用查询接口
      traffic.queryPage(travelScenic).then((res)=>{
        this.carList = res.list;
        this.listSize = res.total;
      });
    },
    add(){
      this.$router.push('trafficAdd');
    },
    modifyItem(item){
      sessionStorage.setItem('trafficItem',JSON.stringify(item));
      this.$router.push('trafficAdd');
    },
    deleteItem(item){
      this.deleteDialog = true;
      this.selectedItem = item;
    },
    deleteAction(){
      traffic.del({
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
    getTypeValue(value){
      let tmp = this.carTypeList.find((item)=>{
        return item.value == value;
      });
      return tmp ? tmp.label : '-';
    }
  }
}