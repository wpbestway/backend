import * as traffic from '@/services/traffic';
import {carType} from '@/config/common';
import Upload from "@/components/upload";
import {strToUpLoadList,uploadListToStr,checkForm,delNoUseKey} from '@/utils/utils';
export default {
  name: 'trafficAdd',
  components: {Upload},
  data() {
    return {
      formRule : { //表单提示文案
        carBrand: '请输入方案名称',
        carStyle: '请选择交通方式',
        carMode: '',
        seatsNumber: '',
        priceDay: '请输入价格',
        carImage : ''
      },
      pageType : 1, //1为新增,2为更新
      formData : {
        carBrand: '',
        carMode: '',
        carStyle: '',
        seatsNumber: '',
        priceDay: '',
        carImage : ''
      },
      carImage: [],
      carTypeList : carType
    }
  },
  created(){
    if(sessionStorage.getItem('trafficItem')){
      this.setForm();
      this.pageType = 2;
    }
  },
  methods: {
    addAction(){ //添加景区
      this.formatForm();
      if(!this.checkForm()){return false;}
      traffic.add(this.formData).then((res)=>{
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
      traffic.modify(this.formData).then((res)=>{
        this.$message({
          message: '更改成功',
          type: 'success'
        });
        setTimeout(()=>{
          this.$router.go(-1);
        },2000)
      });
    },
    carImageChange(list){
      this.carImage = list;
    },
    checkForm(){
      return checkForm(this.formData,this.formRule);
    },
    formatForm(){//提交前的格式化处理
      this.formData.carImage = uploadListToStr(this.carImage);
      this.formData.seatsNumber = this.formData.seatsNumber*1;
      this.formData.priceDay = this.formData.priceDay*1;
    },
    setForm(){ //编辑时填充表单
      let info = delNoUseKey(JSON.parse(sessionStorage.getItem('trafficItem')));
      this.carImage = strToUpLoadList(info.carImage);
      this.formData = info;
    },
    initForm(){ //初始化列表
      this.formData = {
        carBrand: '',
        carMode: '',
        carStyle: '',
        seatsNumber: '',
        formData: '',
        carImage : ''
      };
      this.carImage = [];
    }
  }
}