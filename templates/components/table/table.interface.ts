import { TemplateRef, TrackByFunction } from '@angular/core'

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
 * 表格配置
 * @param data 数据数组
 * @param frontPagination 是否在前端对数据进行分页，如果在服务器分页数据或者需要在前端显示全部数据时传入 false
 * @param total 当前总数据，在服务器渲染时需要传入
 * @param pageIndex 当前页码，可双向绑定
 * @param pageSize 每页展示多少数据，可双向绑定
 * @param showPagination 是否显示分页器
 * @param paginationPosition 指定分页显示的位置
 * @param bordered 是否展示外边框和列边框
 * @param widthConfig 表头分组时指定每列宽度，与 th 的 [nzWidth] 不可混用
 * @param size 正常或迷你类型
 * @param loading 页面是否加载中
 * @param loadingIndicator 加载指示符
 * @param loadingDelay 延迟显示加载效果的时间（防止闪烁）
 * @param scroll 横向或纵向支持滚动，也可用于指定滚动区域的宽高度：{ x: "300px", y: "300px" }
 * @param title 表格标题
 * @param footer 表格尾部
 * @param noResult 无数据时显示内容
 * @param pageSizeOptions 页数选择器可选值
 * @param showQuickJumper 是否可以快速跳转至某页
 * @param showSizeChanger 是否可以改变 nzPageSize
 * @param showTotal 用于显示数据总量和当前数据范围，用法参照 Pagination 组件
 * @param itemRender 用于自定义页码的结构，用法参照 Pagination 组件
 * @param hideOnSinglePage 只有一页时是否隐藏分页器
 * @param simple 当添加该属性时，显示为简单分页
 * @param virtualItemSize 虚拟滚动时每一列的高度，与 cdk itemSize 相同
 * @param virtualMaxBufferPx 缓冲区最大像素高度，与 cdk maxBufferPx 相同
 * @param virtualMinBufferPx 缓冲区最小像素高度，低于该值时将加载新结构，与 cdk minBufferPx 相同
 * @param virtualForTrackBy 虚拟滚动数据 TrackByFunction 函数
 * @param columns 表格列配置
 * @param active 表格选中行id
 */
export interface Table {
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
  columns: TableColumn[]
  active?: string | number
}

/**
 * 表格列配置
 * @param thShowCheckbox 表头单元格是否添加checkbox，注：checkbox不可和排序、过滤相关参数同时使用！！！
 * @param thDisabled 表头单元格checkbox
 * @param thIndeterminate 表头单元格checkbox
 * @param thChecked 表头单元格checkbox
 * @param thCheckedChange 表头单元格选中的回调
 * @param showCheckbox 单元格是否添加checkbox，注：checkbox不可和排序、过滤相关参数同时使用！！！
 * @param disabled 单元格checkbox 是否禁用
 * @param indeterminate 单元格checkbox indeterminate 状态
 * @param checked 单元格checkbox 是否被选中，可双向绑定
 * @param checkedChange 单元格选中的回调
 * @param showRowSelection 是否显示下拉选择
 * @param selections 下拉选择的内容 text 及回调函数 onSelect
 * @param showSort 是否显示排序
 * @param sortFn 排序函数，前端排序使用一个函数(参考 Array.sort 的 compareFunction)，服务端排序时传入 true
 * @param sortDirections 支持的排序方式，取值为 'ascend', 'descend', null
 * @param sortOrder 当前排序状态，可双向绑定
 * @param sortOrderChange 排序状态改变回调
 * @param showFilter 是否显示过滤
 * @param filterFn 前端排序时，确定筛选的运行函数，服务端排序时，传入 true
 * @param filters 过滤器内容, 显示数据 text，回调函数传出 value，设置 byDefault 以默认应用过滤规则
 * @param filterMultiple 是否为多选过滤器
 * @param filterChange 过滤器内容选择的 value 数据回调
 * @param width 指定该列宽度，表头未分组时可用
 * @param left 左侧距离，用于固定左侧列，当为 true 时自动计算，为 false 时停止固定
 * @param right 右侧距离，用于固定右侧列，当为 true 时自动计算，为 false 时停止固定
 * @param align 设置列内容的对齐方式
 * @param breakWord 是否折行显示
 * @param ellipsis 超过宽度将自动省略，暂不支持和排序筛选一起使用。仅当表格布局将为 nzTableLayout="fixed"时可用
 * @param columnKey 当前列的key，用于服务端筛选和排序使用
 * @param showExpand 	是否显示展开按钮
 * @param expand 当前展开按钮状态，可双向绑定
 * @param expandChange 	当前展开按钮状态改变回调函数
 * @param indentSize 	展示树形数据时，每层缩进的宽度，以 px 为单位
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
export interface TableColumn {
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
