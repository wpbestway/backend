import {user} from '@/config/login';

export function login(params){
	let tmp = user.find((item)=>{
		return item.username == params.username
	});
	return new Promise((resolve,reject) => {
      if(tmp && tmp.password == params.password){
          resolve({
						code : 0,
						message : '登陆成功'
					});
      }else{
          reject({
					code : -1,
					message : '登陆失败'
				});
      }
  });
}