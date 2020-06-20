import api from './api';
import {hotelInterface} from './interface';

//获取酒店列表，get
export function getList(params){
	return api(hotelInterface.getList,params);
}
//增加酒店
export function add(params){
	return api(hotelInterface.add,params);
}
//修改酒店
export function modify(params){
	return api(hotelInterface.modify,params);
}
//删除酒店
export function del(params){
	return api(hotelInterface.del,params);
}
//获取单个酒店详情
export function detail(params){
	return api(hotelInterface.detail,params);
}
//获取所有列表
export function query(){
	return api(hotelInterface.query);
}
//获取酒店列表，post,可按条件查询
export function queryPage(params){
	return api(hotelInterface.queryPage,params);
}
