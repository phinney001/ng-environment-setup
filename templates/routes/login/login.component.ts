import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { UserService, UserInfo } from '@app/core/user.service'
import { HttpService } from '@app/core/http.service'
import { NzMessageService } from 'ng-zorro-antd'
import { StorageService } from '@app/core/storage.service'

/**
 * 用户账户密码信息
 * @param userName 用户账户
 * @param password 用户密码
 * @param remember 是否记住密码
 */
interface RememberInfo {
  userName?: string
  password?: string
  remember?: boolean
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usr: UserService,
    private http: HttpService,
    private msg: NzMessageService,
    private storage: StorageService,
  ) { }

  // 登录信息表单
  validateForm: FormGroup

  // 设置用户账号信息
  set remember(remember: RememberInfo) {
    remember.password = this.crypto(remember.password, true)
    this.storage.setLocal('remember', remember)
  }
  // 获取用户账号信息
  get remember(): RememberInfo {
    return this.storage.getLocal('remember') || {}
  }

  /**
   * 加解密算法
   * @param code 需要加解密的字符串
   * @param isEncrypt 是否是加密
   */
  crypto(code: string, isEncrypt?: boolean): string {
    if (!code) {
      return code
    }
    code = isEncrypt ? code : unescape(code)
    let c = String.fromCharCode(code.charCodeAt(0) + (isEncrypt ? code.length : -code.length))
    for (let i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) + (isEncrypt ? code.charCodeAt(i - 1) : -c.charCodeAt(i - 1)))
    }
    return isEncrypt ? escape(c) : c
  }

  /**
   * 登录提交
   */
  submit(): void {
    Object.keys(this.validateForm.controls).forEach(i => {
      this.validateForm.controls[i].markAsDirty()
      this.validateForm.controls[i].updateValueAndValidity()
    })
    if (this.validateForm.valid) {
      // this.http.post('/login/front', this.validateForm.value, { isBody: false }).subscribe((res: UserInfo) => {
      //   if (res) {
      //     this.usr.setUserInfo({
      //       ...res
      //     })
          this.usr.setUserInfo({
            ...this.validateForm.value,
            token: '111',
            menus: [
              {
                id: 1,
                title: '主页',
                icon: 'home',
                link: '/home'
              }
            ]
          })
          if (this.validateForm.value.remember) {
            this.remember = this.validateForm.value
          } else {
            this.storage.removeLocal('remember')
          }
          this.msg.success('登录成功！')
          this.router.navigateByUrl('/home')
      //   }
      // })
    }
  }

  /**
   * 初始化表单
   */
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [this.remember.userName, [Validators.required]],
      password: [this.crypto(this.remember.password), [Validators.required]],
      remember: [true]
    })
  }
}
