import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-digital',
  templateUrl: './digital.component.html',
  styleUrls: ['./digital.component.scss']
})
export class DigitalComponent implements OnInit {
  constructor(
  ) {}

  // 数字
  numeral = 0
  // 数字分割列表
  numList = []
  // 数字英文名称列表
  nameList = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  // 数字大小
  numSize = 0

  // 数字横向线条长度
  @Input() xLen = 8
  // 数字纵向线条长度
  @Input() yLen = 7
  // 数字线条宽度
  @Input() lineWidth = 2
  // 数字线条间隙
  @Input() gap = 1
  // 数字颜色
  @Input() color = 'red'
  // 数字左右空隙
  @Input() space = 4
  // 数字倾斜角度
  @Input() angle = 0

  // 设置及获取数字
  @Input()
  set number(num: number) {
    this.numeral = num || 0
    this.numList = this.numeral.toString().split('')
  }
  get number(): number {
    return this.numeral
  }

  // 设置及获取数字大小，注： 设置了size就无须设置xLen和yLen
  @Input()
  set size(num: number) {
    this.numSize = num || 12
  }
  get size(): number {
    return this.numSize
  }

  /**
   * 获取字符串8的宽度和高度
   * @param fontSize 字体大小
   */
  getTextWidthAndHeight(fontSize) {
    const result = { width: 0, height: 0 }
    const span = document.createElement('span')
    span.innerHTML = '8'
    span.style.visibility = 'hidden'
    span.style.fontSize = fontSize + 'px'
    document.body.appendChild(span)
    result.width = span.offsetWidth
    result.height = span.offsetHeight
    span.parentNode.removeChild(span)
    return result
  }

  /**
   * 初始化
   */
  ngOnInit() {
    if (this.numSize) {
      const { width, height } = this.getTextWidthAndHeight(this.numSize)
      const xLen = width - this.lineWidth * 2
      const yLen = (height - this.lineWidth * 4 - this.gap * 3) / 2
      // 线宽及间隙过大导致横纵向线条长度小于最小值时
      if (xLen < 5 || yLen < 5) {
        this.lineWidth = 1
        this.gap = 0.5
      }
      this.xLen = width - this.lineWidth * 2
      this.yLen = (height - this.lineWidth * 4 - this.gap * 3) / 2
    }
  }
}
