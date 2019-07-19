import Http from './http';

const http = new Http();

const baseUrl = 'https://pin.varbee.com/cloudprint/api/';

//
export async function documentList(options) {
  return await http.get(`${baseUrl}document/getAllDocument`,options);
}

