import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';

declare const window

/**
 * 表格配置
 * @param columns 表格列配置
 * @param data 表格数据
 */
export interface ScrollTable {
  columns: ScrollTableColumn[]
  data: any[]
}

/**
 * 表格列配置
 * @param label 字段名称
 * @param value 字段key
 * @param width 列宽度
 */
export interface ScrollTableColumn {
  label: string
  value: string | number
  width?: string | number
}

@Component({
  selector: 'app-scroll-table',
  templateUrl: './scroll-table.component.html',
  styleUrls: ['./scroll-table.component.scss']
})
export class ScrollTableComponent implements OnInit, AfterViewInit {
  @ViewChild('table', { static: true }) table: ElementRef
  @ViewChild('tbody', { static: true }) tbody: ElementRef

  // 表格配置
  tableData: ScrollTable = {
    columns: [],
    data: []
  }
  // 定时器
  timer
  // 动画时间
  transition = 1
  // 表格滚动高度
  top = 0
  // 单元格高度
  cellHeight = 32

  constructor() { }

  // 滚动高度
  @Input() scrollHeight = 15
  // 表格配置
  @Input()
  set data(data: ScrollTable) {
    this.tableData = data || {
      columns: [],
      data: []
    }
  }
  get data(): ScrollTable {
    return this.tableData
  }

  // 动画帧
  get requestAnimationFrame() {
    return window.requestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.msRequestAnimationFrame
  }
  // 取消动画帧
  get cancelAnimationFrame() {
    return window.cancelAnimationFrame
      || window.mozCancelAnimationFrame
  }

  /**
   * 表格滚动
   */
  scroll() {
    if (this.table) {
      const scrollTable = this.table.nativeElement
      scrollTable.appendChild(this.tbody.nativeElement.cloneNode(true))
      const fn = () => {
        const scrollHeight = this.tableData.data.length * this.cellHeight
        const surplus = scrollTable.offsetTop
        if (-scrollHeight === surplus) {
          this.transition = 0
          this.top = 0
        } else {
          this.transition = 1
          this.top = surplus - this.cellHeight
        }
        this.timer = this.requestAnimationFrame(fn)
      }
      this.timer = this.requestAnimationFrame(fn)
    }
  }

  /**
   * 暂停动画
   */
  pause() {
    if (this.table) {
      this.top = this.table.nativeElement.offsetTop
      this.cancelAnimationFrame(this.timer)
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.tableData.data.length) {
      this.scroll()
    }
  }

}
