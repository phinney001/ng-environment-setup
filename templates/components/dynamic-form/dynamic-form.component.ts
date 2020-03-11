import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

/**
 * 表单映射配置
 * @param label 名称
 * @param value 字段key
 * @param disabled 是否禁用
 * @param checked 多选框是否选中
 */
export interface Map {
  label: string
  value: string | number
  disabled?: boolean
  checked?: boolean
}

/**
 * 表单配置
 * @param type 表单类型
 * @param label 表单名称
 * @param name 表单字段key
 * @param value 表单字段值
 * @param required 是否必填
 * @param placeholder 占位符
 * @param map 表单映射配置
 * @param readonly 表单是否只读
 * @param disabled 表单是否禁用
 * @param class 表单样式名称
 * @param allowClear 日期、选择框表单是否允许清除
 * @param row textarea行高
 * @param color 按钮颜色
 * @param ghost 按钮是否是ghost类型
 */
export interface FormItem {
  type: string
  label: string
  name?: string | Map[]
  value?: any
  required?: boolean
  placeholder?: string
  map?: Map[]
  readonly?: boolean
  disabled?: boolean
  class?: string
  allowClear?: boolean
  row?: number
  color?: string
  ghost?: boolean
}

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder
  ) {}

  // 表单布局
  @Input() layout: string

  // 表单配置
  @Input() fields: any[] = []

  // 表单提交事件
  @Output() refer = new EventEmitter<any>()

  // 表单
  form: FormGroup

  /**
   * 创建表单
   * @returns FormGroup 表单
   */
  createGroup(): FormGroup {
    const group = this.fb.group({})
    this.fields.forEach(field => {
      if (field.type !== 'button') {
        group.addControl(field.name, this.fb.control({
          value: field.value || '',
          disabled: field.disabled
        }, field.required ? [Validators.required] : field.validators))
      }
    })
    return group
  }

  /**
   * 表单提交
   */
  submit(): void {
    for (const i in this.form.controls) {
      if (this.form.controls[i]) {
        this.form.controls[i].markAsDirty()
        this.form.controls[i].updateValueAndValidity()
      }
    }
    if (this.form.valid) {
      this.refer.emit(this.form.value)
    }
  }

  /**
   * 初始化
   */
  ngOnInit() {
    this.form = this.createGroup()
  }
}
