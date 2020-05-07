import { NzOptionComponent, NzCascaderOption, NzShowSearchOptions } from 'ng-zorro-antd'
import { TemplateRef, EventEmitter } from '@angular/core'
import { FormControl, NgModel } from '@angular/forms'
import { DatePipe } from '@angular/common'

/**
 * 表单映射配置
 * @param label 名称
 * @param value 字段key
 * @param disabled 是否禁用
 */
interface FormMap {
  label: string
  value: string | number
  disabled?: boolean
}

/**
 * 表单公共配置
 * @param validateStatus 会根据传入的 FormControl 或 NgModel 自动生成校验状态，也可以直接指定状态，不传入时默认值为 nz-form-control 中包裹的第一个 FormControl 或 NgModel
 * @param hasFeedback 配合 nzValidateStatus 属性使用，展示校验状态图标
 * @param extra 用于显示表单额外提示信息
 * @param successTip 校验状态 success 时提示信息
 * @param warningTip 校验状态 warning 时提示信息
 * @param errorTip 校验状态 error 时提示信息
 * @param validatingTip 正在校验时提示信息
 * @param noColon 是否不显示 label 后面的冒号
 * @param autoTips 配置提示的对象, 具体用法请参考示例：自动提示
 * @param disableAutoTips 禁用自动提示
 * @param size 表单大小，large 高度为 40px，small 为 24px，默认是 32px，(时间选择框不支持此属性)
 * @param change 表单值变化事件
 * @param type 表单类型
 * @param label 表单名称
 * @param name 表单字段key
 * @param value 表单字段值
 * @param suffix 表单字段后缀，可添加单位提示灯
 * @param required 是否必填
 * @param placeholder 占位符
 * @param disabled 表单是否禁用
 * @param labelWidth 表单标签宽度
 * @param labelClass 表单标签样式名称
 * @param class 表单样式名称
 * @param autoFocus 自动获取焦点，按钮、开关、分隔符、只读不支持此属性
 * @param validators 验证规则
 * @param render 标签渲染方法
 */
interface FormBasic {
  validateStatus?: 'success' | 'warning' | 'error' | 'validating' | FormControl | NgModel
  hasFeedback?: boolean
  extra?: string | TemplateRef<void>
  successTip?: string | TemplateRef<{ $implicit: FormControl | NgModel }>
  warningTip?: string | TemplateRef<{ $implicit: FormControl | NgModel }>
  errorTip?: string | TemplateRef<{ $implicit: FormControl | NgModel }>
  validatingTip?: string | TemplateRef<{ $implicit: FormControl | NgModel }>
  noColon?: boolean,
  autoTips?: Record<string, Record<string, string>> | any,
  disableAutoTips?: boolean,
  size?: 'large' | 'small' | 'default'
  change?: (data: any) => void,
  type?: string
  label?: string
  name?: string
  value?: any
  suffix?: string
  required?: boolean
  placeholder?: string
  disabled?: boolean
  labelWidth?: number
  labelClass?: string
  class?: string
  autoFocus?: boolean
  validators?: any
  render?: (data: FormItem) => string
}

/**
 * 公共表单配置
 * @param labelSameWidth 标签是否同宽
 * @param adaptive 标签是否同宽时表单是否自适应宽度
 */
export interface FormConfig extends FormBasic {
  labelSameWidth?: boolean
  adaptive?: boolean
}

/**
 * 文本框表单配置
 * @param readonly 表单是否只读
 */
export interface FormText extends FormBasic {
  readonly?: boolean
}

/**
 * 密码框表单配置
 * @param showIcon 表单是否显示可见图标
 * @param visible 表单是否可见
 */
export interface FormPassword extends FormText {
  showIcon?: boolean
  visible?: boolean
}

/**
 * 数字框表单配置
 * @param max 最大值
 * @param min 最小值
 * @param formatter 指定输入框展示值的格式
 * @param parser 指定从 nzFormatter 里转换回数字的方式，和 nzFormatter 搭配使用
 * @param precision 数值精度
 * @param precisionMode 数值精度的取值方式
 * @param step 每次改变步数，可以为小数
 * @param focus focus时回调
 * @param blur blur时回调
 */
