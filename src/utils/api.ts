import Http from './http';

const http = new Http();

const baseUrl = 'https://pin.varbee.com/cloudprint/api/';
// 店铺详情接口
export async function getShopDetail(data, contentType?) {
  return await http.get(`${baseUrl}merchant/getShopDetail`, data, contentType);
}
// 订单详情接口
export async function orderDetail(data, contentType?) {
  return await http.get(`${baseUrl}order/orderDetail`, data, contentType);
}
//正在打印的订单列表接口
export async function printingList(data, contentType?) {
  return await http.post(`${baseUrl}order/printingList`, data, contentType);
}
// 反馈页面接口
export async function feedBack(data, contentType?) {
  return await http.post(`${baseUrl}feedback/feedback`, data, contentType);
}
// 我的订单页面接口
export async function myOrderList(data, contentType?) {
  return await http.post(`${baseUrl}order/myOrderList`, data, contentType);
}
