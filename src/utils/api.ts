import Http from './http';

const http = new Http();

const baseUrl = 'https://pin.varbee.com/cloudprint';

export async function test(data, contentType?) {
  return await http.get(`${baseUrl}/api/test`, data, contentType);
}

export async function documentList(options) {
  return await http.get(`${baseUrl}/api/document/getAllDocument`,options);
}