export interface FormNumber extends FormBasic {
  max?: number
  min?: number
  formatter?: (value: number | string) => string | number
  parser?: (value: string) => string | number
  precision?: number
  precisionMode?: 'cut' | 'toFixed' | ((value: number | string, precision?: number) => number)
  step?: number | string
  focus?: EventEmitter<void>
  blur?: EventEmitter<void>
}

/**
 * 多行输入文本框表单配置
 * @param row 行高
 * @param col 列高
 * @param autoSize 自适应内容高度，可设置为 boolean 或对象：{ minRows: 2, maxRows: 6 }
 */
export interface FormTextarea extends FormText {
  row?: number | string
  col?: number | string
  autoSize?: boolean | { minRows: number, maxRows: number }
}

/**
 * 下拉框下拉项配置
 * @param hide 是否在选项列表中隐藏改选项
 * @param customContent 是否自定义在下拉菜单中的Template内容，当为 true 时，nz-option 包裹的内容将直接渲染在下拉菜单中
 */
export interface FormOptionMap extends FormMap {
  hide?: boolean
  customContent?: boolean
}
/**
 * 下拉框分组下拉项配置
 * @param group 组名称
 * @param map 下拉项配置数组
 */
export interface FormGroupOptionMap {
  group: string,
  map: FormOptionMap[]
}
/**
 * 下拉框表单配置
 * @param compareWith 与 SelectControlValueAccessor 相同
 * @param autoClearSearchValue 是否在选中项后清空搜索框，只在 mode 为 multiple 或 tags 时有效。
 * @param allowClear 支持清除
 * @param open 下拉菜单是否打开，可双向绑定
 * @param dropdownClassName 下拉菜单的 className 属性
 * @param dropdownMatchSelectWidth 下拉菜单和选择器同宽
 * @param dropdownStyle 下拉菜单的 style 属性
 * @param customTemplate 自定义选择框的Template内容
 * @param serverSearch 是否使用服务端搜索，当为 true 时，将不再在前端对 nz-option 进行过滤
 * @param filterOption 是否根据输入项进行筛选。当其为一个函数时，会接收 inputValueoption 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。
 * @param maxMultipleCount 最多选中多少个标签
 * @param mode 设置 nz-select 的模式
 * @param notFoundContent 当下拉列表为空时显示的内容
 * @param showArrow 是否显示下拉小箭头
 * @param showSearch 使单选模式可搜索
 * @param suffixIcon 自定义的选择框后缀图标
 * @param removeIcon 自定义的多选框清除图标
 * @param clearIcon 自定义的多选框清空图标
 * @param menuItemSelectedIcon 自定义当前选中的条目图标
 * @param tokenSeparators 在 tags 和 multiple 模式下自动分词的分隔符
 * @param loading 加载中状态
 * @param maxTagCount 最多显示多少个 tag
 * @param maxTagPlaceholder 隐藏 tag 时显示的内容
 * @param options option 列表，可以取代 nz-option，用法参见例子
 * @param optionHeightPx 下拉菜单中每个 Option 的高度
 * @param optionOverflowSize 下拉菜单中最多展示的 Option 个数，超出部分滚动
 * @param openChange 下拉菜单打开状态变化回调
 * @param scrollToBottom 下拉列表滚动到底部的回调
 * @param onSearch 文本框值变化时回调
 * @param focus focus时回调
 * @param blur blur时回调
 * @param map 下拉框映射配置
 */
export interface FormSelect extends FormBasic {
  compareWith?: (o1: any, o2: any) => boolean
  autoClearSearchValue?: boolean
  allowClear?: boolean
  open?: boolean
  dropdownClassName?: string
  dropdownMatchSelectWidth?: boolean
  dropdownStyle?: object
  customTemplate?: TemplateRef<{ $implicit: NzOptionComponent }>
  serverSearch?: boolean
  filterOption?: (input?: string, option?: NzOptionComponent) => boolean;
  maxMultipleCount?: number
  mode?: 'multiple' | 'tags' | 'default'
  notFoundContent?: string | TemplateRef<void>
  showArrow?: boolean
  showSearch?: boolean
  suffixIcon?: TemplateRef<any> | string
  removeIcon?: TemplateRef<any>
  clearIcon?: TemplateRef<any>
  menuItemSelectedIcon?: TemplateRef<any>
  tokenSeparators?: string[]
  loading?: boolean
  maxTagCount?: number
  maxTagPlaceholder?: TemplateRef<{ $implicit: any[] }>
  options?: Array<{
    label: string | TemplateRef<any>
    value: any
    disabled?: boolean
    hide?: boolean
    groupLabel?: string | TemplateRef<any>
  }>
  optionHeightPx?: number
  optionOverflowSize?: number
  openChange?: EventEmitter<boolean>
  scrollToBottom?: EventEmitter<any>
  onSearch?: EventEmitter<string>
  focus?: EventEmitter<any>
  blur?: EventEmitter<any>
  map?: FormOptionMap[] | FormGroupOptionMap[]
}

