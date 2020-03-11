import { Injectable } from '@angular/core'
import { StorageService } from '@app/core/storage.service'

/**
 * 用户信息
 * @param userId 用户id
 * @param userName 用户名称
 * @param token 用户token
 * @param menus 用户菜单列表
 */
export interface UserInfo {
  userId?: string;
  userName?: string;
  token?: string;
  menus?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private storage: StorageService) { }

  // 设置用户信息
  set userInfo(userInfo: UserInfo) {
    this.storage.setLocal('userInfo', userInfo)
  }
  // 获取用户信息
  get userInfo(): UserInfo {
    return this.storage.getLocal('userInfo') || {}
  }

  // 设置用户userId
  set userId(userId: string) {
    this.storage.setLocal('userId', userId)
  }
  // 获取用户userId
  get userId(): string {
    return this.storage.getLocal('userId') || ''
  }

  // 设置用户名
  set userName(userName: string) {
    this.storage.setLocal('userName', userName)
  }
  // 获取用户名
  get userName(): string {
    return this.storage.getLocal('userName') || ''
  }

  // 设置用户token
  set token(token: string) {
    this.storage.setLocal('token', token)
  }
  // 获取用户token
  get token(): string {
    return this.storage.getLocal('token') || ''
  }

  // 设置用户消息数量
  set badge(badge: string | number) {
    this.storage.setLocal('badge', badge)
  }
  // 获取用户消息数量
  get badge(): string | number {
    return this.storage.getLocal('badge') || 0
  }

  // 设置菜单列表
  set menus(menus: any[]) {
    this.storage.setLocal('menus', menus)
  }
  // 获取菜单列表
  get menus(): any[] {
    return this.storage.getLocal('menus') || []
  }

  // 获取登录状态
  get isLogined(): boolean {
    return !!this.token
  }

  /**
   * 设置用户信息
   *
   * @param userInfo 用户信息
   */
  setUserInfo(userInfo: UserInfo): void {
    const { userName, userId, token, menus } = userInfo
    this.userInfo = userInfo
    this.userName = userName
    this.userId = userId
    this.token = token
    this.menus = menus
    this.badge = 24
  }
}
