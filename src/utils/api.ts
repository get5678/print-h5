import Http from './http';

const http = new Http();

const baseUrl = 'https://pin.varbee.com/cloudprint/api/';
// 店铺详情接口
export async function getShopDetail(data, contentType?) {
  return http.get(`${baseUrl}merchant/getShopDetail`, data, contentType);
}
// 订单详情接口
export async function orderDetail(data, contentType?) {
  return http.get(`${baseUrl}order/orderDetail`, data, contentType);
}
//正在打印的订单列表接口
export async function printingList(data, contentType?) {
  return http.post(`${baseUrl}order/printingList`, data, contentType);
}
// 反馈页面接口
export async function feedBack(data, contentType?) {
  return http.post(`${baseUrl}feedback/feedback`, data, contentType);
}
// 我的订单页面接口
export async function myOrderList(data, contentType?) {
  return http.post(`${baseUrl}order/myOrderList`, data, contentType);
}
// 我的文档页面接口
export async function documentList(data, contentType?) {
  return http.post(`${baseUrl}document/getAllDocument`,data, contentType);
}
// 上传文件
export async function uploadFile(data, contentType?) {
  return http.post(`${baseUrl}document/upload`, data, contentType);
}
// 获取价格组合
export async function groupPrice(data) {
  return http.get(`${baseUrl}merchant/combination`,data)
}
// 确认收货
export async function Tosure(data) {
  return http.get(`${baseUrl}order/verify`,data)
}
// 获取店铺列表
export async function shopList(data) {
  return http.post(`${baseUrl}merchant/getAllShopInfo`,data)
}
// 绑定手机 发送验证码
export async function sendAuthCode(data: {phoneNum: string | number, flag: number}, contentType?, hasMessage = true): Promise<{code: number | string, msg: string}> {
  return http.get(`${baseUrl}client/sendAuthCode`,data, contentType, hasMessage)
}
/**
 * @description 绑定手机 确认验证码
 * @param {({phoneNum: string | number, authCode: string | number, psw: string, flag: number})} data
 * @param {*} [contentType]
 * @param {boolean} [hasMessage=true]
 * @returns
 */
export async function toBindPhone(data: {phoneNum: string | number, authCode: string | number, psw: string}, contentType?, hasMessage = true) {
  return http.post(`${baseUrl}client/phone/register`,data, contentType, hasMessage)
}

/**
 * @description 手机号登录
 * @export
 * @param {{phoneNum: string, psw: string}} data
 * @returns
 */
export async function toLogin(data: {phoneNum: string, psw: string}, contentType?, hasMessage = true) {
  return http.post(`${baseUrl}client/phone/login`, data, contentType, hasMessage)
}

/**
 * @description 修改密码
 * @param {{phoneNum: string, psw: string, authCode: string}} data
 * @param {*} [contentType]
 * @param {boolean} [hasMessage=true]
 * @returns
 */
export async function changePsw(data: {phoneNum: string, psw: string, authCode: string}, contentType?: any, hasMessage: boolean = true) {
  return http.post(`${baseUrl}client/changePsw`, data, contentType, hasMessage)
}
// 获取订单号码
export async function payorderId(data) {
  return http.post(`${baseUrl}wxpay/min`, data);
}

//  打印
export async function wxpayPrint(data, contentType) {
  return http.post(`${baseUrl}wxpay/min/reback`,data, contentType);
}