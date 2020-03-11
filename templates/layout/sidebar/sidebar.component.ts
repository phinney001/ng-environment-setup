import { Component, OnInit } from '@angular/core'
import { SidebarService } from '@app/layout/sidebar/sidebar.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(
    public sbs: SidebarService
  ) { }

  /**
   * 初始化获取菜单
   */
  ngOnInit(): void {
    this.sbs.getMenus()
  }
}
