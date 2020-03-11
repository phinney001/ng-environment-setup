import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs'
import { StorageService } from '@app/core/storage.service'
import { HttpService } from '@app/core/http.service'
import { tap } from 'rxjs/operators'

/**
 * 词典列表
 * @param name 名称
 * @param value 值
 */
export interface DictList {
  name: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class DictService {
  constructor(
    private http: HttpService,
    private storage: StorageService
  ) { }

  // 词典静态数据列表
  public dict: any = {
    // 数据精度
    dataAccuracy: [
      { name: '15min', value: 1 },
      { name: '小时', value: 2 },
      { name: '天', value: 3 },
      { name: '月', value: 4 }
    ]
  }

  // 词典接口列表
  public dictApi: any = {
    // 数据类型
    dataType: '/menu/unit'
  }

  /**
   * 根据词典储存名称和代号获取词典信息
   *
   * @param name 词典储存名称
   * @param code 词典代号
   */
  getDictByName(name: string, params?: any): Observable<DictList[]> {
    // 从缓存获取
    if (this.storage.hasSession(name)) {
      return of(this.storage.getSession(name))
    }

    // 从静态数据获取
    if (this.dict[name]) {
      return of(this.dict[name])
    }

    // 从接口获取
    if (this.dictApi[name]) {
      return this.http.get(this.dictApi[name], { ...params }).pipe(
        tap((dict) => {
          // 把数据存储到缓存
          if (dict instanceof Array) {
            this.storage.setSession(name, dict)
          }
        })
      )
    }

    return of([])
  }
}
