
import { Injectable } from '@angular/core'

export class LoaderConfig {
  ak = ''
  constructor() {}
}


@Injectable({
  providedIn: 'root'
})
export class GaodeMapService {
  constructor(
    private config: LoaderConfig
  ) { }

  /**
   * 加载脚本
   * @param cb 回调函数
   */
  load(cb?: () => void) {
    const url = `https://webapi.amap.com/maps?v=1.4.15&key=${this.config.ak}&callback=onLoad`
    const jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    jsapi.onload = () => {
      if (typeof cb === 'function') {
        cb()
      }
    }
    document.body.appendChild(jsapi)
  }
}
