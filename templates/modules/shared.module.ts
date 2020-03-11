import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

// 第三方模块
const THIRDMODULES = []

// 公共模块
const COMMONMODULES = [
  CommonModule,
  FormsModule,
  RouterModule,
  ReactiveFormsModule,
]

// 公共布局
const LAYOUT = []

// 公共组件
const COMPONENTS = []

// 公共指令
const DIRECTIVES = []

// 公共过滤器
const PIPES = []

@NgModule({
  imports: [
    ...COMMONMODULES,
    ...THIRDMODULES
  ],
  declarations: [
    ...LAYOUT,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ],
  exports: [
    ...COMMONMODULES,
    ...THIRDMODULES,
    ...LAYOUT,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ]
})

export class SharedModule { }
