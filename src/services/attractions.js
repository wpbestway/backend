import api from './api';
import {siteInterface} from './interface';

//获取景区列表,无查询条件
export function getList(params){
	return api(siteInterface.getList,params);
}
//增加景区
export function add(params){
	return api(siteInterface.add,params);
}
//修改景区
export function modify(params){
	return api(siteInterface.modify,params);
}
//删除景区
export function del(params){
	return api(siteInterface.del,params);
}
//获取单个景区详情
export function detail(params){
	return api(siteInterface.detail,params);
}
//获取所有列表
export function query(){
	return api(siteInterface.query);
}
//获取景区列表,有查询条件
export function queryPage(params){
	return api(siteInterface.queryPage,params);
}