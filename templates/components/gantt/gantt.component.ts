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

export interface GanttList {
  // 事件标题
  title?: string
  // 时间
  date: any
}

export interface GanttMap {
  // 名称
  name: string
  // 事件列表
  list: GanttList[]
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

  // 背景颜色对象列表
  @Input() bgList: any = {}
  // 文字颜色对象列表
  @Input() colorList: any = {}

  // 甘特图数据列表
  @Input()
  set data(data: any[]) {
    this.ganttData = this.formatData(data)
  }
  get data(): any[] {
    return this.ganttData || []
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
                if (!t.length || ([...t].pop().title !== findCurrent.title)) {
                  t.push({
                    ...findCurrent,
                    colspan: findCurrent.value && findCurrent.value.length
                  })
                }
                return t
              }
              t.push({
                colspan: 1
              })
              return t
            }, [])
          }
        })
      }

      const isGanttList = data.every(x => x.hasOwnProperty('name') && x.list instanceof Array
      && x.list.every(y => y.hasOwnProperty('date')))
      if (isGanttList) {
        return data.map((x, xIndex) => {
          if (!xIndex) {
            this.heads = x.list.map((y: any) => y.date)
          }
          x.list = x.list.reduce((t, c) => {
            const findCurrent = x.list.filter(y => c.title && c.title === y.title)
            if (findCurrent.length) {
              if (!t.length || ([...t].pop().title !== findCurrent[0].title)) {
                t.push({
                  title: findCurrent[0].title,
                  value: findCurrent.map((v: any) => v.date),
                  colspan: findCurrent.length
                })
              }
              return t
            }
            t.push({
              colspan: 1
            })
            return t
          }, [])
          return x
        })
      }

      console.error('甘特图格式不正确！')
    }
    return []
  }

  ngOnInit() {
    console.log(this.ganttData)
  }

}
