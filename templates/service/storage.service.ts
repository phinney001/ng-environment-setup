import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  /**
   * localStorage存储
   *
   * @param key 存储key
   * @param value 存储value
   */
  setLocal(key: string, value: any): void {
    let val: any = value
    if (!val) {
      val = ''
    }
    if (typeof value === 'object') {
      val = JSON.stringify(value)
    }
    localStorage.setItem(key, val)
  }

  /**
   * 根据key获取localStorage存储
   *
   * @param key 存储key
   */
  getLocal(key: string): any {
    const stringVal: string = localStorage.getItem(key)
    let lastVal: any = stringVal
    if (stringVal) {
      if ((stringVal.startsWith('{') && stringVal.endsWith('}')) || (stringVal.startsWith('[') && stringVal.endsWith(']'))) {
        try {
          lastVal = JSON.parse(stringVal)
        } catch (error) {
          console.log(error)
        }
      }
    }
    return lastVal
  }

  /**
   * 查询localStorage存储是否含有该存储key
   *
   * @param key 存储key
   */
  hasLocal(key: string): boolean {
    return localStorage.hasOwnProperty(key)
  }

  /**
   * 根据key删除localStorage存储
   *
   * @param key 存储key
   */
  removeLocal(key: string) {
    localStorage.removeItem(key)
  }

  /**
   * 删除除了expect数组内的存储key以外的所有localStorage存储
   *
   * @param except 存储key数组
   */
  clearLocal(except: Array<string> = []) {
    if (except) {
      Object.keys(localStorage).forEach(key => {
        if (!except.includes(key)) {
          localStorage.removeItem(key)
        }
      })
    } else {
      localStorage.clear()
    }
  }

  /**
   * sessionStorage存储
   *
   * @param key 存储key
   * @param value 存储value
   */
  setSession(key: string, value: any) {
    let val: any = value
    if (!val) {
      val = ''
    }
    if (typeof value === 'object') {
      val = JSON.stringify(value)
    }
    sessionStorage.setItem(key, val)
  }

  /**
   * 根据key获取sessionStorage存储
   *
   * @param key 存储key
   */
  getSession(key: string) {
    const stringVal: string = sessionStorage.getItem(key)
    let lastVal: any = stringVal
    if (stringVal) {
      if ((stringVal.startsWith('{') && stringVal.endsWith('}')) || (stringVal.startsWith('[') && stringVal.endsWith(']'))) {
        try {
          lastVal = JSON.parse(stringVal)
        } catch (error) {
          console.log(error)
        }
      }
    }
    return lastVal
  }

  /**
   * 查询sessionStorage存储是否含有该存储key
   *
   * @param key 存储key
   */
  hasSession(key: string): boolean {
    return sessionStorage.hasOwnProperty(key)
  }

  /**
   * 根据key删除sessionStorage存储
   *
   * @param key 存储key
   */
  removeSession(key: string) {
    sessionStorage.removeItem(key)
  }

  /**
   * 删除除了expect数组内的存储key以外的所有sessionStorage存储
   *
   * @param except 存储key数组
   */
  clearSession(except: Array<string> = []) {
    if (except) {
      Object.keys(sessionStorage).forEach(key => {
        if (!except.includes(key)) {
          sessionStorage.removeItem(key)
        }
      })
    } else {
      sessionStorage.clear()
    }
  }

}
