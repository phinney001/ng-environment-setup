import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { UserService } from '@app/core/user.service'
import { StorageService } from '@app/core/storage.service'
import { HttpService } from '@app/core/http.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private modal: NzModalService,
    private msg: NzMessageService,
    private http: HttpService,
    public usr: UserService,
    private storage: StorageService
  ) { }

  /**
   * 退出登录
   */
  logout(): void {
    this.modal.confirm({
      nzTitle: '退出确认',
      nzContent: '确定要退出登录吗？',
      nzOnOk: () => {
        // this.http.post('/login/logout').subscribe(res => {
        //   if (res) {
            this.msg.success('退出成功！')
            this.storage.clearLocal(['remember'])
            this.storage.clearSession()
            this.router.navigateByUrl('/login')
        //   }
        // })
      }
    })
  }
}
