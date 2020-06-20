import * as travelLine from '@/services/travelLine';
import {lineModeList,lineTypeList,lineStatusList} from '@/config/common';
export default {
  name: 'travelLine',
  components: {},
  data() {
    return {
      name : '',
      lineTravelType : '',
      lineType : '',
      online : '',
      lineModeList : lineModeList,
      lineTypeList : lineTypeList,
      lineStatusList : lineStatusList,
      lineFee : '',
      minPrice : '',
      maxPrice : '',
      lineList : [],
      deleteDialog : false,
      shelvesDialog : false,
      lineStatus : '上架',
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
      sessionStorage.removeItem('travelLineItem');
      sessionStorage.removeItem('addType');
    },
    query(){
      this.getSiteList();
    },
    reset(){
      this.name = '';
      this.lineTravelType = '';
      this.lineType = '';
      this.online = '';
      this.lineFee = '';
    },
    getSiteList(){
      //判断查询条件
      let travelScenic = {
        pageNum : this.currentPage,
        pageSize :  this.pageSize,
      };
      if(this.name){travelScenic["name"] = this.name;}
      if(this.lineTravelType){travelScenic['lineTravelType'] = this.lineTravelType;}
      if(this.lineType){travelScenic['lineType'] = this.lineType;}
      if(this.online != ''){travelScenic['online'] = this.online;}
      if(this.lineFee){travelScenic['lineFee'] = this.lineFee;}
      //调用查询接口
      travelLine.queryPage(travelScenic).then((res)=>{
        this.lineList = res.list;
        this.listSize = res.total;
      });
    },
    add(){
      this.$router.push('travelLineAdd');
    },
    modifyItem(item){
      sessionStorage.setItem('travelLineItem',JSON.stringify(item));
      sessionStorage.setItem('addType','travelLine');
      this.$router.push('travelLineAdd');
    },
    configItem(item){
      sessionStorage.setItem('travelLineItem',item.id);
      this.$router.push('traveLineSet');
    },
    shelvesItem(item){
      this.shelvesDialog = true;
      this.lineStatus = item.online == 0 ? '上架' : '下架';
      this.selectedItem = item;
    },
    shelvesAction(){
      let online = this.selectedItem.online == 0 ? 1 : 0;
      travelLine.modify({
        id : this.selectedItem.id,
        online : online
      }).then((res)=>{
        this.$message({
          message: `${this.lineStatus}成功`,
          type: 'success'
        });
        this.getSiteList();
        this.shelvesDialog = false;
        this.selectedItem = null;
      });
    },
    deleteItem(item){
      this.deleteDialog = true;
      this.selectedItem = item;
    },
    deleteAction(){
      travelLine.del({
        id : this.selectedItem.id
      }).then((res)=>{
        if(res != 'err'){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getSiteList();
          this.deleteDialog = false;
          this.selectedItem = null;
        }
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
      let tmp = this.lineTypeList.find((item)=>{
        return item.value == value;
      });
      return tmp ? tmp.label : '-';
    },
    getModeValue(value){
      let tmp = this.lineModeList.find((item)=>{
        return item.value == value;
      });
      return tmp ? tmp.label : '-';
    },
    getStatusValue(value){
      let tmp = this.lineStatusList.find((item)=>{
        return item.value == value;
      });
      return tmp ? tmp.label : '-';
    },
  }
}