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
// 获取店铺列表
export async function shopList(data) {
  return http.post(`${baseUrl}merchant/getAllShopInfo`,data)
}
// 绑定手机 发送验证码
export async function sendAuthCode(data: {phoneNum: string | number}, contentType?, hasMessage = true): Promise<{code: number | string, msg: string}> {
  return http.get(`${baseUrl}client/sendAuthCode`,data, contentType, hasMessage)
}
// 绑定手机 确认验证码
export async function toBindPhone(data: {phoneNum: string | number, authCode: string | number}, contentType?, hasMessage = true) {
  return http.post(`${baseUrl}client/bindPhone`,data, contentType, hasMessage)
}