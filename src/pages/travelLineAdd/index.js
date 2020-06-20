import {lineModeList,lineTypeList} from '@/config/common';
import {strToUpLoadList,uploadListToStr,checkForm,delNoUseKey} from '@/utils/utils';
import * as travelLine from '@/services/travelLine';
import Upload from "@/components/upload";
export default {
  name: 'travelLineAdd',
  components: {Upload},
  data() {
    return {
      formRule : { //表单提示文案
        name: '请输入线路名称',
        lineTravelType: '请选择产品形式',
        lineType: '请选择线路类型',
        lineFee : '',
        days: '请输入天数',
        nights : '请输入夜数',
        lineVideo : '',
        lineCoverImg : '',
        mallLink : '',
        lineMark : '请输入线路介绍'
      },
      pageType : 1, //1为新增,2为更新
      formData : {
        name: '',
        lineTravelType: '',
        lineType: '',
        lineFee : '',
        days: '',
        nights : '',
        lineVideo : '',
        lineCoverImg : '',
        mallLink : '',
        lineMark : ''
      },
      lineVideo: [],
      lineCoverImg : [],
      lineModeList : lineModeList,
      lineTypeList : lineTypeList,
      lineId : ''
    }
  },
  created(){
    if(sessionStorage.getItem('travelLineItem')){
      this.setForm();
      //此处，若是addType为travelRelation，说明是关联浅拷贝
      if(sessionStorage.getItem('addType') != 'travelRelation'){
        this.pageType = 2;
      }
    }
  },
  methods: {
    addAction(){ //添加景区
      this.formatForm();
      if(!this.checkForm()){return false;}
      travelLine.add(this.formData).then((res)=>{
        let addType = sessionStorage.getItem('addType');
        if(addType == 'travelRelation'){
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          setTimeout(()=>{
            sessionStorage.setItem('travelCloneId',this.lineId);
            sessionStorage.setItem('travelLineItem',res.id);
            this.$router.push('traveLineClone');
          },2000)
        }else{
          this.$confirm('添加成功, 返回列表页,还是继续添加?', '成功提示', {
            confirmButtonText: '继续添加',
            cancelButtonText: '返回列表',
            type: 'success'
          }).then(() => {
            this.initForm();
          }).catch(() => {
            this.$router.go(-1);
          });
        }
      });
    },
    modifyAction(){ //更改线路
      this.formatForm();
      if(!this.checkForm()){return false;}
      console.log(this.formData,'this.formData')
      travelLine.modify(this.formData).then((res)=>{
        this.$message({
          message: '更改成功',
          type: 'success'
        });
        setTimeout(()=>{
          this.$router.go(-1);
        },2000)
      });
    },
    lineVideoChange(list){
      this.lineVideo = list;
    },
    lineCoverImgChange(list){
      this.lineCoverImg = list;
    },
    checkForm(){
      if(!checkForm(this.formData,this.formRule)){return false;}
      if(this.formData.lineTravelType == 1 ){
        if(!this.formData.lineFee){
          this.$message({
            message: '请输入常规游价格',
            type: 'warning'
          });
          return false;
        }
        // if(!this.formData.lineVideo){
        //   this.$message({
        //     message: '请上传路线视频',
        //     type: 'warning'
        //   });
        //   return false;
        // }
        if(!this.formData.lineCoverImg){
          this.$message({
            message: '请上传路线封面',
            type: 'warning'
          });
          return false;
        }
      }
      return true;
    },
    formatForm(){//提交前的格式化
      this.formData.revision && this.formData.revision;
      this.formData.lineVideo = uploadListToStr(this.lineVideo);
      this.formData.lineCoverImg = uploadListToStr(this.lineCoverImg);
      this.formData.days = this.formData.days*1;
      this.formData.nights = this.formData.nights*1;
    },
    setForm(){ //编辑时填充表单
      let info = delNoUseKey(JSON.parse(sessionStorage.getItem('travelLineItem')));
      console.log(info,'info')
      this.lineVideo = strToUpLoadList(info.lineVideo);
      this.lineCoverImg = strToUpLoadList(info.lineCoverImg);
      this.lineId = info.id;
      // info.id && delete info.id;
      info.revision && delete info.revision;
      this.formData = info;
    },
    initForm(){ //初始化列表
      this.formData = {
        name: '',
        lineTravelType: '',
        lineType: '',
        lineFee : '',
        days: '',
        nights : '',
        lineVideo : '',
        lineCoverImg : '',
        mallLink : '',
        lineMark : ''
      };
      this.lineVideo = [];
      this.lineCoverImg = [];
    }
  }
}