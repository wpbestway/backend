import axios from 'axios';
import { Message } from 'element-ui';

axios.interceptors.response.use(res=>{
	let result = res.data;
	if(result.code == 0){
		return result.data;
	}else{
		Message({
			message : result.msg,
			duration : 5000
		});
		return 'err'; //当前未找到合适的方法
	}
}, function (error) {
  	return Promise.reject(error);
});

export default function(interFace,data={},params={}){
	let opt = { //默认参数
	    dataType : 'json', //数据类型
	    headers : {}, //请求头
	};
	//url处理,主要针对/aa/bb/{cc},其中cc是参数的请求
	let url = interFace.url.replace(/\{(\w+)\}$/,function(word){
		return data[word.replace(/\{|\}/g,'')];
	});
	//判断若是post请求,是否需要处理url的query部分
	if(interFace.type == 'post' && interFace.query){
		let tmp = '?';
		interFace.query.forEach((item) => {
			tmp += `${item}=${data[item]}&`;
			delete data[item];
		});
		url += tmp.slice(0,-1);
	}
	//参数合并
	Object.assign(opt,params);
	return axios({
		method: interFace.type,
		url: url,
		data: data,
		headers : opt.headers,
		responseType : opt.dataType
	}).catch((err)=>{
  		Message(err);
	});
}