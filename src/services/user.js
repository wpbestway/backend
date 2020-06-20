import api from './api';
import {userInterface} from './interface';

//获取餐饮列表，get
export function getList(params){
	return api(userInterface.getList,params);
}
//增加餐饮
export function add(params){
	return api(userInterface.add,params);
}
//修改餐饮
export function modify(params){
	return api(userInterface.modify,params);
}
//删除餐饮
export function del(params){
	return api(userInterface.del,params);
}
//获取单个餐饮详情
export function detail(params){
	return api(userInterface.detail,params);
}
//获取所有列表
export function query(){
	return api(userInterface.query);
}
//获取餐饮列表，post,可按条件查询
export function queryPage(params){
	return api(userInterface.queryPage,params);
}
