import Http from './http';

const http = new Http();

const baseUrl = 'https://';

export async function test(data, contentType?) {
  return await http.get(`${baseUrl}/api/test`, data, contentType);
}