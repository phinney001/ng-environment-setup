import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

import { Subject, Observable } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { environment } from '@environments/environment'

declare type HttpObserve = 'body' | 'events' | 'response'
declare type HttpResponseType = 'arraybuffer' | 'blob' | 'json' | 'text'

/**
 * 请求配置
 * @param body 请求体
 * @param params 请求参数
 * @param headers 请求头
 * @param observe 响应数据类型 body|events|response: 响应体|进度响应数据(用于文件传输)|响应对象(响应头+响应体)
 * @param reportProgress 是否返回文件传输进度
 * @param responseType 响应数据类型 arraybuffer|blob|json|text: 二进制数据|Blob对象|JSON对象|文本
 * @param withCredentials 跨域请求时是否需要使用凭证
 * @param isBody 请求参数放置位置
 * @param isPostOrPut 是否是post或put请求
 */
interface HttpOptions {
  body?: any;
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  observe?: HttpObserve;
  reportProgress?: boolean;
  responseType?: HttpResponseType;
  withCredentials?: boolean;
  isBody?: boolean;
  isPostOrPut?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  // 请求订阅
  public sub$ = new Subject();

  /**
   * 请求参数拼接
   *
   * @param url 请求地址
   * @param data 请求数据
   * @param options 请求配置
   */
  protected paramsBuild(url: string, data: any, options: HttpOptions = {}) {
    // 请求参数数组
    const paramsArray = []
    // 请求配置
    const paramsOptions: HttpOptions = {
      responseType: 'json',
      withCredentials: true,
      ...options
    }

    // 请求url
    if (url.startsWith('http://') || url.startsWith('https://')) {
      paramsArray.push(url)
    } else {
      paramsArray.push(environment.apiurl + url)
    }

    // 当请求为post为put时第二个参数为body
    if (options.isPostOrPut) {
      paramsArray.push(data)
    }

    // 请求参数放置位置
    if (options.isBody) {
      paramsOptions.body = data
    } else {
      if (data && typeof data === 'object') {
        paramsOptions.params = Object.keys(data).reduce((t, c) => {
          return {
            ...t,
            [c]: (data[c] !== 0 && !data[c]) ? '' : data[c]
          }
        }, {})
      } else {
        paramsOptions.params = data
      }
    }

    // 添加参数options
    paramsArray.push(paramsOptions)

    return paramsArray
  }

  /**
   * url地址和参数拼接
   *
   * @param url 地址
   * @param params 参数
   */
  public urlBuild(url: string, params?: any): string {
    let apiurl = environment.apiurl + url
    if (url.startsWith('http:') || url.startsWith('https:')) {
      apiurl = url
    }
    if (params && typeof params === 'object') {
      return Object.keys(params).reduce((a, c, i) => {
        if (i === 0) {
          return `${a}?${c}=${params[c]}`
        }
        return `${a}&${c}=${params[c]}`
      }, apiurl)
    }
    return apiurl
  }

  /**
   * GET请求
   *
   * @param url 请求地址
   * @param data 请求数据
   * @param options 请求配置
   */
  get(url: string, data?: any, options?: HttpOptions): Observable<any> {
    const params = this.paramsBuild(url, data, options)
    return this.http.get<any>(params[0], params[1]).pipe(takeUntil(this.sub$))
  }

  /**
   * POST请求
   *
   * @param url 请求地址
   * @param data 请求数据
   * @param options 请求配置
   */
  post(url: string, data?: any, options?: HttpOptions): Observable<any> {
    const params = this.paramsBuild(url, data, {
      isPostOrPut: true,
      isBody: true,
      ...options
    })
    return this.http.post<any>(params[0], params[1], params[2]).pipe(takeUntil(this.sub$))
  }

  /**
   * DELETE请求
   *
   * @param url 请求地址
   * @param data 请求数据
   * @param options 请求配置
   */
  delete(url: string, data?: any, options?: HttpOptions): Observable<any> {
    const params = this.paramsBuild(url, data, options)
    return this.http.delete<any>(params[0], params[1]).pipe(takeUntil(this.sub$))
  }

  /**
   * PUT请求
   *
   * @param url 请求地址
   * @param data 请求数据
   * @param options 请求配置
   */
  put(url: string, data?: any, options?: HttpOptions): Observable<any> {
    const params = this.paramsBuild(url, data, {
      isPostOrPut: true,
      isBody: true,
      ...options
    });
    return this.http.put<any>(params[0], params[1], params[2]).pipe(takeUntil(this.sub$))
  }

  /**
   * 下载文件
   *
   * @param fileData 文件数据
   * @param fileType 文件类型
   * @param fileName 文件名称
   */
  download(fileData: any, fileName?: string, fileType?: string) {
    const file = fileData instanceof Blob ? fileData
    : new Blob([fileData], {
      type: fileType || 'application/vnd.ms-excel'
    })
    const objectUrl = URL.createObjectURL(file)
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.setAttribute('style', 'display:none')
    a.setAttribute('href', objectUrl)
    a.setAttribute('download', fileName || fileData.name || `${'Excel-' + Date.now()}.xls`)
    a.click()
    document.body.removeChild(a)
    // 释放URL地址
    URL.revokeObjectURL(objectUrl)
  }

  /**
   * 取消订阅时取消之前发出的请求
   *
   */
  unsubscribe(): void {
    this.sub$.next()
  }
}
