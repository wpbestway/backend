import api from './api';
import {userTravelLinesInterface} from './interface';

//获取餐饮列表，get
export function getList(params){
	return api(userTravelLinesInterface.getList,params);
}
//增加餐饮
export function add(params){
	return api(userTravelLinesInterface.add,params);
}
//修改餐饮
export function modify(params){
	return api(userTravelLinesInterface.modify,params);
}
//删除餐饮
export function del(params){
	return api(userTravelLinesInterface.del,params);
}
//获取单个餐饮详情
export function detail(params){
	return api(userTravelLinesInterface.detail,params);
}
//获取所有列表
export function query(){
	return api(userTravelLinesInterface.query);
}
//获取餐饮列表，post,可按条件查询
export function queryPage(params){
	return api(userTravelLinesInterface.queryPage,params);
}
