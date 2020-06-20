import * as hotel from '@/services/hotel';
import {hotelLevel,address} from '@/config/common';
import Upload from "@/components/upload";
import {strToUpLoadList,uploadListToStr,checkForm,delNoUseKey} from '@/utils/utils';
export default {
  name: 'hotelAdd',
  components: {Upload},
  data() {
    return {
      formRule : { //表单提示文案
        name: '请输入酒店名称',
        addr: '请选择酒店所在地区',
        hotelLevel: '请选择酒店星级',
        lowestPrice: '',
        highestPrice: '',
        hotelVideo : '',
        hotelImg : '',
        hotelMark : '请输入酒店介绍'
      },
      pageType : 1, //1为新增,2为更新
      formData : {
        name: '',
        addr: '',
        hotelLevel: '',
        lowestPrice: '',
        highestPrice: '',
        hotelVideo : '',
        hotelImg : '',
        hotelMark : ''
      },
      hotelVideo: [],
      hotelImg: [],
      addressList : address,
      hotelTypeList : hotelLevel
    }
  },
  created(){
    if(sessionStorage.getItem('hotelItem')){
      this.setForm();
      this.pageType = 2;
    }
  },
  methods: {
    addAction(){ //添加景区
      this.formatForm();
      if(!this.checkForm()){return false;}
      hotel.add(this.formData).then((res)=>{
        this.$confirm('添加成功, 返回列表页,还是继续添加?', '成功提示', {
          confirmButtonText: '继续添加',
          cancelButtonText: '返回列表',
          type: 'success'
        }).then(() => {
          this.initForm();
        }).catch(() => {
          this.$router.go(-1);
        });
      });
    },
    modifyAction(){ //更改景区
      this.formatForm();
      if(!this.checkForm()){return false;}
      hotel.modify(this.formData).then((res)=>{
        this.$message({
          message: '更改成功',
          type: 'success'
        });
        setTimeout(()=>{
          this.$router.go(-1);
        },2000)
      });
    },
    hotelImgChange(list){
      this.hotelImg = list;
    },
    hotelVideoChange(list){
      this.hotelVideo = list;
    },
    checkForm(){
      return checkForm(this.formData,this.formRule);
    },
    formatForm(){//提交前的格式化处理
      this.formData.hotelVideo = uploadListToStr(this.hotelVideo);
      this.formData.hotelImg = uploadListToStr(this.hotelImg);
      this.formData.highestPrice = this.formData.highestPrice*1;
    },
    setForm(){ //编辑时填充表单
      let info = delNoUseKey(JSON.parse(sessionStorage.getItem('hotelItem')));
      this.hotelVideo = strToUpLoadList(info.hotelVideo);
      this.hotelImg = strToUpLoadList(info.hotelImg);
      this.formData = info;
    },
    initForm(){ //初始化列表
      this.formData = {
        name: '',
        addr: '',
        hotelLevel: '',
        lowestPrice: '',
        highestPrice: '',
        hotelVideo : '',
        hotelImg : '',
        hotelMark : ''
      };
      this.hotelVideo = [];
      this.hotelImg = [];
    }
  }
}