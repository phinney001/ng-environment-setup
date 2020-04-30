import { Component, OnInit, Input, ContentChild, TemplateRef, ViewChild, Output, EventEmitter, TrackByFunction } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { NzTableComponent, NzTableQueryParams } from 'ng-zorro-antd'

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
  x?: string | number
  y?: string | number
}

/**
 * nzTable表格配置
 * @param nzData 数据数组
 * @param nzFrontPagination 是否在前端对数据进行分页，如果在服务器分页数据或者需要在前端显示全部数据时传入 false
 * @param nzTotal 当前总数据，在服务器渲染时需要传入
 * @param nzPageIndex 当前页码，可双向绑定
 * @param nzPageSize 每页展示多少数据，可双向绑定
 * @param nzShowPagination 是否显示分页器
 * @param nzPaginationPosition 指定分页显示的位置
 * @param nzBordered 是否展示外边框和列边框
 * @param nzWidthConfig 表头分组时指定每列宽度，与 th 的 [nzWidth] 不可混用
 * @param nzSize 正常或迷你类型
 * @param nzLoading 页面是否加载中
 * @param nzLoadingIndicator 加载指示符
 * @param nzLoadingDelay 延迟显示加载效果的时间（防止闪烁）
 * @param nzScroll 横向或纵向支持滚动，也可用于指定滚动区域的宽高度：{ x: "300px", y: "300px" }
 * @param nzTitle 表格标题
 * @param nzFooter 表格尾部
 * @param nzNoResult 无数据时显示内容
 * @param nzPageSizeOptions 页数选择器可选值
 * @param nzShowQuickJumper 是否可以快速跳转至某页
 * @param nzShowSizeChanger 是否可以改变 nzPageSize
 * @param nzShowTotal 用于显示数据总量和当前数据范围，用法参照 Pagination 组件
 * @param nzItemRender 用于自定义页码的结构，用法参照 Pagination 组件
 * @param nzHideOnSinglePage 只有一页时是否隐藏分页器
 * @param nzSimple 当添加该属性时，显示为简单分页
 * @param nzVirtualItemSize 虚拟滚动时每一列的高度，与 cdk itemSize 相同
 * @param nzVirtualMaxBufferPx 缓冲区最大像素高度，与 cdk maxBufferPx 相同
 * @param nzVirtualMinBufferPx 缓冲区最小像素高度，低于该值时将加载新结构，与 cdk minBufferPx 相同
 * @param nzVirtualForTrackBy 虚拟滚动数据 TrackByFunction 函数
 * @param nzPageIndexChange 当前页码改变时的回调函数
 * @param nzPageSizeChange 页数改变时的回调函数
 * @param nzCurrentPageDataChange 当前页面展示数据改变的回调函数
 * @param nzQueryParams 当服务端分页、筛选、排序时，用于获得参数，具体见示例
 */
interface NzTable {
  nzData?: any[]
  nzFrontPagination?: boolean
  nzTotal?: number
  nzPageIndex?: number
  nzPageSize?: number
  nzShowPagination?: boolean
  nzPaginationPosition?: 'top' | 'bottom' | 'both'
  nzBordered?: boolean
  nzWidthConfig?: string[]
  nzSize?: 'middle' | 'small' | 'default'
  nzLoading?: boolean
  nzLoadingIndicator?: TemplateRef<void>
  nzLoadingDelay?: number
  nzScroll?: Scroll
  nzTitle?: string | TemplateRef<void>
  nzFooter?: string | TemplateRef<void>
  nzNoResult?: string | TemplateRef<void>
  nzPageSizeOptions?: number[]
  nzShowQuickJumper?: boolean
  nzShowSizeChanger?: boolean
  nzShowTotal?: TemplateRef<{ $implicit: number, range: [ number, number ] }>
  nzItemRender?: TemplateRef<{ $implicit: 'page' | 'prev' | 'next', page: number }>
  nzHideOnSinglePage?: boolean
  nzSimple?: boolean
  nzVirtualItemSize?: number
  nzVirtualMaxBufferPx?: number
  nzVirtualMinBufferPx?: number
  nzVirtualForTrackBy?: TrackByFunction<any>
  nzPageIndexChange?: (data: number) => void
  nzPageSizeChange?: (data: number) => void
  nzCurrentPageDataChange?: (data: any[]) => void
  nzQueryParams?: (data: any) => void
}

