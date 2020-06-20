import * as attractions from '@/services/attractions';
import {address,siteTypeList} from '@/config/common';
import Upload from "@/components/upload";
import {strToUpLoadList,uploadListToStr,checkForm,delNoUseKey,filterFile} from '@/utils/utils';
export default {
  name: 'attractionsAdd',
  components: {Upload},
  data() {
    return {
      formRule : { //表单提示文案
        name: '请输入景区名称',
        addr: '请选择景区所在地',
        scenicMark: '请输入景区描述',
        onlineModel: '请选择景区类型',
        durationPlay: '',
        openTimeArea: '',
        price: '请输入门票价格',
        scenicVideo : '',
        scenicMainImgs : '',
        scenicCoverImg : '',
        scenicCoverSubImg : ''
      },
      pageType : 1, //1为新增,2为更新
      formData : {
        name: '',
        addr: '',
        durationPlay: '',
        openTimeArea: '',
        price: '',
        scenicVideo : '',
        scenicMainImgs : '',
        scenicCoverImg : '',
        scenicCoverSubImg : '',
        scenicMark: '',
        onlineModel: 0
      },
      scenicVideo: [],
      scenicMainImgs: [],
      scenicCoverImg: [],
      scenicCoverSubImg : [],
      addressList : address,
      siteTypeList : siteTypeList
    }
  },
  created(){
    if(sessionStorage.getItem('attractionsItem')){
      this.setForm();
      this.pageType = 2;
    }
  },
  methods: {
    addAction(){ //添加景区
      this.formatForm();
      if(!this.checkForm()){return false;}
      attractions.add(this.formData).then((res)=>{
        this.$confirm('添加成功, 返回列表页,还是继续添加?', '成功提示', {
          confirmButtonText: '继续添加',
          cancelButtonText: '返回列表',
          type: 'success'
        }).then(() => {
          //location.reload();
          this.initForm();
        }).catch(() => {
          this.$router.go(-1);
        });
      });
    },
    modifyAction(){ //更改景区
      this.formatForm();
      if(!this.checkForm()){return false;}
      attractions.modify(this.formData).then((res)=>{
        this.$message({
          message: '更改成功',
          type: 'success'
        });
        setTimeout(()=>{
          this.$router.go(-1);
        },2000)
      });
    },
    checkForm(){
      if(!checkForm(this.formData,this.formRule)){return false;}
      if(this.formData.onlineModel == 1){
        if(!this.formData.scenicCoverImg){
          this.$message({
            message: '请输入景区封面（横图）',
            type: 'warning'
          });
          return false;
        }
        if(!this.formData.scenicCoverSubImg){
          this.$message({
            message: '请输入景区封面（竖图）',
            type: 'warning'
          });
          return false;
        }
      }
      return true;
    },
    scenicVideoChange(list){
      this.scenicVideo = list;
    },
    scenicMainChange(list){
      this.scenicMainImgs = list;
    },
    scenicCoverChange(list){
      this.scenicCoverImg = list;
    },
    scenicCoverSubChange(list){
      this.scenicCoverSubImg = list;
    },
    formatForm(){//提交前的格式化处理
      this.formData.scenicVideo = uploadListToStr(this.scenicVideo);
      this.formData.scenicMainImgs = uploadListToStr(this.scenicMainImgs);
      this.formData.scenicCoverImg = uploadListToStr(this.scenicCoverImg);
      this.formData.scenicCoverSubImg = uploadListToStr(this.scenicCoverSubImg);
      this.formData.price = this.formData.price*1;
      this.formData.addr = this.formData.addr.toString();
    },
    setForm(){ //编辑时填充表单
      let info = delNoUseKey(JSON.parse(sessionStorage.getItem('attractionsItem')));
      this.scenicVideo = strToUpLoadList(info.scenicVideo);
      this.scenicMainImgs = strToUpLoadList(info.scenicMainImgs);
      this.scenicCoverImg = strToUpLoadList(info.scenicCoverImg);
      this.scenicCoverSubImg = strToUpLoadList(info.scenicCoverSubImg);
      info.addr = info.addr * 1;
      this.formData = info;
    },
    initForm(){ //初始化列表
      this.formData = {
        name: '',
        addr: '',
        durationPlay: '',
        openTimeArea: '',
        price: '',
        scenicVideo: '',
        scenicMainImgs: '',
        scenicCoverImg: '',
        scenicCoverSubImg : '',
        scenicMark: '',
        onlineModel: 0,
        revision: 0
      };
      this.scenicVideo = [];
      this.scenicMainImgs = [];
      this.scenicCoverImg = [];
      this.scenicCoverSubImg = [];
    }
  }
}