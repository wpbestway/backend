import {login} from '@/services/login';
import {setUserToken} from '@/utils/storage';
export default {
  name: 'login',
  components: {},
  data() {
    return {
      ruleForm : {
        username: '请输入账号',
        password: '请输入密码',
      },
      loginForm: {
        username: '',
        password: '',
      },
      vCodeImg : '../../assets/image/v-code-image.png'
    }
  },
  created(){},
  methods: {
    handleLogin() {
      if(!this.checkForm()){return false;}
      login(this.loginForm).then(res=>{
        setUserToken(new Date().valueOf());
        this.$router.push('/main/caterers');
      }).catch(err=>{
        this.$message({
          message: '账号密码错误',
          type: 'error'
        });
      });
    },
    checkForm(){
      let tmp = Object.keys(this.loginForm).find((item)=>{
        return this.loginForm[item] === '' && this.ruleForm[item];
      });
      //若是tmp有值则说明存在未填写字段
      if(tmp){
        this.$message({
          message: this.ruleForm[tmp],
          type: 'warning'
        });
        return false;
      }else{
        return true;
      }
    },
  }
}