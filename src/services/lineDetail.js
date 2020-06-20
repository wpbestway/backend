import api from './api';
import {lineDetailInterface} from './interface';

//获取线路详情列表，get
export function getList(params){
	return api(lineDetailInterface.getList,params);
}
//增加线路详情
export function add(params){
	return api(lineDetailInterface.add,params);
}
//修改线路详情
export function modify(params){
	return api(lineDetailInterface.modify,params);
}
//删除线路详情
export function del(params){
	return api(lineDetailInterface.del,params);
}
//获取单个线路详情
export function detail(params){
	return api(lineDetailInterface.detail,params);
}
//获取线路详情列表,可查询,不分页
export function query(params){
	return api(lineDetailInterface.query,params);
}
//获取线路详情列表，post,可按条件查询
export function queryPage(params){
	return api(lineDetailInterface.queryPage,params);
}
