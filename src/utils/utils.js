import { Message } from 'element-ui';
//图片字符串转列表
export function strToUpLoadList(str) {
	if(str){
    let strList = str.split(',');
    let tmp = [];
    strList.forEach((item)=>{
      tmp.push({
        name : getfileName(item),
        url : item,
      })
    });
    return tmp;
  }else{
    return [];
  }
}
//图片列表转字符串
export function  uploadListToStr(list){
  let tmp = [];
  list.forEach((item)=>{
    tmp.push(item.url);
  })
  return tmp.join(',');
};
//截取url后最后一位
export function getfileName(str){
  let tmp = str.split('/');
  return filterFile(tmp[tmp.length - 1]);
};
//表单验证
export function checkForm(form,rule){
	let tmp = Object.keys(form).find((item)=>{
    return form[item] === '' && rule[item];
  });
  //若是tmp有值则说明存在未填写字段
  if(tmp){
    Message({
      message: rule[tmp],
      type: 'warning'
    });
    return false;
  }
  return true;
}
//删除无用的字段
export function delNoUseKey(info){
	delete info['createdBy'];
  delete info['createdTime'];
  delete info['updatedBy'];
  delete info['updatedTime'];
  return info;
}
//分转元
export function centsToYuan(value){
  return ((value/100).toFixed(2) || 0);
}
//元转分
export function yuanToCents(value){
  return value*100;
}
//过滤文件前的时间戳
export function filterFile(fileName){
  return fileName.replace(/^\d+_/,'');
}
//文件名增加时间戳
export function addFileSecnod(fileName){
  return `${new Date().valueOf()}_${fileName}`;
}