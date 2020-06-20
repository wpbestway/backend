import {query as trafficQuery} from '@/services/traffic';
import {query as attractionsQuery} from '@/services/attractions';
import {query as hotelQuery} from '@/services/hotel';
import {query as caterersQuery} from '@/services/caterers';
import * as userLine from '@/services/userLine';
import * as  travelLine from '@/services/travelLine';
import * as  lineDetail from '@/services/lineDetail';
export default {
  name: 'traveLineSet',
  components: {},
  data() {
    return {
    	lineActive : '0',
    	lineDaysList : [],
      lineInitInfo : {
        id : 0,
        buyMark : '',
        feeMark : '',
      },
      lineTypeList : [{
        value: 1,
        label: '用餐'
      },{
        value: 2,
        label: '交通'
      },{
        value: 3,
        label: '酒店'
      },{
        value: 4,
        label: '景区'
      }],
      selectItem : {},
      dialogType : 'add',
      addLineShow : false,
      addLineInfo : {},
      dayMap : ['一','二','三','四','五','六','七','八','九','十'],
      caterersList : [],
      trafficList : [],
      attractionsList : [],
      hotelList : [],
      addType : '',
      userId : ''
    }
  },
  created(){
    this.init();
  },
  methods: {
    init(){
      this.setInfo();
      this.getHotelList();
      this.getTrafficList();
      this.getAttractionsList();
      this.getCaterersList();
      this.resetAddInfo();
      let userInfo = sessionStorage.getItem('userItem');
      if(userInfo){
        this.userId = JSON.parse(userInfo).id;
      }
      this.addType = sessionStorage.getItem('addType') || '';
    },
  	tabChange(){
      //console.log(this.lineActive);
  	},
    getHotelList(){
      hotelQuery().then((res)=>{
        this.hotelList = res
      })
    },
    getTrafficList(){
      trafficQuery().then((res)=>{
        this.trafficList = res;
      })
    },
    getAttractionsList(){
      attractionsQuery().then((res)=>{
        this.attractionsList = res;
      })
    },
    getCaterersList(){
      caterersQuery().then((res)=>{
        this.caterersList = res;
      })
    },
    getDetailList(id){
      lineDetail.query({
        lineId : id
      }).then((res)=>{
        this.resetDaysList();
        res && res.forEach((item)=>{
          if(item.elementContent == '')return
          this.lineDaysList[item.dayIndex].child.push({
            id : item.id,
            title : this.getTypeValue(item.elementType),
            des : this.getTypeDes(item.elementType,item.elementContent),
            type : item.elementType,
            elementContent : item.elementContent,
            elementOrder : item.elementOrder,
            elementId : item.elementId
          })
        });
      })
    },
    resetDaysList(){
      this.lineDaysList.forEach(item => {
        item.child = [];
      });
    },
    addOneLine(){
      let params = this.formatForm();
      if(!params){return false;}
      lineDetail.add(params).then((res)=>{
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.getDetailList(this.lineInitInfo.id);
        this.addLineShow = false;
      })
    },
    delLineDetail(id){
      lineDetail.del({
        id : id
      }).then((res)=>{
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getDetailList(this.lineInitInfo.id);
      })
    },
    modifyDetail(item){
      let info = {};
      let elText = JSON.parse(item.elementContent);
      info.type = item.type;
      info.elementId = item.elementId*1;
      info.elementDes = elText.elementDes;
      if(item.type == 1){
        info.openTimeArea = elText.openTimeArea.split('-');
      }
      this.selectItem = item;
      this.dialogType = 'modify';
      this.addLineInfo = info;
      this.addLineShow = true;
    },
    modifyLine(){
      let params = this.formatForm();
      if(!params){return false;}
      params['id'] = this.selectItem.id;
      lineDetail.modify(params).then((res)=>{
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.getDetailList(this.lineInitInfo.id);
        this.addLineShow = false;
      })
    },
  	showAddTravelLine(){
      this.dialogType = 'add';
      this.resetAddInfo();
      this.addLineShow = true;
  	},
    formatForm(){
      //判断上传类型
      let info = this.addLineInfo;
      if(!info.elementId){
        let promptDes = this.getTypeValue(info.type);
        this.$message({
          message: `请选择${promptDes}方案`,
          type: 'warning'
        });
        return false;
      }
      let params = {
        elementType : info.type,
        dayIndex : this.lineActive*1,
        lineId : this.lineInitInfo.id,
        elementId : info.elementId,
        elementOrder :this.getElementOrder(info) || ''
      };
      let elementContent = {
        elementDes : info.elementDes
      };
      if(info.type == 1){
        elementContent.openTimeArea = info.openTimeArea.join('-');
      }
      params.elementContent = JSON.stringify(elementContent);
      return params;
    },
    upDataTravelLine(){
      travelLine.modify({
        id : this.lineInitInfo.id,
        buyMark : this.lineInitInfo.buyMark,
        feeMark : this.lineInitInfo.feeMark
      }).then((res)=>{
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        this.getTravelLineDetail(this.lineInitInfo.id);
      });
    },
    getElementOrder(info){
      let listInfo = this.lineDaysList[this.lineActive*1].child || [];
      if(listInfo.length == 0){
        return 1000;
      }else{
        if(info.order && /\d/.test(info.order)){
          if(info.order == 1){
            return listInfo[0].elementOrder - 1;
          }else{
            let insertOrder = Math.max(0,Math.min(parseInt(info.order),listInfo.length)) || 0;
            return listInfo[insertOrder-2].elementOrder + 1;
          }
        }else{
          return (Math.floor(listInfo[listInfo.length-1].elementOrder/1000)+1)*1000;
        }
      }
      
    },
    getTravelLineDetail(id){
      travelLine.detail({
        id : id
      }).then((travelLineItem)=>{
        this.lineInitInfo = travelLineItem;
        let days = Math.max(travelLineItem.days,travelLineItem.nights);
        let tmpList = [];
        for(var i = 0;i < days; i++){
          tmpList.push({child : []})
        }
        this.lineDaysList = tmpList;
        this.getDetailList(id);
      });
    },
    setInfo(){
      let travelLineId = sessionStorage.getItem('travelLineItem');
      if(!travelLineId){this.$router.push('travelLine');}
      this.getTravelLineDetail(travelLineId);
    },
    relativeLine(){
      userLine.add({
        userId : this.userId,
        lineId : this.lineInitInfo.id,
        userLineType : 2
      }).then(res=>{
        this.$message({
          message: '关联成功',
          type: 'success'
        });
        this.$router.push('userLine');
      })
    },
    getTypeValue(value){
      let tmp = this.lineTypeList.find((item)=>{
        return item.value == value;
      });
      return tmp ? tmp.label : '-';
    },
    getTypeDes(type,content){ //获取des描述
      let des = JSON.parse(content);
      let remark = des.elementDes ? `备注:${des.elementDes};` : '';
      if(type == 1){
        remark = `用餐时间:${des.openTimeArea};${remark}`;
      }
      let name = des.name || des.carBrand;
      let typeName = `${this.getTypeValue(type)}方案:${name}`;
      return `${typeName};${remark}`;
    },
    resetAddInfo(){
      this.addLineInfo = {
        type : 1,
        openTimeArea : ['08:00','20:00'],
        elementId : '',
        elementDes : '',
        order : ''
      };
    }
  }
}