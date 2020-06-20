import * as caterers from '@/services/caterers';
import {footerType,foodTimeType} from '@/config/common';
import Upload from "@/components/upload";
import {strToUpLoadList,uploadListToStr,checkForm,delNoUseKey} from '@/utils/utils';
export default {
  name: 'caterersAdd',
  components: {Upload},
  data() {
    return {
      formRule : { //表单提示文案
        name: '请输入方案名称',
        solutionType: '请选择餐饮形式',
        foodTimeType: '请选择方案类型',
        solutionEndPrice : '',
        solutionImgs: '',
        solutionMark: '',
      },
      pageType : 1, //1为新增,2为更新
      formData : {
        name: '',
        solutionType: '',
        solutionEndPrice : '',
        foodTimeType: '',
        solutionImgs: '',
        solutionMark: '',
      },
      solutionImgs: [],
      solutionTypeList : footerType,
      foodTimeTypeList : foodTimeType
    }
  },
  created(){
    if(sessionStorage.getItem('caterersItem')){
      this.setForm();
      this.pageType = 2;
    }
  },
  methods: {
    addAction(){ //添加景区
      this.formatForm();
      if(!this.checkForm()){return false;}
      caterers.add(this.formData).then((res)=>{
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
      caterers.modify(this.formData).then((res)=>{
        this.$message({
          message: '更改成功',
          type: 'success'
        });
        setTimeout(()=>{
          this.$router.go(-1);
        },2000)
      });
    },
    solutionImgsChange(list){
      this.solutionImgs = list;
    },
    checkForm(){
      return checkForm(this.formData,this.formRule);
    },
    formatForm(){//提交前的格式化处理
      this.formData.solutionImgs = uploadListToStr(this.solutionImgs);
    },
    setForm(){ //编辑时填充表单
      let info = delNoUseKey(JSON.parse(sessionStorage.getItem('caterersItem')));
      this.solutionImgs = strToUpLoadList(info.solutionImgs);
      this.formData = info;
    },
    initForm(){ //初始化列表
      this.formData = {
        name: '',
        solutionType: '',
        foodTimeType: '',
        solutionImgs: '',
        solutionMark: ''
      };
      this.solutionImgs = [];
    }
  }
}