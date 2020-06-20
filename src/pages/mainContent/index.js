import {getUserToken,removeUserToken} from '@/utils/storage';
export default {
  name: 'mainContent',
  components: {},
  data() {
    return {
      activeIndex : '',
      urlIndex : '',
      tapMap : {
        caterers : ['行程信息管理','餐饮管理'],
        caterersAdd : ['行程信息管理','餐饮管理','餐饮编辑'],
        traffic : ['行程信息管理','交通管理'],
        trafficAdd : ['行程信息管理','交通管理','交通编辑'],
        attractions : ['行程信息管理','景点管理'],
        attractionsAdd : ['行程信息管理','景点管理','景点编辑'],
        hotel : ['行程信息管理','酒店管理'],
        hotelAdd : ['行程信息管理','酒店管理','酒店编辑'],
        travelLine : ['旅游管理','旅游线路管理'],
        travelLineAdd : ['旅游管理','旅游线路管理','线路编辑'],
        travelLineSet : ['旅游管理','旅游线路管理','线路详情编辑']
      },
    	breadList : []
    }
  },
  created(){
    //判断是否登录状态
    if(!getUserToken()){
      this.$message({
        message: '请先登录',
        type: 'warning'
      });
      setTimeout(()=>{
        this.$router.push('/');
      },1500)
    }
  },
  mounted(){
    this.setPageInfo();
  },
  methods: {
    handleSelect(key) {
      if(this.urlIndex != key){
        this.$router.push(`/main/${key}`);
        this.breadList = this.tapMap[key];
      }
    },
    setPageInfo(){ //设置tab和breadList信息
      let pathList = this.$route.path.split('/');
      let activeIndex = pathList.pop();
      this.breadList = this.tapMap[activeIndex];
      this.urlIndex = activeIndex;
      this.activeIndex = activeIndex.replace(/(Add|Set)$/,'');
    },
    // userSet(){
    //   this.$router.push('/main/userSetting');
    // },
    logout(){
      removeUserToken();
      this.$message({
        message: '退出成功',
        type: 'success'
      });
      setTimeout(()=>{
        this.$router.push('/');
      },1500);
    }
  },
  watch:{
    $route(to,from){
      this.setPageInfo();
    }
  },
}