/**
 * nzTable表格列配置
 * @param nzThShowCheckbox 表头单元格是否添加checkbox，注：checkbox不可和排序、过滤相关参数同时使用！！！
 * @param nzThDisabled 表头单元格checkbox
 * @param nzThIndeterminate 表头单元格checkbox
 * @param nzThChecked 表头单元格checkbox
 * @param nzThCheckedChange 表头单元格选中的回调
 * @param nzShowCheckbox 单元格是否添加checkbox，注：checkbox不可和排序、过滤相关参数同时使用！！！
 * @param nzDisabled 单元格checkbox 是否禁用
 * @param nzIndeterminate 单元格checkbox indeterminate 状态
 * @param nzChecked 单元格checkbox 是否被选中，可双向绑定
 * @param nzCheckedChange 单元格选中的回调
 * @param nzShowRowSelection 是否显示下拉选择
 * @param nzSelections 下拉选择的内容 text 及回调函数 onSelect
 * @param nzShowSort 是否显示排序
 * @param nzSortFn 排序函数，前端排序使用一个函数(参考 Array.sort 的 compareFunction)，服务端排序时传入 true
 * @param nzSortDirections 支持的排序方式，取值为 'ascend', 'descend', null
 * @param nzSortOrder 当前排序状态，可双向绑定
 * @param nzSortOrderChange 排序状态改变回调
 * @param nzShowFilter 是否显示过滤
 * @param nzFilterFn 前端排序时，确定筛选的运行函数，服务端排序时，传入 true
 * @param nzFilters 过滤器内容, 显示数据 text，回调函数传出 value，设置 byDefault 以默认应用过滤规则
 * @param nzFilterMultiple 是否为多选过滤器
 * @param nzFilterChange 过滤器内容选择的 value 数据回调
 * @param nzWidth 指定该列宽度，表头未分组时可用
 * @param nzLeft 左侧距离，用于固定左侧列，当为 true 时自动计算，为 false 时停止固定
 * @param nzRight 右侧距离，用于固定右侧列，当为 true 时自动计算，为 false 时停止固定
 * @param nzAlign 设置列内容的对齐方式
 * @param nzBreakWord 是否折行显示
 * @param nzEllipsis 超过宽度将自动省略，暂不支持和排序筛选一起使用。仅当表格布局将为 nzTableLayout="fixed"时可用
 * @param nzColumnKey 当前列的key，用于服务端筛选和排序使用
 * @param nzShowExpand 	是否显示展开按钮
 * @param nzExpand 当前展开按钮状态，可双向绑定
 * @param nzExpandChange 	当前展开按钮状态改变回调函数
 * @param nzIndentSize 	展示树形数据时，每层缩进的宽度，以 px 为单位
 */
interface NzTableColumn {
  nzThShowCheckbox?: boolean
  nzThDisabled?: boolean
  nzThIndeterminate?: boolean
  nzThChecked?: boolean
  nzThCheckedChange?: (data: boolean) => void
  nzShowCheckbox?: boolean
  nzDisabled?: boolean
  nzIndeterminate?: boolean
  nzChecked?: boolean
  nzCheckedChange?: (data: boolean) => void
  nzShowRowSelection?: boolean
  nzSelections?: Array<{ text: string, onSelect: any }>
  nzShowSort?: boolean
  nzSortFn?: ((a: any, b: any, sortOrder?: string) => number)
  nzSortDirections?: Array<'ascend' | 'descend' | null>
  nzSortOrder?: 'descend' | 'ascend' | null
  nzSortOrderChange?: (data: 'descend' | 'ascend' | null) => void
  nzShowFilter?: boolean
  nzFilterFn?: ((value: any, data: any) => boolean)
  nzFilters?: Array<{ text: string; value: any; byDefault?: boolean }>
  nzFilterMultiple?: boolean
  nzFilterChange?: (data: any[] | any) => void
  nzWidth?: string
  nzLeft?: string | boolean
  nzRight?: string | boolean
  nzAlign?: 'left' | 'right' | 'center'
  nzBreakWord?: boolean
  nzEllipsis?: boolean
  nzColumnKey?: string
  nzShowExpand?: boolean
  nzExpand?: boolean
  nzExpandChange?: boolean
  nzIndentSize?: number
}

/**
 * 表格配置
 * @param data -> queryParams 同NzTable
 * @param columns 表格列配置
 * @param active 表格选中行id
 */
export interface Table extends NzTable {
  data?: any[]
  frontPagination?: boolean
  total?: number
  pageIndex?: number
  pageSize?: number
  showPagination?: boolean
  paginationPosition?: 'top' | 'bottom' | 'both'
  bordered?: boolean
  widthConfig?: string[]
  size?: 'middle' | 'small' | 'default'
  loading?: boolean
  loadingIndicator?: TemplateRef<void>
  loadingDelay?: number
  scroll?: Scroll
  title?: string | TemplateRef<void>
  footer?: string | TemplateRef<void>
  noResult?: string | TemplateRef<void>
  pageSizeOptions?: number[]
  showQuickJumper?: boolean
  showSizeChanger?: boolean
  showTotal?: TemplateRef<{ $implicit: number, range: [ number, number ] }>
  itemRender?: TemplateRef<{ $implicit: 'page' | 'prev' | 'next', page: number }>
  hideOnSinglePage?: boolean
  simple?: boolean
  virtualItemSize?: number
  virtualMaxBufferPx?: number
  virtualMinBufferPx?: number
  virtualForTrackBy?: TrackByFunction<any>
  pageIndexChange?: () => void
  pageSizeChange?: () => void
  currentPageDataChange?: () => void
  queryParams?: () => void
  columns: TableColumn[]
  active?: string | number
}

