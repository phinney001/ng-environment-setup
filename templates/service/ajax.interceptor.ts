import { Injectable, Injector } from '@angular/core'
import { Router } from '@angular/router'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
  HttpErrorResponse,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent
} from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { mergeMap, catchError } from 'rxjs/operators'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { UserService } from '@app/core/user.service'
import { StorageService } from '@app/core/storage.service'
import { HttpService } from '@app/core/http.service'

@Injectable()
export class AjaxInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector
  ) { }

  // 模态框服务
  get modal(): NzModalService {
    return this.injector.get(NzModalService)
  }

  // 信息提示框服务
  get msg(): NzMessageService {
    return this.injector.get(NzMessageService)
  }

  // 用户信息服务
  get usr(): UserService {
    return this.injector.get(UserService)
  }

  // 存储服务
  get storage(): StorageService {
    return this.injector.get(StorageService)
  }

  // 请求服务
  get http(): HttpService {
    return this.injector.get(HttpService)
  }

  /**
   * 路由跳转
   * @param url 路由地址
   */
  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url))
  }

  /**
   * 退出登录
   */
  logout(): void {
    this.http.post('/login/logout').subscribe(res => {
      if (res) {
        this.storage.clearLocal(['remember'])
        this.storage.clearSession()
        this.goTo('/login')
      }
    })
  }

  /**
   * 判断是否是http响应数据类型
   * @param event 响应数据
   */
  isHttpResponse(event: any): boolean {
    return event instanceof HttpResponse || event instanceof HttpErrorResponse
  }

  /**
   * 请求数据处理
   * @param event 响应数据
   */
  private handleData(
    event: HttpResponse<any> | HttpErrorResponse
  ): Observable<any> {
    const eventClone: any = event
    if (this.isHttpResponse(event)) {
      switch (event.status) {
        case 200:
          const interfaceStatus = eventClone.body && eventClone.body.status
          const interfaceValue = eventClone.body && eventClone.body.value
          switch (interfaceStatus) {
              case '200': // 请求成功
                  eventClone.body = interfaceValue || true
                  break
              case '2002': // 登录失效
                  this.msg.error(interfaceValue || '登录已超时，请重新登录！')
                  eventClone.body = false
                  this.logout()
                  break
              default: // 请求失败
                  this.msg.error(interfaceValue || '操作失败！')
                  eventClone.body = false
                  break
          }
          break
        case 404:
          this.msg.error('请求地址不存在！')
          break
        case 500:
          this.msg.error('服务器错误！')
          break
        case 503:
          this.msg.error('服务器超时！')
          break
        default:
          this.msg.error(`${event.status}：请求错误！`);
          break
      }
    }
    return of(eventClone)
  }

  /**
   * 请求拦截器
   *
   * @param req 请求参数
   * @param next 一般处理程序
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    // 请求拦截统一添加token
    const newReq: any = req.clone({
      headers: this.usr.isLogined ? new HttpHeaders().set('token', this.usr.token) : new HttpHeaders()
    })
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
          if (this.isHttpResponse(event)) {
              return this.handleData(event)
          } else {
              return of(event)
          }
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err))
    )
  }
}
