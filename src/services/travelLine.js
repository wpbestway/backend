import api from './api';
import {LineInterface} from './interface';

//获取路线列表，get
export function getList(params){
	return api(LineInterface.getList,params);
}
//增加路线
export function add(params){
	return api(LineInterface.add,params);
}
//修改路线
export function modify(params){
	return api(LineInterface.modify,params);
}
//删除路线
export function del(params){
	return api(LineInterface.del,params);
}
//获取单个路线详情
export function detail(params){
	return api(LineInterface.detail,params);
}
//获取单个路线详情
export function query(params){
	return api(LineInterface.query,params);
}
//获取路线列表，post,可按条件查询
export function queryPage(params){
	return api(LineInterface.queryPage,params);
}
