import { Component, OnInit, Input } from '@angular/core';

/**
 * Example：
 * heads = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00']
 * data = [
 *  {
 *    name: '事件1',
 *    list: [
 *      {
 *        title: '第一事件',
 *        value: ['00:00', '04:00', '08:00'],
 *        bg: '#3399FF'
 *      }
 *    ]
 *  }
 * ]
 */

export interface GanttEvent {
  // 事件标题
  title: string
  // 事件开始及结束时间
  value: [any, any]
}

export interface Gantt {
  // 名称
  name: string
  // 事件列表
  list: GanttEvent[]
}

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss']
})
export class GanttComponent implements OnInit {

  constructor() { }

  // 甘特图数据列表
  ganttData: any = []

  // 表头数据列表
  @Input() heads: any[] = []

  // 是否使用提示框
  @Input() tooltip = false

  // 表格宽度，默认100%
  @Input() width = 0

  // 甘特图数据列表
  @Input()
  set data(data: any[]) {
    this.ganttData = this.formatData(data)
  }
  get data(): any[] {
    return this.ganttData || []
  }

  // 获取单元格宽度
  get cellWidth() {
    if (this.width) {
      return this.width / (this.heads.length + 1) + 'px'
    }
    return 100 / (this.heads.length + 1) + '%'
  }

  /**
   * 格式化数据
   * @param data 甘特图原始数据
   */
  formatData(data: Gantt[]): any[] {
    if (data instanceof Array) {
      const isGantt = data.every(x => x.hasOwnProperty('name') && x.list instanceof Array
      && x.list.every(y => y.hasOwnProperty('title') && y.value instanceof Array))
      if (isGantt && this.heads.length) {
        return data.map((x: any) => {
          x.list = x.list.map(y => {
            const firstIndex = this.heads.indexOf([...y.value].shift())
            const lastIndex = this.heads.indexOf([...y.value].pop())
            y.value = this.heads.slice(firstIndex, lastIndex + 1)
            return y
          })
          return {
            name: x.name,
            list: this.heads.reduce((t, c) => {
              const findCurrent = x.list.find(y => y.value.includes(c))
              if (findCurrent) {
                const prev = [...t].pop()
                if (!t.length || (prev.title !== findCurrent.title)) {
                  let colspan = findCurrent.value && findCurrent.value.length
                  const cellWidth = parseFloat(this.cellWidth)
                  if (prev && prev.value && prev.value.includes(findCurrent.value[0])) {
                    colspan -= 0.5
                  }
                  if (x.list.some(y => y.title !== findCurrent.title && y.value.includes([...findCurrent.value].pop()))) {
                    colspan -= 0.5
                  }
                  t.push({
                    ...findCurrent,
                    colspan,
                    width: cellWidth * colspan + (this.width ? 'px' : '%')
                  })
                }
                return t
              }
              t.push({
                colspan: 1,
                width: this.cellWidth
              })
              return t
            }, [])
          }
        })
      }

      console.error('甘特图格式不正确！')
    }
    return []
  }

  ngOnInit() {
  }

}
