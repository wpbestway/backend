import api from './api';
import {carInterface} from './interface';

//获取车辆列表,get请求
export function getList(params){
	return api(carInterface.getList,params);
}
//增加车辆
export function add(params){
	return api(carInterface.add,params);
}
//修改车辆
export function modify(params){
	return api(carInterface.modify,params);
}
//删除车辆
export function del(params){
	return api(carInterface.del,params);
}
//获取单个车辆详情
export function detail(params){
	return api(carInterface.detail,params);
}
//获取所有列表
export function query(){
	return api(carInterface.query);
}
//获取车辆列表,post请求
export function queryPage(params){
	return api(carInterface.queryPage,params);
}