/**
 * 多级选择框配置
 * @param allowClear 是否支持清除
 * @param changeOn 点击父级菜单选项时，可通过该函数判断是否允许值的变化
 * @param changeOnSelect 当此项为 true 时，点选每级菜单选项值都会发生变化，具体见上面的演示
 * @param columnClassName 自定义浮层列类名
 * @param expandTrigger 次级菜单的展开方式，可选 'click' 和 'hover'
 * @param menuClassName 自定义浮层类名
 * @param menuStyle 自定义浮层样式
 * @param notFoundContent 当下拉列表为空时显示的内容
 * @param labelProperty 选项的显示值的属性名
 * @param labelRender 选择后展示的渲染模板
 * @param optionRender 选项的渲染模板
 * @param loadData 用于动态加载选项。如果提供了ngModel初始值，且未提供nzOptions值，则会立即触发动态加载。
 * @param options 可选项数据源
 * @param showArrow 是否显示箭头
 * @param showInput 显示输入框
 * @param showSearch 是否支持搜索，默认情况下对 label 进行全匹配搜索，不能和 [nzLoadData] 同时使用
 * @param valueProperty 选项的实际值的属性名
 * @param visibleChange 菜单浮层的显示/隐藏
 * @param selectionChange 值发生变化时触发
 */
export interface FormCascader extends FormBasic {
  allowClear?: boolean
  changeOn?: (option: any, index: number) => boolean
  changeOnSelect?: boolean
  columnClassName?: string
  expandTrigger?: 'click'|'hover'
  menuClassName?: string
  menuStyle?: object
  notFoundContent?: string|TemplateRef<void>
  labelProperty?: string
  labelRender?: TemplateRef<any>
  optionRender?: TemplateRef<{ $implicit: NzCascaderOption, index: number }>
  loadData?: (option: any, index?: any) => PromiseLike<any>
  options: object[]
  showArrow?: boolean
  showInput?: boolean
  showSearch?: boolean | NzShowSearchOptions
  valueProperty?: string
  visibleChange?: EventEmitter<boolean>
  selectionChange?: EventEmitter<NzCascaderOption[]>
}

/**
 * 单选框选项配置
 * @param type 单选框类型
 * @param change 选中变化时回调
 */
export interface FormRadioMap extends FormMap {
  type?: 'radio' | 'button'
  change?: (data: boolean) => void
}
/**
 * 单选框表单配置
 * @param buttonStyle RadioButton 的风格样式，目前有描边和填色两种风格
 * @param map 单选框映射配置
 */
export interface FormRadio extends FormBasic {
  buttonStyle: 'outline' | 'solid'
  map: FormRadioMap[]
}

/**
 * 多选框表单配置
 */
export type FormCheckbox = FormBasic

/**
 * 日期表单公共配置
 * @param allowClear 是否显示清除按钮
 * @param disabledDate 不可选择的日期
 * @param locale 国际化配置
 * @param popupStyle 额外的弹出日历样式
 * @param dropdownClassName 额外的弹出日历 className
 * @param defaultPickerValue 默认面板日期
 * @param suffixIcon 自定义的后缀图标
 * @param onOpenChange 弹出日历和关闭日历的回调
 * @param format 展示的日期格式
 * @param renderExtraFooter 在面板中添加额外的页脚
 */
