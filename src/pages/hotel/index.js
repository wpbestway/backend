import * as hotel from '@/services/hotel';
import {hotelLevel} from '@/config/common';
export default {
  name: 'hotel',
  components: {},
  data() {
    return {
      name : '',
      hotelLevel : '',
      hotelTypeList : hotelLevel,
      hotelList : [],
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
      sessionStorage.removeItem('hotelItem');
    },
    query(){
      this.getSiteList();
    },
    reset(){
      this.name = '';
      this.hotelLevel = '';
    },
    getSiteList(){
      //判断查询条件
      let travelScenic = {
        pageNum : this.currentPage,
        pageSize :  this.pageSize,
      };
      if(this.name){travelScenic["name"] = this.name;}
      if(this.hotelLevel){travelScenic['hotelLevel'] = this.hotelLevel;}
      //调用查询接口
      hotel.queryPage(travelScenic).then((res)=>{
        this.hotelList = res.list;
        this.listSize = res.total;
      });
    },
    add(){
      this.$router.push('hotelAdd');
    },
    modifyItem(item){
      sessionStorage.setItem('hotelItem',JSON.stringify(item));
      this.$router.push('hotelAdd');
    },
    deleteItem(item){
      this.deleteDialog = true;
      this.selectedItem = item;
    },
    deleteAction(){
      hotel.del({
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
      let tmp = this.hotelTypeList.find((item)=>{
        return item.value == value;
      });
      return tmp ? tmp.label : '-';
    }
  }
}