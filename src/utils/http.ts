import Taro from '@tarojs/taro';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// 默认为json格式, 可以通过传入第三个参数修改
const defaultContentType = 'application/json';

export default class Http {
  /**
   * @desc GET
   * @param {} url 请求地址
   * @param {} data 请求参数
   * @param {} contentType 请求格式
   * @param boolean hasMessage 是否带上请求信息
   */
  get(url: string, data?: object, contentType = defaultContentType, hasMessage = false): any {
    return this.commonHttp('GET', url, data || {}, contentType, hasMessage);
  }
  /**
   * @desc POST
   * @param {} url 请求地址
   * @param {} data 请求参数
   * @param {} contentType 请求格式 
   */
  post(url: string, data?: object, contentType = defaultContentType, hasMessage = false): any {
    return this.commonHttp('POST', url, data || {}, contentType, hasMessage);
  }
  /**
   * @desc DELETE
   * @param {} url 请求地址
   * @param {} data 请求参数
   * @param {} contentType 请求格式 
   */
  delete(url: string, data?: object, contentType = defaultContentType): any {
    return this.commonHttp('DELETE', url, data || {}, contentType);
  }
  /**
   * @desc PUT
   * @param {} url 请求地址
   * @param {} data 请求参数
   * @param {} contentType 请求格式 
   */
  put(url: string, data?: object, contentType = defaultContentType): any {
    return this,this.commonHttp('PUT', url, data || {}, contentType);
  }

  async commonHttp(method: HttpMethod, url: string, data: object, contentType?, hasMessage?: boolean) {
    return new Promise(async (resolve, reject) => {
      const token = Taro.getStorageSync('token') || '';
      try {
        const res = await Taro.request({
          url,
          method,
          data,
          header: {
            'content-type': contentType || defaultContentType,
            'token': token
          },
        });
        console.log(
          `以下为调试信息:\n 请求地址:${url}\n 请求方式: ${method}\n token: ${token} \n 请求格式: ${contentType} \n 请求参数: ${JSON.stringify(
            data)}\n 返回结果:  `, res),"ghghghghghgghg";
        if (hasMessage) {
          return resolve(res.data)
        } else {
          switch (res.data.code) {
            case 1:
              return resolve(res.data.data);
            default:
              reject(res.data);
          }
        }
      } catch (error) {
        throw Error('出现错误: ' + error);
      }
    })
  }
}