interface FormPicker extends FormBasic {
  allowClear?: boolean
  disabledDate?: (current: Date) => boolean
  locale?: object
  popupStyle?: object
  dropdownClassName?: string
  defaultPickerValue?: Date | Date[]
  suffixIcon?: string | TemplateRef<any>
  onOpenChange?: EventEmitter<boolean>
  format?: string
  renderExtraFooter?: TemplateRef<any> | string | (() => TemplateRef<any> | string)
}
/**
 * 日期选择框-日配置
 * @param dateRender 自定义日期单元格的内容（month-picker/year-picker不支持）
 * @param showTime 增加时间选择功能
 * @param showToday 是否展示“今天”按钮
 * @param onOk 点击确定按钮的回调
 * @param disabledTime 不可选择的时间
 */
export interface FormDatePicker extends FormPicker {
  dateRender?: TemplateRef<Date> | string | ((d: Date) => TemplateRef<Date> | string)
  showTime?: object | boolean
  showToday?: boolean
  onOk?: EventEmitter<Date[]>
  disabledTime?: (current: Date) => { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds }
}
/**
 * 日期选择框-月配置
 */
export type FormMonthPicker = FormPicker
/**
 * 日期选择框-年配置
 */
export type FormYearPicker = FormPicker
/**
 * 日期选择框-周配置
 */
export type FormWeekPicker = FormPicker
/**
 * 日期选择框-范围配置
 * @param dateRender 自定义日期单元格的内容（month-picker/year-picker不支持）
 * @param showTime 增加时间选择功能
 * @param disabledTime 不可选择的时间
 * @param ranges 	预设时间范围快捷选择
 * @param separator 分隔符
 */
export interface FormRangePicker extends FormPicker {
  dateRender?: TemplateRef<Date> | string | ((d: Date) => TemplateRef<Date> | string)
  showTime?: object | boolean
  disabledTime?: (current: Date) => { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds }
  ranges?: { [ key: string ]: Date[] } | { [ key: string ]: () => Date[] }
  separator?:	string
}
/**
 * 日期选择框-时间配置
 * @param allowEmpty 是否展示清除按钮
 * @param clearText 清除按钮的提示文案
 * @param defaultOpenValue 当 [ngModel] 不存在时，可以设置面板打开时默认选中的值
 * @param disabledHours 禁止选择部分小时选项
 * @param disabledMinutes 禁止选择部分分钟选项
 * @param disabledSeconds 禁止选择部分秒选项
 * @param format 展示的时间格式
 * @param hideDisabledOptions 隐藏禁止选择的选项
 * @param hourStep 小时选项间隔
 * @param minuteStep 分钟选项间隔
 * @param secondStep 秒选项间隔
 * @param open 面板是否打开，可双向绑定
 * @param placeHolder 没有值的时候显示的内容
 * @param popupClassName 弹出层类名
 * @param use12Hours 使用12小时制，为true时format默认为h:mm:ss a
 * @param suffixIcon 自定义的后缀图标
 * @param openChange 面板打开/关闭时的回调
 */
export interface FormTimePicker extends FormBasic {
  allowEmpty?: boolean
  clearText?: string
  defaultOpenValue?: Date
  disabledHours?: () => number[]
  disabledMinutes?: (hour: number) => number[]
  disabledSeconds?: (hour: number, minute: number) => number[]
  format?: DatePipe
  hideDisabledOptions?: boolean
  hourStep?: number
  minuteStep?: number
  secondStep?: number
  open?: boolean
  placeHolder?: string
  popupClassName?: string
  use12Hours?: boolean
  suffixIcon?: string | TemplateRef<any>
  openChange?: EventEmitter<boolean>
}

/**
 * 开关表单配置
 * @param checkedChildren 选中时的内容
 * @param unCheckedChildren 非选中时的内容
 * @param loading 加载中的开关
 * @param control 是否完全由用户控制状态
 */
export interface FormSwitch extends FormBasic {
  checkedChildren?: string | TemplateRef<void>
  unCheckedChildren?: string | TemplateRef<void>
  loading?: boolean
  control?: boolean
}

/**
 * 表单配置
 * @param submit 是否是提交按钮
 * @param ghost 幽灵属性，使按钮背景透明
 * @param loading 设置按钮载入状态
 * @param shape 设置按钮形状，可选值为 circleround 或者不设
 * @param btnType 设置按钮类型，可选值为 primary、dashed、link 或者不设
 * @param block 将按钮宽度调整为其父宽度的选项
 * @param danger 设置危险按钮
 */