/**
 * 表格列配置
 * @param nzThShowCheckbox -> indentSize 同NzTableColumn
 * @param class 样式名称
 * @param label 字段名称
 * @param value 字段key
 * @param check 是否使用多选框
 * @param map 数据映射
 * @param template 是否使用ng-template模板
 * @param render 渲染方法
 * @param thClass 表头单元格样式名称
 * @param thTemplate 表头单元格是否使用ng-template模板
 * @param thRender 表头单元格渲染方法
 * @param children 子级列配置
 */
export interface TableColumn extends NzTableColumn {
  thShowCheckbox?: boolean
  thDisabled?: boolean
  thIndeterminate?: boolean
  thChecked?: boolean
  thCheckedChange?: (data: boolean) => void
  showCheckbox?: boolean
  disabled?: boolean
  indeterminate?: boolean
  checked?: boolean
  checkedChange?: (data: boolean) => void
  showRowSelection?: boolean
  selections?: Array<{ text: string, onSelect: any }>
  showSort?: boolean
  sortFn?: ((a: any, b: any, sortOrder?: string) => number)
  sortDirections?: Array<'ascend' | 'descend' | null>
  sortOrder?: 'descend' | 'ascend' | null
  sortOrderChange?: (data: 'descend' | 'ascend' | null) => void
  showFilter?: boolean
  filterFn?: ((value: any, data: any) => boolean)
  filters?: Array<{ text: string; value: any; byDefault?: boolean }>
  filterMultiple?: boolean
  filterChange?: (data: any[] | any) => void
  width?: string
  left?: string | boolean
  right?: string | boolean
  align?: 'left' | 'right' | 'center'
  breakWord?: boolean
  ellipsis?: boolean
  columnKey?: string
  showExpand?: boolean
  expand?: boolean
  expandChange?: boolean
  indentSize?: number
  class?: string,
  label: string
  value?: string | number
  check?: boolean
  map?: Map[]
  template?: boolean
  render?: (data: any) => string
  thClass?: string
  thTemplate?: boolean
  thRender?: (data: any) => string
  children?: TableColumn[]
}

/**
 * 表格分页器配置
 * @param total 数据总条数
 * @param size 每页显示条数
 * @param index 当前页码
 */
export interface Pagination {
  total: number
  size: number
  index: number
}

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
  @Output() nzPageIndexChange = new EventEmitter<number>()
  @Output() pageIndexChange = new EventEmitter<number>()
  // 页数改变时的回调函数
  @Output() nzPageSizeChange = new EventEmitter<number>()
  @Output() pageSizeChange = new EventEmitter<number>()
  // 当前页面展示数据改变的回调函数
  @Output() nzCurrentPageDataChange = new EventEmitter<any[]>()
  @Output() currentPageDataChange = new EventEmitter<any[]>()
  // 当服务端分页、筛选、排序时，用于获得参数，具体见示例
  @Output() nzQueryParams = new EventEmitter<NzTableQueryParams>()
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
  // 表格自定义参数
  tableExtraParams: string[] = ['columns', 'active']
  // 表格列自定义参数
  tableColumnExtraParams: string[] = ['class', 'label', 'value', 'check', 'map', 'template', 'render', 'thTemplate', 'thRender']
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
        if (!this.tableExtraParams.includes(key) && !key.startsWith('nz')) {
          data[`nz${this.getFirstLetterUpper(key)}`] = data[key]
        }
        if (['total', 'nzTotal'].includes(key)) {
          data.nzFrontPagination = false
        }
        if ((['pagination', 'nzShowPagination'].includes(key) && !data[key]) || !this.pagination) {
          data.nzShowPagination = false
          data.nzPageSize = Infinity
        }
      })
      data.columns = this.handleColumn(data.columns)
      const tableColumns: TableColumn[] = this.setColumnListSpan(data.columns)
      console.log(tableColumns)
      this.realColumns = this.getRealColumnList(tableColumns)
      this.tableColumns = this.formatColumnList(tableColumns)
    }
    console.log(data)
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
          Object.keys(item).forEach((key: string) => {
            if (!this.tableColumnExtraParams.includes(key) && !key.startsWith('nz')) {
              item[`nz${this.getFirstLetterUpper(key)}`] = item[key]
            }
          })
          const funcList = ['nzThCheckedChange', 'nzSortOrderChange', 'nzFilterChange', 'nzCheckedChange', 'nzExpandChange']
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
    this.nzPageIndexChange.emit(index)
    this.pageIndexChange.emit(index)
    this.sizeOrIndexChange()
  }

  /**
   * 页数改变时的回调函数
   * @param size 页数
   */
  sizeChange(size: number) {
    this.nzPageSizeChange.emit(size)
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
    this.nzCurrentPageDataChange.emit(data)
    this.currentPageDataChange.emit(data)
    this.checkData.pageData = data
    this.refreshStatus()
  }

  /**
   * 当服务端分页、筛选、排序时，用于获得参数，具体见示例
   * @param data 分页、筛选、排序参数
   */
  params(data: NzTableQueryParams) {
    this.nzQueryParams.emit(data)
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
