//AUZOU的域名配置
let AUZOU_HOST;
if(process.env.NODE_ENV === 'production') {
    AUZOU_HOST = '/admin/';
} else {
    AUZOU_HOST = '/admin/';
}
const AUZOU_DOMAIN = 'https://www.aiuzou.com';

export { AUZOU_HOST, AUZOU_DOMAIN, };