import * as userLine from '@/services/userLine';
import * as travelLine from '@/services/travelLine';
import {lineModeList,lineTypeList,lineStatusList,userLineType} from '@/config/common';
export default {
  name: 'userLine',
  components: {},
  data() {
    return {
      userId : '',
      userLineType :  userLineType,
      relationType : '',
      lineList : [],
      deleteDialog : false,
      addSelectDialog : false,
      lineSelectDialog : false,
      selectedLine : '',
      selectLineList : [],
      lineStatus : '上架',
      currentPage : 1,
      listSize : 0,
      pageSize : 10,
      selectedItem : {}
    }
  },
  created(){
    this.init();
    this.getLineList();
    this.getSelectLine();
  },
  methods: {
    init(){ //初始化
      sessionStorage.removeItem('travelLineItem');
      let userInfo = sessionStorage.getItem('userItem');
      if(userInfo){
        this.userId = JSON.parse(userInfo).id;
        sessionStorage.removeItem('userLineItem');
      }else{
        this.$router.push('/main/wxUser');
      }
    },
    query(){
      this.getLineList();
    },
    reset(){
      this.relationType = '';
    },
    getLineList(){
      //判断查询条件
      let travelScenic = {
        pageNum : this.currentPage,
        pageSize :  this.pageSize,
        userId : this.userId
      };
      if(this.relationType){travelScenic['userLineType'] = this.relationType;}
      //调用查询接口
      userLine.queryPage(travelScenic).then((res)=>{
        let list = res.list;
        list = list.map(item=>{
          let info = item.line;
          info['relativeId'] = item.userLine.id;
          info['userLineType'] = item.userLine.userLineType;
          info['relativeTime'] = item.userLine.createdTime.split(' ')[0];
          return info;
        })
        this.lineList = list;
        this.listSize = res.total;
      });
    },
    getSelectLine(){
      travelLine.query().then(res=>{
        this.selectLineList = res;
      })
    },
    add(){
      this.addSelectDialog = true;
    },
    lookItem(item){
      sessionStorage.setItem('userLineItem',item.id);
      this.$router.push('userLineDetail');
    },
    deleteItem(item){
      this.deleteDialog = true;
      this.selectedItem = item;
    },
    deleteAction(){
      userLine.del({
        id : this.selectedItem.relativeId
      }).then((res)=>{
        this.$message({
          message: '解除成功',
          type: 'success'
        });
        this.getLineList();
        this.deleteDialog = false;
        this.selectedItem = null;
      });
    },
    addNewLine(){ //新建线路
      sessionStorage.setItem('addType','travelRelation');
      this.$router.push('travelLineAdd');
    },
    relationLine(){ //关联已有线路
      this.addSelectDialog = false;
      this.lineSelectDialog = true;
    },
    cloneLine(){ //克隆线路
      if(!this.selectedLine){
        this.$message({
          message: '请选择关联路线',
          type: 'warning'
        });
        return false;
      }
      let travelLineItem = this.selectLineList.find(item=>{
        return item.id == this.selectedLine;
      })
      sessionStorage.setItem('travelLineItem',JSON.stringify(travelLineItem))
      sessionStorage.setItem('addType','travelRelation');
      this.$router.push('travelLineAdd');
    },
    relationAction(){
      if(!this.selectedLine){
        this.$message({
          message: '请选择关联路线',
          type: 'warning'
        });
        return false;
      }
      userLine.add({
        userId : this.userId,
        lineId : this.selectedLine,
        userLineType : 2
      }).then(res=>{
        this.lineSelectDialog = false;
        this.$message({
          message: '关联成功',
          type: 'success'
        });
        this.currentPage = 1;
        this.getLineList();
      })
    },
    handleSizeChange(page){
      this.pageSize = page;
      this.getLineList();
    },
    handleCurrentChange(page){
      this.currentPage = page;
      this.getLineList();
    },
    getTypeValue(value){
      let tmp = lineTypeList.find((item)=>{
        return item.value == value;
      });
      return tmp ? tmp.label : '-';
    },
    getModeValue(value){
      let tmp = lineModeList.find((item)=>{
        return item.value == value;
      });
      return tmp ? tmp.label : '-';
    },
    getStatusValue(value){
      let tmp = lineStatusList.find((item)=>{
        return item.value == value;
      });
      return tmp ? tmp.label : '-';
    },
    getUserLineType(value){
      let tmp = userLineType.find((item)=>{
        return item.value == value;
      });
      return tmp ? tmp.label : '-';
    },
  }
}