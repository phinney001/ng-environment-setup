import { Injectable, EventEmitter } from '@angular/core'
import { PlatformLocation } from '@angular/common'
import { UserService } from '@app/core/user.service'

/**
 * 菜单信息
 * @param id 菜单id
 * @param level 层级
 * @param title 标题
 * @param icon 图标
 * @param link 路由
 * @param open 是否展开
 * @param selected 是否选中
 * @param children 子菜单
 */
interface Menu {
  id: number | string
  level: number
  title: string
  icon?: string
  link?: string
  open?: boolean
  selected?: boolean
  children?: Menu[]
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(
    private planform: PlatformLocation,
    public user: UserService
  ) { }

  // 菜单列表
  menus: Menu[] = []

  // 是否显示缩略菜单
  isCollapsed = false

  // 缩略菜单切换事件
  public collapseEvent = new EventEmitter<boolean>()

  /**
   * 切换缩略菜单
   */
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed
    this.collapseEvent.emit(this.isCollapsed)
  }

  /**
   * 根据菜单接口配置格式化菜单
   * @param menus 菜单列表
   * @param level 菜单等级
   */
  format(menus: any[], level: number = 1): Menu[] {
    if (menus instanceof Array) {
      return menus.map((menu: any) => ({
        id: menu.id,
        title: menu.title,
        icon: menu.icon,
        link: menu.link,
        level,
        open: this.hasActivedChild(menu),
        selected: menu.link === this.planform.pathname,
        children: menu.children instanceof Array ? this.format(menu.children, level + 1) : null
      }))
    }
    return []
  }

  /**
   * 查询当前菜单是否包含选中的子菜单
   * @param menu 父级菜单
   */
  hasActivedChild(menu) {
    if (menu && menu.children instanceof Array) {
      const activedRoute = this.planform.pathname
      return menu.children.some(x => {
        if (x.link !== activedRoute) {
          if (x.children) {
            return this.hasActivedChild(x.children)
          }
          return false
        }
        return true
      })
    }
    return false
  }

  /**
   * 获取菜单列表
   */
  getMenus(): void {
    this.menus = this.format(this.user.menus)
  }

}
