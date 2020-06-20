import * as attractions from '@/services/attractions';
import {address,siteTypeList} from '@/config/common';
export default {
  name: 'attractions',
  components: {},
  data() {
    return {
      siteName : '',
      siteAddress : '',
      siteAddressList : address,
      siteType : '',
      siteTypeList :  siteTypeList,
      siteList : [],
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
      sessionStorage.removeItem('attractionsItem');
    },
    query(){
      this.getSiteList();
    },
    reset(){
      this.siteName = '';
      this.siteAddress = '';
      this.siteType = '';
    },
    getSiteList(){
      //判断查询条件
      let travelScenic = {
        pageNum : this.currentPage,
        pageSize :  this.pageSize,
      };
      if(this.siteName){travelScenic["name"] = this.siteName;}
      if(this.siteAddress){travelScenic['addr'] = this.siteAddress;}
      if(this.siteType){travelScenic['onlineModel'] = this.siteType;}
      //调用查询接口
      attractions.queryPage(travelScenic).then((res)=>{
        this.siteList = res.list;
        this.listSize = res.total;
      });
    },
    add(){
      this.$router.push('attractionsAdd');
    },
    modifyItem(item){
      sessionStorage.setItem('attractionsItem',JSON.stringify(item));
      this.$router.push('attractionsAdd');
    },
    deleteItem(item){
      this.deleteDialog = true;
      this.selectedItem = item;
    },
    deleteAction(){
      attractions.del({
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
      let tmp = this.siteTypeList.find((item)=>{
        return item.value == value;
      });
      return tmp ? tmp.label : '-';
    },
    getAddrValue(value){
      let tmp = this.siteAddressList.find((item)=>{
        return item.value == value;
      });
      return tmp ? tmp.label : '-';
    }
  }
}