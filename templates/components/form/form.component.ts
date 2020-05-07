import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ContentChild,
  TemplateRef
} from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { FormItem, FormConfig } from './form.interface'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnChanges, AfterViewInit {
  // 表单ng-template模板
  @ContentChild(TemplateRef, { static: false }) inputCustomTpl: TemplateRef<any>

  constructor(
    private fb: FormBuilder,
    public sanitize: DomSanitizer
  ) {}

  // 表单配置数组
  formFields: FormItem[] = []
  // 表单
  form: FormGroup
  // 表单数据
  formData: any = {}
  // 表单禁用字段列表
  formDisables: any = {}

  // 表单布局 'horizontal' | 'vertical' | 'inline'
  @Input() layout = 'horizontal'

  // 表单公共配置
  @Input() config: FormConfig = {}

  // 表单提交事件
  @Output() refer = new EventEmitter<any>()

  // 表单配置
  @Input()
  set fields(fields: FormItem[]) {
    this.formFields = fields
    if (this.form) {
      this.formatFields()
    } else {
      this.form = this.createGroup()
    }
  }
  get fields(): FormItem[] {
    return this.formFields
  }

  // 表单数据
  @Input()
  set data(data: any[]) {
    this.formData = data
    this.setValue(data)
  }
  get data(): any[] {
    return this.formData
  }

  // 表单禁用字段列表
  @Input()
  set disableds(data: any) {
    this.formDisables = Object.assign(this.formDisables, data)
  }
  get disableds(): any {
    return this.formDisables
  }

  /**
   * 创建表单
   * @returns FormGroup 表单
   */
  createGroup(): FormGroup {
    const group = this.fb.group({})
    this.formDisables = {}
    this.formatFields((field: FormItem) => {
      group.addControl(field.name, this.fb.control({
        value: field.value,
      }, field.validators || (field.required ? [Validators.required] : [])))
    })
    return group
  }

  /**
   * 格式化表单数据
   * @param cb 回调函数
   */
  formatFields(cb?: (f: FormItem) => void) {
    const { labelSameWidth, adaptive, ...otherConfig } = this.config || {}
    const labelWidth = this.getLabelWidth(this.formFields)

    this.formFields.forEach((field: FormItem) => {
      // 文本输入类型
      const isInputType = ['text', 'password', 'number', 'textarea'].includes(field.type)
      // 只读类型
      const isReadType = ['button', 'reaonly', 'split'].includes(field.type)
      // 公共配置处理
      Object.keys(otherConfig).forEach(key => {
        if (!field.hasOwnProperty(key)) {
          field[key] = this.config[key]
        }
      })

      // 表单禁用缓存
      if (field.hasOwnProperty('disabled')) {
        this.formDisables[field.name] = field.disabled
      }
      // 非只读类型处理
      if (!isReadType) {
        // 表单复制
        if (cb) {
          cb(field)
        } else {
          if (field.hasOwnProperty('value')) {
            this.setValue(field.name, field.value)
          }
        }
        // 表单值变化事件
        if (!field.change) {
          field.change = () => {}
        }
        // 表单默认提示文字
        if (!field.placeholder) {
          field.placeholder = `${isInputType ? '请输入' : '请选择'}${field.label}`
        }
        // 表单默认验证提示
        if (!field.autoTips && !field.validators && field.required) {
          field.autoTips = {
            'zh-cn': {
              required: isInputType ? `${field.label}不能为空` : `请选择${field.label}`
            }
          }
        }
        if (field.autoTips && !field.autoTips['zh-cn']) {
          field.autoTips = {
            'zh-cn': {
              ...field.autoTips
            }
          }
        }
        // 表单默认样式名
        if (!field.class) {
          field.class = adaptive ? 'adaptive' : 'md'
        }
        // 表单标签同宽设置
        if (labelSameWidth && !field.labelWidth && labelWidth) {
          field.labelWidth = labelWidth
        }
        // 表单标签默认样式名
        if (!field.labelClass) {
          field.labelClass = ''
        }
        // 表单默认大小
        if (!field.size) {
          field.size = 'default'
        }

        this.fieldHandler(field)
      }
    })
  }

  /**
   * 表单项处理
   * @param field 字段配置
   */
  fieldHandler(field): void {
    switch (field.type) {
      // 数字框
      case 'number':
        if (!field.hasOwnProperty('min')) {
          field.min = -Infinity
        }
        if (!field.hasOwnProperty('max')) {
          field.max = Infinity
        }
        if (!field.parser) {
          field.parser = (value: string) => value.trim().replace(/。/g, '.').replace(/[^\w\.-]+/g, '')
        }
        if (!field.formatter) {
          field.formatter = (value: number | string) => value
        }
        ['focus', 'blur'].forEach(key => {
          if (!field[key]) {
            field[key] = () => {}
          }
        })
        break
      // 下拉框
      case 'select':
        if (!field.hasOwnProperty('maxMultipleCount')) {
          field.maxMultipleCount = Infinity
        }
        if (!field.compareWith) {
          field.compareWith = (o1: any, o2: any) => o1 === o2
        }
        ['openChange', 'onSearch', 'scrollToBottom', 'focus', 'blur'].forEach(key => {
          if (!field[key]) {
            field[key] = () => {}
          }
        })
        break
      // 多级选择框
      case 'cascader':
        ['visibleChange', 'selectionChange'].forEach(key => {
          if (!field[key]) {
            field[key] = () => {}
          }
        })
        break
      // 单选框
      case 'radio':
        field.map.forEach(item => {
          if (!item.change) {
            item.change = () => {}
          }
        })
        break
      // 日期选择框-日
      case 'date':
        ['onOpenChange', 'onOk'].forEach(key => {
          if (!field[key]) {
            field[key] = () => {}
          }
        })
        break
      // 日期选择框-月、年、周、范围
      case 'month':
      case 'year':
      case 'week':
      case 'range':
        if (!field.onOpenChange) {
          field.onOpenChange = () => {}
        }
        break
      // 日期选择框-时间
      case 'time':
        if (!field.openChange) {
          field.openChange = () => {}
        }
        break
      default:
        break
    }
  }

  /**
   * 获取字符串宽度
   * @param fontSize 字体大小
   * @param text 字符串
   */
  getTextWidth(fontSize, text) {
    const result = { width: 0, height: 0 }
    const span = document.createElement('span')
    span.innerHTML = text
    span.style.visibility = 'hidden'
    span.style.fontSize = fontSize + 'px'
    document.body.appendChild(span)
    result.width = span.offsetWidth
    result.height = span.offsetHeight
    span.parentNode.removeChild(span)
    return result.width
  }

  /**
   * 获取标签最大宽度
   * @param fields 字段配置数组
   */
  getLabelWidth(fields: FormItem[]) {
    if (fields instanceof Array) {
      return Math.max(...fields.map(f => this.getTextWidth(14, f.label || ''))) + 25
    }
    return 0
  }

  /**
   * 表单提交
   */
  submit(): void {
    Object.keys(this.form.controls).forEach(i => {
      this.formHandler(i, 'valid')
    })
    if (this.form.valid) {
      this.refer.emit(this.form.value)
    }
  }

  /**
   * 表单验证
   */
  valid(callback?: any): boolean | void {
    Object.keys(this.form.controls).forEach(i => {
      this.formHandler(i, 'valid')
    })

    if (typeof callback === 'function') {
      callback(this.form.valid)
    } else {
      return this.form.valid
    }
  }

  /**
   * 表单重置
   */
  reset(): void {
    this.formFields.forEach(field => {
      if (field.type !== 'button') {
        this.formHandler(field.name, 'reset', field.value)
      }
    })
  }

  /**
   * 设置表单数据
   * @param data 表单数据
   * @param value 表单字段数值
   */
  setValue(data: any, value?: any): void {
    if (typeof data === 'object') {
      if (Object.keys(data).length) {
        Object.keys(data).forEach(i => {
          this.formHandler(i, 'value', data[i])
        })
      } else {
        this.reset()
      }
    }
    if (typeof data === 'string') {
      this.formHandler(data, 'value', value)
    }
  }

  /**
   * 设置表单数据禁用状态
   * @param name 表单字段名称或字段名称数组
   * @param disabled 是否禁用
   */
  setDisabled(name: string[] | string, disabled: boolean): void {
    if (name instanceof Array) {
      name.forEach(i => {
        this.formHandler(i, disabled ? 'disable' : 'enable')
      })
    }
    if (typeof name === 'string') {
      this.formHandler(name, disabled ? 'disable' : 'enable')
    }
  }

  /**
   * 更新禁用状态
   */
  updateDisabled(): void {
    Object.keys(this.formDisables).forEach(key => {
      this.setDisabled(key, this.formDisables[key])
    })
  }

  /**
   * 表单操作
   * @param name 字段名称
   * @param type 操作类型
   * @param params 参数
   */
  formHandler(name: string, type: string, params?: any) {
    const control = this.form.controls[name]
    if (control) {
      switch (type) {
        // 启用表单
        case 'enable':
          control.enable({ onlySelf: true })
          break;
        // 禁用表单
        case 'disable':
          control.disable({ onlySelf: true })
          break;
        // 设置表单值
        case 'value':
          control.setValue(params)
          break;
        // 验证表单
        case 'valid':
          control.markAsDirty()
          control.updateValueAndValidity()
          break;
        // 重置表单数据
        case 'reset':
          control.reset(params)
          break;
        default:
          break;
      }
    }
  }

  /**
   * 根据值和map获取名称
   * @param value 值
   * @param map 列表
   */
  getLabelByValue(value, map) {
    if (map instanceof Array) {
      const findObj = map.find(x => x.value === value)
      if (findObj) {
        return findObj.label
      }
    }
    return ''
  }

  /**
   * 初始化
   */
  ngOnInit() {
  }

  /**
   * 数据变化
   */
  ngOnChanges(changes: SimpleChanges) {
    const { disableds } = changes
    if (disableds && !disableds.firstChange) {
      this.updateDisabled()
    }
  }

  /**
   * 元素获取
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.updateDisabled()
    })
  }
}
