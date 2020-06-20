import api from './api';
import {caterersInterface} from './interface';

//获取餐饮列表，get
export function getList(params){
	return api(caterersInterface.getList,params);
}
//增加餐饮
export function add(params){
	return api(caterersInterface.add,params);
}
//修改餐饮
export function modify(params){
	return api(caterersInterface.modify,params);
}
//删除餐饮
export function del(params){
	return api(caterersInterface.del,params);
}
//获取单个餐饮详情
export function detail(params){
	return api(caterersInterface.detail,params);
}
//获取所有列表
export function query(){
	return api(caterersInterface.query);
}
//获取餐饮列表，post,可按条件查询
export function queryPage(params){
	return api(caterersInterface.queryPage,params);
}
