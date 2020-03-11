import { Component, OnInit } from '@angular/core'
import { SidebarService } from '@app/layout/sidebar/sidebar.service'
import { UserService } from '@app/core/user.service'

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  constructor(
    public sbs: SidebarService,
    public user: UserService
  ) { }

  ngOnInit() {
  }

}
