import { Injectable, Injector } from '@angular/core'
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router'
import { Observable } from 'rxjs'
import { UserService } from '@app/core/user.service'

@Injectable({
  providedIn: 'root'
})
export class RouterGuardProvider implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private injector: Injector,
    private usr: UserService
  ) { }

  /**
   * 检测登录状态
   */
  checkLogin(): boolean {
    if (!this.usr.isLogined) {
      this.injector.get(Router).navigateByUrl('/login')
    }
    return this.usr.isLogined
  }

  /**
   * 是否要导航到某路由
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin()
  }

  /**
   * 子组件是否要导航到某路由
   */
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin()
  }

  /**
   * 是否要异步导航到某特性模块
   */
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin()
  }
}
