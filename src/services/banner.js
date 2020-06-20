import request from '../utils/request';
import {mpInterface} from './interface';

//获取小程序banner
export function getBanners(params){
	return request({
		url: '/bannerImg',
		method: 'get',
		params
	});
}
export function getBanner(id){
	return request({
		url: '/bannerImg/' + id,
		method: 'get',
		params: { id }
	});
}
export function addBanner(data, params){
	return request({
		url: 'bannerImg/add',
		method: 'post',
		data,
		params
	})
}
export function updateBanner(data, params){
	return request({
		url: 'bannerImg/update',
		method: 'post',
		data,
		params
	})
}
export function deleteBanner(id){
	return request({
		url: 'bannerImg/' + id,
		method: 'delete'
	})
}