export interface FormButton extends FormBasic {
  submit: boolean
  ghost?: boolean
  loading?: boolean
  shape?: 'circle' | 'round'
  btnType?: 'primary' | 'dashed' | 'link'
  block?: boolean
  danger?: boolean
}

/**
 * 分隔符配置
 */
export type FormSplit = FormBasic

/**
 * 只读配置
 */
export type FormReadonly = FormBasic

/**
 * 自定义配置
 */
export type FormCustom = FormBasic

/**
 * 表单配置
 */
export type FormItem = FormText
 | FormPassword
 | FormNumber
 | FormTextarea
 | FormSelect
 | FormCascader
 | FormRadio
 | FormCheckbox
 | FormDatePicker
 | FormMonthPicker
 | FormYearPicker
 | FormWeekPicker
 | FormRangePicker
 | FormTimePicker
 | FormSwitch
 | FormButton
 | FormSplit
 | FormReadonly
 | FormCustom

/* Example:
<app-form layout="vertical" [config]="fieldConfig" [fields]="fields" [data]="fieldData" [disableds]="fieldDisableds">
  <ng-template let-field let-f="form">
    <ng-container [ngSwitch]="field.name">
      <span *ngSwitchCase="'cm'">888{{f.valid}}</span>
    </ng-container>
  </ng-template>
</app-form>

fieldData = {}
fieldDisableds = {}
fieldConfig = {
  labelSameWidth: true
}
fields: FormItem[] = [
    {
      type: 'text',
      name: 'tt',
      label: '文本框',
      disabled: true,
      value: 444,
      validators: [Validators.required, Validators.email()],
      autoTips: {
        required: '请输入邮箱地址',
        pattern: '邮箱格式不正确',
      },
      suffix: '元'
    },
    {
      type: 'password',
      showIcon: true,
      name: 'pd',
      label: '密码',
      value: '333'
    },
    {
      type: 'number',
      name: 'nr',
      min: 0,
      max: 100,
      label: '数字框',
      value: 6,
      formatter: (v) => v + '%'
    },
    {
      type: 'textarea',
      name: 'ta',
      label: '多行文本框'
    },
    {
      type: 'select',
      name: 'st',
      label: '下拉框',
      value: 1,
      map: [
        { label: 'aa', value: 1 },
        { label: 'bb', value: 2 },
        { label: 'cc', value: 3 },
      ]
    },
    {
      type: 'cascader',
      name: 'cr',
      label: '多级选择框',
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                  isLeaf: true
                }
              ]
            },
            {
              value: 'ningbo',
              label: 'Ningbo',
              isLeaf: true
            }
          ]
        }
      ]
    },
    {
      type: 'radio',
      name: 'ro',
      label: '单选框',
      value: 1,
      map: [
        { label: 'aa', value: 1 },
        { label: 'bb', value: 2 },
        { label: 'cc', value: 3 },
      ]
    },
    {
      type: 'checkbox',
      name: 'cx',
      label: '多选框',
      value: [
        { label: 'Apple', value: 'Apple', checked: true },
        { label: 'Pear', value: 'Pear', checked: false },
        { label: 'Orange', value: 'Orange', checked: false }
      ]
    },
    {
      type: 'date',
      name: 'de',
      label: '日期选择框-日'
    },
    {
      type: 'month',
      name: 'mh',
      label: '日期选择框-月'
    },
    {
      type: 'year',
      name: 'yr',
      label: '日期选择框-年'
    },
    {
      type: 'week',
      name: 'wk',
      label: '日期选择框-周'
    },
    {
      type: 'range',
      name: 're',
      label: '日期选择框-范围'
    },
    {
      type: 'time',
      name: 'te',
      label: '日期选择框-时间'
    },
    {
      type: 'switch',
      name: 'sh',
      label: '开关'
    },
    {
      type: 'split',
      name: 'st2',
      label: '分隔符'
    },
    {
      type: 'readonly',
      name: 'ry',
      label: '只读',
      value: 666
    },
    {
      type: 'custom',
      name: 'cm',
      label: '自定义'
    },
  ]
*/
