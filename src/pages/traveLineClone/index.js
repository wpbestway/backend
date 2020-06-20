import * as  travelLine from '@/services/travelLine';
import * as  lineDetail from '@/services/lineDetail';
export default {
  name: 'traveLineClone',
  data() {
    return {
      travelCloneId : '', //原线路id（被克隆）
      travelLineId : '',  //新建的线路id
      detailListLength : '',
      detailList : [],
      loadingFlag : '',
      loadingText : ''
    }
  },
  created(){
    this.travelCloneId = sessionStorage.getItem('travelCloneId');
    this.travelLineId = sessionStorage.getItem('travelLineItem');
    if(this.travelCloneId && this.travelLineId){
      this.cloneInit();
      this.loadingText = '主线路信息拷贝……'
    }else{
      this.$message({
        message: '缺少必要参数',
        type: 'warning'
      });
      setTimeout(()=>{
        this.$router.replace('userLine');
      },2000)
    }
  },
  methods: {
    cloneInit(){
      travelLine.detail({
        id : this.travelCloneId
      }).then((res)=>{
        this.upDataTravelLine(res.buyMark,res.feeMark)
      });
    },
    upDataTravelLine(buyMark,feeMark){
      travelLine.modify({
        id : this.travelLineId,
        buyMark : buyMark,
        feeMark : feeMark
      }).then((res)=>{
        this.getDetailList();
      });
    },
    getDetailList(id){
      lineDetail.query({
        lineId : this.travelCloneId
      }).then((res)=>{
        this.detailList = res;
        this.detailListLength = res.length;
        this.cloneDetail(0);
      })
    },
    cloneDetail(index){
      this.loadingText = `主线详情拷贝(${index}/${this.detailListLength})`;
      let item = this.detailList[index];
      let params = {
        lineId : this.travelLineId*1,
        elementType : item.elementType,
        dayIndex : item.dayIndex,
        elementId : item.elementId,
        elementType : item.elementType,
        elementOrder :item.elementOrder
      };
      let elementContent
      if(item.elementContent){
        let tmp = JSON.parse(item.elementContent);
        elementContent = {
          elementDes : tmp.elementDes
        }
        if(item.elementType == 1){
          elementContent.openTimeArea = tmp.openTimeArea;
        }
      }else{
        elementContent = {
          elementDes : ''
        }
      }
      params.elementContent = JSON.stringify(elementContent);
      lineDetail.add(params).then((res)=>{
        this.loopCheck(index);
      }).catch(err=>{
        this.$message({
          message: "一线路详情拷贝失败",
          type: 'warning'
        });
        this.loopCheck(index);
      })
    },
    loopCheck(index){
      index = index + 1;
      if(index < this.detailListLength){
        this.cloneDetail(index)
      }else{
        this.$router.replace('traveLineSet');
      }
    }
  }
}