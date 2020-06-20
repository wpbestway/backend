import {query as trafficQuery} from '@/services/traffic';
import {query as attractionsQuery} from '@/services/attractions';
import {query as hotelQuery} from '@/services/hotel';
import {query as caterersQuery} from '@/services/caterers';
import * as  travelLine from '@/services/travelLine';
import * as  lineDetail from '@/services/lineDetail';
export default {
  name: 'userLineDetail',
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
      dayMap : ['一','二','三','四','五','六','七','八','九','十'],
    }
  },
  created(){
    this.init();
  },
  methods: {
    init(){
      this.setInfo();
    },
  	tabChange(){
      //console.log(this.lineActive);
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
      let travelLineId = sessionStorage.getItem('userLineItem');
      console.log(travelLineId)
      if(!travelLineId){this.$router.push('userLine');}
      this.getTravelLineDetail(travelLineId);
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
    }
  }
}