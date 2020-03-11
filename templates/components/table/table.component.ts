import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

/**
 * 表格映射配置
 * @param label 名称
 * @param value 字段key
 */
export interface Map {
  label: string,
  value: string | number
}

/**
 * 表格滚动配置
 * @param x x轴滚动距离
 * @param y y轴滚动距离
 */
export interface Scroll {
  x?: string | number,
  y?: string | number
}

/**
 * 表格配置
 * @param title 表格标题
 * @param columns 表格列配置
 * @param data 表格数据
 * @param scroll 表格滚动配置
 */
export interface Table {
  title?: string
  columns: TableColumn[]
  data: any[],
  scroll?: Scroll
}

/**
 * 表格列配置
 * @param class 样式名称
 * @param label 字段名称
 * @param value 字段key
 * @param width 列宽度
 * @param left 定位到左边*px
 * @param right 定位到右边*px
 * @param template 是否使用ng-template模板
 * @param render 渲染方法
 */
export interface TableColumn {
  class?: string,
  label: string
  value: string | number
  width?: string | number
  left?: string | number
  right?: string | number
  template?: boolean
  map?: Map[]
  render?: (data: any) => string
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  // 表格单元格ng-template模板
  @ContentChild('tdCustomTpl', { static: true }) tdCustomTpl: TemplateRef<any>

  constructor(
    public sanitize: DomSanitizer
  ) { }

  // 表格配置
  tableData: Table = {
    columns: [],
    data: []
  }

  // 表格配置
  @Input()
  set data(data: Table) {
    if (data && data.scroll) {
      Object.keys(data.scroll).forEach(key => {
        if (typeof data.scroll[key] === 'number') {
          data.scroll[key] = data.scroll[key] + 'px'
        }
      })
    }
    if (data && data.columns instanceof Array) {
      data.columns.forEach((column: TableColumn) => {
        ['width', 'left', 'right'].forEach(key => {
          if (typeof column[key] === 'number') {
            column[key] = column[key] + 'px'
          }
        })
      })
    }
    this.tableData = data || {
      columns: [],
      data: []
    }
  }
  get data(): Table {
    return this.tableData
  }

  /**
   * 初始化
   */
  ngOnInit() {
  }

}
