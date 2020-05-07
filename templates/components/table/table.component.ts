import { Component, OnInit, Input, ContentChild, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { NzTableComponent, NzTableQueryParams } from 'ng-zorro-antd'
import { Table, TableColumn, Pagination } from './table.interface'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  // 表格元素
  @ViewChild('nzTable', { static: false }) nzTable: NzTableComponent
  // 表格单元格ng-template模板
  @ContentChild(TemplateRef, { static: false }) customTpl: TemplateRef<any>

  // 当前页码改变时的回调函数
  @Output() pageIndexChange = new EventEmitter<number>()
  // 页数改变时的回调函数
  @Output() pageSizeChange = new EventEmitter<number>()
  // 当前页面展示数据改变的回调函数
  @Output() currentPageDataChange = new EventEmitter<any[]>()
  // 当服务端分页、筛选、排序时，用于获得参数，具体见示例
  @Output() queryParams = new EventEmitter<NzTableQueryParams>()
  // 页数/页码变化
  @Output() pageChange = new EventEmitter<Pagination>()

  constructor(
    public sanitize: DomSanitizer
  ) { }

  // 表格配置
  tableData: Table = {
    columns: [],
    data: []
  }
  // 表格列配置
  tableColumns: TableColumn[][] = []
  // 表格真实列配置
  realColumns: TableColumn[] = []
  // 多选数据
  checkData = {
    pageData: [],
    allChecked: false,
    hasChecked: false,
    ids: {},
    selection: [
      {
        text: '全选',
        onSelect: () => {
          this.checkAll(true)
        }
      },
      {
        text: '选中偶数行',
        onSelect: () => {
          this.checkData.pageData.forEach((item, index) => (this.checkData.ids[item.id] = index % 2 !== 0))
          this.refreshStatus()
        }
      },
      {
        text: '选中奇数行',
        onSelect: () => {
          this.checkData.pageData.forEach((item, index) => (this.checkData.ids[item.id] = index % 2 === 0))
          this.refreshStatus()
        }
      }
    ]
  }

  // 是否显示分页器
  @Input() pagination = true
  // 表格配置
  @Input()
  set data(data: Table) {
    const result = this.handleData(data)
    this.tableData = result || {
      columns: [],
      data: []
    }
  }
  get data(): Table {
    return this.tableData
  }

  // 多选框选中id集合
  get checkedIds(): any[] {
    return Object.keys(this.checkData.ids).filter(key => this.checkData.ids[key])
  }

  /**
   * 处理表格配置
   * @param data 表格配置数据
   */
  handleData(data: Table) {
    if (data) {
      Object.keys(data).forEach((key: string) => {
        if (['total'].includes(key)) {
          data.frontPagination = false
        }
        if ((['pagination'].includes(key) && !data[key]) || !this.pagination) {
          data.showPagination = false
          data.pageSize = Infinity
        }
      })
      data.columns = this.handleColumn(data.columns)
      const tableColumns: TableColumn[] = this.setColumnListSpan(data.columns)
      this.realColumns = this.getRealColumnList(tableColumns)
      this.tableColumns = this.formatColumnList(tableColumns)
    }
    return data
  }

  /**
   * 表格列处理
   * @param columns 表格列数据列表
   */
  handleColumn(columns: TableColumn[]): TableColumn[] {
    if (columns instanceof Array) {
      columns.forEach((item: TableColumn) => {
        if (item) {
          const funcList = ['thCheckedChange', 'sortOrderChange', 'filterChange', 'checkedChange', 'expandChange']
          funcList.forEach((key: string) => {
            if (typeof item[key] !== 'function') {
              item[key] = () => {}
            }
          })
        }
        item = {
          ...item,
          children: this.handleColumn(item.children)
        }
      })
    }
    return columns
  }

  /**
   * 获取合并列
   * @param column 表格列属性对象数组
   * @param colspan 合并列数值
   */
  getColSpan(column: any, colspan = 1) {
    const childLenth = (column.children && column.children.length) || 0
    if (childLenth) {
      return column.children.reduce((total, current) => {
        return this.getColSpan(current, total)
      }, colspan + (childLenth - 1))
    }
    return colspan
  }

  /**
   * 获取合并行
   * @param columnList 表格列属性对象数组
   * @param rowspan 合并行数值
   */
  getRowSpan(columnList: any[], rowspan = 1) {
    const hasChildren = columnList.some(x => x.children && x.children.length)
    if (hasChildren) {
      const childColumns = columnList.reduce((total, current) => {
        return [
          ...total,
          ...(current.children || [])
        ]
      }, [])
      return this.getRowSpan(childColumns, rowspan + 1)
    }
    return rowspan
  }

  /**
   * 设置表格列属性数据合并行与合并列
   * @param columnList 表格列属性数据数组
   * @param level 当前数据等级
   * @param rootColumnList 根级列属性数据数组
   */
  setColumnListSpan(columnList: any[], level = 0, rootColumnList?: any[]) {
    if (!level) {
      rootColumnList = [...columnList]
    }
    return columnList.map(column => {
      column.colspan = this.getColSpan(column)
      if (column.children && column.children.length) {
        column.rowspan = 1
        column.children = this.setColumnListSpan(column.children, level + 1, rootColumnList)
      } else {
        if (level) {
          column.rowspan = this.getRowSpan(rootColumnList) - level
        } else {
          column.rowspan = this.getRowSpan(columnList)
        }
      }
      return {
        ...column
      }
    })
  }

  /**
   * 格式化表格列属性数据
   * @param columnList 表格列属性数据数组
   * @param initList 初始数组
   */
  formatColumnList(columnList: any[], initList = []) {
    initList.push(columnList)
    const childColumns = columnList.reduce((total, current) => {
      return [
        ...total,
        ...(current.children || [])
      ]
    }, [])
    if (childColumns.length) {
      this.formatColumnList(childColumns, initList)
    }
    return initList
  }

  /**
   * 获取真正渲染数据的表格列属性数据
   * @param columnList 表格列属性数据数组
   */
  getRealColumnList(columnList) {
    return columnList.reduce((total, column) => {
      if (column.children && column.children.length) {
        return [
          ...total,
          ...this.getRealColumnList(column.children)
        ]
      }
      return [
        ...total,
        column
      ]
    }, [])
  }

  /**
   * 当前页码改变时的回调函数
   * @param index 页码
   */
  indexChange(index: number) {
    this.pageIndexChange.emit(index)
    this.sizeOrIndexChange()
  }

  /**
   * 页数改变时的回调函数
   * @param size 页数
   */
  sizeChange(size: number) {
    this.pageSizeChange.emit(size)
    this.sizeOrIndexChange()
  }

  /**
   * 页数/页码改变
   */
  sizeOrIndexChange(): void {
    const tableData: any = { ...this.nzTable }
    const pagination: Pagination = {
      total: tableData.nzTotal,
      size: tableData.nzPageSize,
      index: tableData.nzPageIndex,
    }
    this.pageChange.emit(pagination)
  }

  /**
   * 当前页面展示数据改变的回调函数
   * @param data 表格数据数组
   */
  dataChange(data: any[]) {
    this.currentPageDataChange.emit(data)
    this.checkData.pageData = data
    this.refreshStatus()
  }

  /**
   * 当服务端分页、筛选、排序时，用于获得参数，具体见示例
   * @param data 分页、筛选、排序参数
   */
  params(data: NzTableQueryParams) {
    this.queryParams.emit(data)
  }

  /**
   * 更新页数页码及总数
   * @param data 分页数据
   */
  updatePagination(data: Pagination) {
    const { total, size, index } = data
    this.nzTable.nzTotal = total
    this.nzTable.nzPageSize = size
    this.nzTable.nzPageIndex = index
  }

  /**
   * 刷新多选状态
   */
  refreshStatus(): void {
    this.checkData.allChecked = this.checkData.pageData.every(item => this.checkData.ids[item.id])
    this.checkData.hasChecked = this.checkData.pageData.some(item => this.checkData.ids[item.id]) && !this.checkData.allChecked
  }

  /**
   * 全选/反全选
   * @param value 全选状态
   */
  checkAll(value: boolean): void {
    this.checkData.pageData.forEach(item => (this.checkData.ids[item.id] = value))
    this.refreshStatus()
  }

  /**
   * 更改表格选中行
   * @param active 当前选中行id
   */
  changeActive(active) {
    this.tableData.active = active;
  }

  /**
   * 英文字符串首字母大写
   * @param str 英文字符串
   */
  getFirstLetterUpper(str): string {
    if (typeof str === 'string' && str[0]) {
      return str[0].toUpperCase() + str.substr(1)
    }
    return ''
  }

  /**
   * 初始化
   */
  ngOnInit() {
  }

}
