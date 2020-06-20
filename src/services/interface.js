import {
  AUZOU_HOST,
} from '../config/host'

//餐饮相关接口
export const caterersInterface = {
	getList : { //列表，get
		url : `${AUZOU_HOST}travelFoodSolutions`,
		type : 'get'
	},
	add : { //添加
		url : `${AUZOU_HOST}travelFoodSolutions/add`,
		type : 'post'
	},
	modify : { //修改
		url : `${AUZOU_HOST}travelFoodSolutions`,
		type : 'put'
	},
	del : { //删除
		url : `${AUZOU_HOST}travelFoodSolutions/{id}`,
		type : 'delete'
	},
	detail : { //详情
		url : `${AUZOU_HOST}travelFoodSolutions/{id}`,
		type : 'get'
	},
	query : { //列表，post
		url : `${AUZOU_HOST}travelFoodSolutions/query`,
		type : 'post'
	},
	queryPage : { //列表，分页,post
		url : `${AUZOU_HOST}travelFoodSolutions/queryPage`,
		type : 'post',
		query : ['pageNum','pageSize']
	}
}
//用车相关接口
export const carInterface = {
	getList : { //列表，get
		url : `${AUZOU_HOST}travelCars`,
		type : 'get'
	},
	add : { //添加
		url : `${AUZOU_HOST}travelCars/add`,
		type : 'post'
	},
	modify : { //修改
		url : `${AUZOU_HOST}travelCars`,
		type : 'put'
	},
	del : { //删除
		url : `${AUZOU_HOST}travelCars/{id}`,
		type : 'delete'
	},
	detail : { //详情
		url : `${AUZOU_HOST}travelCars/{id}`,
		type : 'get'
	},
	query : { //列表，post
		url : `${AUZOU_HOST}travelCars/query`,
		type : 'post'
	},
	queryPage : { //列表，分页,post
		url : `${AUZOU_HOST}travelCars/queryPage`,
		type : 'post',
		query : ['pageNum','pageSize']
	}
}
//景点相关接口
export const siteInterface = {
	getList : { //列表
		url : `${AUZOU_HOST}travelScenics`,
		type : 'get'
	},
	add : { //添加
		url : `${AUZOU_HOST}travelScenics/add`,
		type : 'post'
	},
	modify : { //修改
		url : `${AUZOU_HOST}travelScenics`,
		type : 'put'
	},
	del : { //删除
		url : `${AUZOU_HOST}travelScenics/{id}`,
		type : 'delete'
	},
	detail : { //详情
		url : `${AUZOU_HOST}travelScenics/{id}`,
		type : 'get'
	},
	query : { //列表
		url : `${AUZOU_HOST}travelScenics/query`,
		type : 'post',
	},
	queryPage : { //列表,分页
		url : `${AUZOU_HOST}travelScenics/queryPage`,
		type : 'post',
		query : ['pageNum','pageSize']
	}
}
//酒店相关接口
export const hotelInterface = {
	getList : { //列表
		url : `${AUZOU_HOST}travelHotels`,
		type : 'get'
	},
	add : { //添加
		url : `${AUZOU_HOST}travelHotels/add`,
		type : 'post'
	},
	modify : { //修改
		url : `${AUZOU_HOST}travelHotels`,
		type : 'put'
	},
	del : { //删除
		url : `${AUZOU_HOST}travelHotels/{id}`,
		type : 'delete'
	},
	detail : {
		url : `${AUZOU_HOST}travelHotels/{id}`,
		type : 'get'
	},
	query : {
		url : `${AUZOU_HOST}travelHotels/query`,
		type : 'post'
	},
	queryPage : {
		url : `${AUZOU_HOST}travelHotels/queryPage`,
		type : 'post',
		query : ['pageNum','pageSize']
	}
}
//线路相关接口
export const LineInterface = {
	getList : { //列表
		url : `${AUZOU_HOST}travelLines`,
		type : 'get'
	},
	add : { //添加
		url : `${AUZOU_HOST}travelLines/add`,
		type : 'post'
	},
	query : { //查询
		url : `${AUZOU_HOST}travelLines/query`,
		type : 'post'
	},
	modify : { //修改
		url : `${AUZOU_HOST}travelLines`,
		type : 'put'
	},
	del : { //删除
		url : `${AUZOU_HOST}travelLines/{id}`,
		type : 'delete'
	},
	detail : { //详情
		url : `${AUZOU_HOST}travelLines/{id}`,
		type : 'get'
	},
	queryPage : {
		url : `${AUZOU_HOST}travelLines/queryPage`,
		type : 'post',
		query : ['pageNum','pageSize']
	},
}
//线路标签相关接口
export const lineTagsInterface = {
	getList : { //列表
		url : `${AUZOU_HOST}travelLineTags`,
		type : 'get'
	},
	add : { //添加
		url : `${AUZOU_HOST}travelLineTags`,
		type : 'post'
	},
	modify : { //修改
		url : `${AUZOU_HOST}travelLineTags`,
		type : 'put'
	},
	del : { //删除
		url : `${AUZOU_HOST}travelLineTags/{id}`,
		type : 'delete'
	},
	detail : { //详情
		url : `${AUZOU_HOST}travelLineTags/{id}`,
		type : 'get'
	}
}
//线路详情相关接口
export const lineDetailInterface = {
	getList : { //列表
		url : `${AUZOU_HOST}travelLineDetails`,
		type : 'get'
	},
	add : { //添加
		url : `${AUZOU_HOST}travelLineDetails/add`,
		type : 'post'
	},
	modify : { //修改
		url : `${AUZOU_HOST}travelLineDetails`,
		type : 'put'
	},
	del : { //删除
		url : `${AUZOU_HOST}travelLineDetails/{id}`,
		type : 'delete'
	},
	detail : { //详情
		url : `${AUZOU_HOST}travelLineDetails/{id}`,
		type : 'get'
	},
	query : { //详情
		url : `${AUZOU_HOST}travelLineDetails/query`,
		type : 'post'
	},
	queryPage : {
		url : `${AUZOU_HOST}travelLineDetails/queryPage`,
		type : 'post',
		query : ['pageNum','pageSize']
	},
}
//文件管理相关接口
export const fileInterface = {
	uploadFile : { //上传单个文件
		url : `${AUZOU_HOST}uploadFile`,
		type : 'post'
	},
	uploadMultipleFiles : { //批量上传文件
		url : `${AUZOU_HOST}uploadMultipleFiles`,
		type : 'post'
	}
}
export const uploadUrl = `${AUZOU_HOST}uploadFile`;
//用户相关接口
export const userInterface = {
	getList : { //列表
		url : `${AUZOU_HOST}userInfos`,
		type : 'get'
	},
	add : { //添加
		url : `${AUZOU_HOST}userInfos`,
		type : 'post'
	},
	modify : { //修改
		url : `${AUZOU_HOST}userInfos`,
		type : 'put'
	},
	del : { //删除
		url : `${AUZOU_HOST}userInfos/{id}`,
		type : 'delete'
	},
	detail : { //详情
		url : `${AUZOU_HOST}userInfos/{id}`,
		type : 'get'
	},
	query : { //详情
		url : `${AUZOU_HOST}userInfos/query`,
		type : 'post'
	},
	queryPage : {
		url : `${AUZOU_HOST}userInfos/queryPage`,
		type : 'post',
		query : ['pageNum','pageSize']
	},
}
//用户线路
export const userTravelLinesInterface = {
	getList : { //列表
		url : `${AUZOU_HOST}userTravelLines`,
		type : 'get'
	},
	add : { //添加
		url : `${AUZOU_HOST}userTravelLines/add`,
		type : 'post'
	},
	findByObj : { //通过属性查询单个用户旅行路线
		url : `${AUZOU_HOST}userTravelLines/findByObj`,
		type : 'post'
	},
	query : { //通过属性列表查询用户旅行路线
		url : `${AUZOU_HOST}userTravelLines/query`,
		type : 'post'
	},
	modify : { //修改
		url : `${AUZOU_HOST}userTravelLines`,
		type : 'put'
	},
	del : { //删除
		url : `${AUZOU_HOST}userTravelLines/{id}`,
		type : 'delete'
	},
	queryPage : { //详情
		url : `${AUZOU_HOST}userTravelLines/queryPage`,
		type : 'post',
		query : ['pageNum','pageSize']
	},
	detail : { //删除
		url : `${AUZOU_HOST}userTravelLines/{id}`,
		type : 'get'
	},
}
//旅行元素相关接口
export const elementInterface = {
	getElementList : { //列表
		url : `${AUZOU_HOST}travelElements`,
		type : 'get'
	},
	addElement : { //添加
		url : `${AUZOU_HOST}travelElements`,
		type : 'post'
	},
	modifyElement : { //修改
		url : `${AUZOU_HOST}travelElements`,
		type : 'put'
	},
	delElement : { //删除
		url : `${AUZOU_HOST}travelElements/{id}`,
		type : 'delete'
	},
	getElementDetail : { //详情
		url : `${AUZOU_HOST}travelElements/{id}`,
		type : 'get'
	}
}
//小程序相关接口
export const mpInterface = {
	getBanners : { //列表
		url : `${AUZOU_HOST}bannerImg`,
		type : 'get'
	},
	addWithUploadFile : { //新增banner
		url : `${AUZOU_HOST}bannerImg/addWithUploadFile`,
		type : 'post'
	},
	findByObj : { //查询单个banner
		url : `${AUZOU_HOST}bannerImg/findByObj`,
		type : 'post'
	},
	updateWithUploadFile: { //修改banner
		url : `${AUZOU_HOST}bannerImg/updateWithUploadFile`,
		type : 'post'
	},
	deleteBanner : { //删除banner
		url : `${AUZOU_HOST}bannerImg/{id}`,
		type : 'delete'
	}
}
