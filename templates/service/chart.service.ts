import { Injectable } from '@angular/core'
import * as echarts from 'echarts'
import { SidebarService } from '@app/layout/sidebar/sidebar.service'

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(
    public sbs: SidebarService
  ) { }

  // 公共配置
  public option = {
    // 坐标系样式
    grid: {
      bottom: 50,
      top: 35,
      left: 20,
      right: 20
    },
    // 提示线样式
    tooltip: {
      trigger: 'axis',
      padding: 12,
      backgroundColor: '#fff',
      extraCssText: 'box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);',
      textStyle: {
        color: '#4A4A4A',
        fontSize: 14
      },
      axisPointer: {
        lineStyle: {
          color: '#979797',
          type: 'dashed'
        }
      }
    },
    // 图例样式
    legend: [
      // 圆形右上
      {
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 32,
        top: 10,
        right: 20,
        height: 24,
        textStyle: {
          fontSize: 12,
          padding: [0, 0, 0, 10],
          color: '#333'
        }
      }
    ],
    // x轴样式
    xAxis: {
      type: 'category',
      axisLine: { lineStyle: { color: '#BFBFBF' } },
      axisLabel: { color: '#666666' },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    // y轴样式
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#666666', fontSize: 12 },
      splitLine: { lineStyle: { color: '#EBECF0', type: 'dashed' } },
      nameTextStyle: {
        color: '#666'
      }
    },
    // 拖动条样式
    dataZoom: {
      type: 'slider',
      // tslint:disable-next-line
      handleIcon: 'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-80 600c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V360c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v304zm224 0c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V360c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v304z',
      handleStyle: {
        color: '#fff',
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
      },
      textStyle: {
        color: 'rgba(0, 0, 0, 0.65)'
      },
      height: 24,
      left: 60,
      right: 60,
      borderColor: 'transparent',
      backgroundColor: '#F0F2F5',
      dataBackground: {
        lineStyle: {
          opacity: 0
        },
        areaStyle: {
          color: '#CED4D9',
          opacity: 1
        }
      },
    },
    // 颜色列表 0:紫、1:浅绿、2:蓝、3:浅绿+、4:深绿、5:黄色、6:淡绿、7:深蓝、8:深红、9:深蓝-、10:橘红
    color: ['#8569FB', '#46C76D', '#157FFF', '#82C161', '#036765', '#F7B500', '#3FC668', '#2573D2', '#D76550', '#0091FF', '#EA6738'],
    // 渐变色列表 0:紫、1:绿、2:蓝、3:黄、4:浅黄、5:黄色、6:蓝色
    gradient: [
      ['rgba(187, 162, 253, 0.45)', 'rgba(255, 255, 255, 0.05)'],
      ['rgba(63, 198, 104, 0.46)', 'rgba(255, 255, 255, 0)'],
      ['rgba(21, 127, 255, 0.23)', 'rgba(255, 255, 255, 0)'],
      ['rgba(253, 193, 2, 0.5)', 'rgba(255, 255, 255, 0)'],
      ['rgba(247, 181, 0, 0.28)', 'rgba(255, 255, 255, 0)'],
      ['rgba(252, 219, 0, 1)', 'rgba(247, 181, 0, 1)'],
      ['rgba(103, 140, 224, 1)', 'rgba(1, 97, 170, 1)']
    ],
    // 折线图样式
    line: {
      // 折线图拐点形状
      symbol: 'circle',
      // 折线图拐点大小
      symbolSize: 4,
      showSymbol: false,
      // 折线图曲线样式
      lineStyle: {
        type: 'solid',
        width: 2
      },
      // 折线图拐点样式
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2,
      },
    },
    // 柱状图样式
    bar: {
      // 柱状图柱子最大宽度
      barMaxWidth: 16,
      // 柱状图柱子圆角
      barBorderRadius: 8
    },
    // 饼图样式
    pie: {
      radius: ['40%', '60%'],
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
      },
    }
  }

  /**
   * 获取字符串宽度和高度
   * @param fontSize 字体大小
   * @param text 字符串
   */
  getTextWidthAndHeight(fontSize, text) {
    const result = { width: 0, height: 0 }
    const span = document.createElement('span')
    span.innerHTML = text
    span.style.visibility = 'hidden'
    span.style.fontSize = fontSize + 'px'
    document.body.appendChild(span)
    result.width = span.offsetWidth
    result.height = span.offsetHeight
    span.parentNode.removeChild(span)
    return result
  }

  /**
   * 获取纯数字数组最大值
   * @param arr 纯数字数组
   */
  getMaxInArray(arr) {
    if (arr instanceof Array && arr.length) {
      return Math.max(...arr) || 0
    }
    return 0
  }

  /**
   * 格式化数据列表
   * @param data 数据
   */
  formatList(data) {
    return data instanceof Array
      ? (data.every(x => typeof x === 'object') ? data : [{ data }])
      : [data || {}]
  }

  /**
   * 根据数据及配置来重构配置
   * @param options 数据配置
   */
  formatOptions(options: any = {}) {
    const { data, ...others } = options

    const list = [...(data || [])]

    return Object.keys(others).reduce((t, c) => {
      let currentOpts = {
        [c]: others[c]
      }
      if (['xAxis', 'yAxis', 'series'].includes(c)) {
        if (typeof others[c] === 'string') {
          currentOpts = {
            [c]: list.map(x => x[others[c]])
          }
        } else if (others[c] instanceof Array) {
          if (others[c].every(x => typeof x === 'object')) {
            currentOpts = {
              [c]: others[c].map(y => ({
                ...y,
                ...(typeof y.data === 'string' ? { data: list.map(x => x[y.data]) } : {})
              }))
            }
          }
        } else {
          if (others[c] && typeof others[c] === 'object') {
            currentOpts = {
              [c]: {
                ...others[c],
                ...(typeof others[c].data === 'string' ? { data: list.map(x => x[others[c].data]) } : {})
              }
            }
          }
        }
      }
      return {
        ...t,
        ...currentOpts
      }
    }, {})
  }

  /**
   * 根据数据数组及字体大小获取最长字符串宽度和高度
   * @param arr 数据数组
   * @param fontSize 字体大小
   * @param unit 单位
   */
  getMaxWidthAndHeight(arr = [], fontSize = 12, unit = '') {
    let data = arr.reduce((a, c) => {
      return [
        ...a,
        ...(c && c.data)
      ]
    }, [])
    data = data.map(x => (x + (Number(x) ? ','.repeat(`${x}`.length / 3) : '') + unit))
    const maxLength = this.getMaxInArray(data.map(x => x.length))
    data = data.map(x => this.getTextWidthAndHeight(fontSize, x));
    const maxWidth = this.getMaxInArray(data.map(x => x.width))
    const maxHeight = 0
    // const maxHeight = this.getMaxInArray(data.map(x => x.height))
    return {
      width: maxWidth + maxLength,
      height: maxHeight
    }
  }

  /**
   * 获取y轴宽度
   * @param yAxis y轴数据数组
   * @param series 数据数组
   * @param gridIndex grid序列号
   */
  getYAxisWidth(yAxis, series, gridIndex) {
    const yAxisFilter = yAxis.filter(x => (x.gridIndex || 0) === gridIndex)

    const result = {
      left: 0,
      right: 0
    }

    const hasCategory = yAxisFilter.some(x => x.type === 'category')
    const categoryYAxis = yAxisFilter.find(x => x.type === 'category')
    let categoryWidth = 0
    if (hasCategory && categoryYAxis && categoryYAxis.data instanceof Array) {
      categoryWidth = this.getMaxInArray(categoryYAxis.data.map(x => this.getTextWidthAndHeight(12, x).width))
    }

    yAxisFilter.forEach((yAxisData, yAxisIndex) => {
      const seriesFilter = series.filter(x => (x.yAxisIndex || 0) === yAxisIndex)

      const { axisLabel = null } = seriesFilter[0] || {}
      const { fontSize = 12, formatter = null } = axisLabel || {}
      let unit = ''
      if (typeof formatter === 'string' && formatter.startsWith('{value}')) {
        unit = formatter.replace('{value}', '')
      }

      const yAxiswidth: any = this.getMaxWidthAndHeight(seriesFilter, fontSize, unit).width
      const { position = null } = yAxisData || {}
      if ((!position && yAxisIndex > 0) || position === 'right') {
        result.right += yAxiswidth
      } else {
        result.left += yAxiswidth
      }
    })

    if (result.left < categoryWidth) {
      result.left = categoryWidth + 10
    }

    return result
  }

  /**
   * 根据数据获取图表宽度
   * @param xAxis x轴数据数组
   * @param yAxis y轴数据数组
   * @param series 数据数组
   * @param dataZoom 缩放配置
   */
  getGrid({ gridIndex, yAxis, series, legend, dataZoom, grid = {} }) {
    const result = {
      ...this.option.grid
    }
    const positionList = ['top', 'bottom', 'right', 'left']

    const { right = 0, left = 0 } = this.getYAxisWidth(yAxis, series, gridIndex) || {}

    result.right += right
    result.left += left

    if (legend === true) {
      result.top += 50
    }

    if (dataZoom === true) {
      result.bottom += 30
    }

    positionList.forEach(key => {
      if (grid[key] && `${grid[key]}`.endsWith('%')) {
        result[key] = grid[key]
      } else {
        result[key] += (grid[key] || 0)
        result[key] = result[key] < 50 ? 50 : result[key]
      }
    })

    return result
  }

  /**
   * 根据颜色序列号获取颜色
   * @param type 图表类型
   * @param index 颜色序列号
   * @param styleName 要渲染的属性名称
   * @param isGradient 是否使用渐变色列表
   */
  getColor(type, index, styleName, isGradient = false) {
    if (index || index === 0) {
      let color: any = this.option.color[index]
      if (isGradient) {
        color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: (this.option.gradient[index] || [])[0]
          },
          {
            offset: 1,
            color: (this.option.gradient[index] || [])[1]
          }
        ])
      }
      return {
        [styleName]: {
          ...this.option[type][styleName],
          color
        }
      }
    }
    return {}
  }

  /**
   * 获取图表配置 注：每个属性多数据传值必须是对象数组，不能是纯数组
   * @param options 图表配置
   * @param mode 图表配置模式 1.轴数组数据2.对象数组数据
   */
  getOptions(options, mode = 1) {
    this.changeTheme()
    if (mode === 2) {
      options = this.formatOptions(options)
    }
    const { xAxis = [{}], yAxis = [{}], series = [{}], grid = {}, tooltip = {}, legend = {}, ...others } = {
      ...options
    }
    const xAxisList = this.formatList(xAxis)
    const yAxisList = this.formatList(yAxis)
    const seriesList = this.formatList(series)
    const gridList = this.formatList(grid)
    const noAxis = seriesList.every(x => ['pie'].includes(x.type))
    return {
      grid: gridList.map((x, xIndex) => ({
        ...x,
        ...this.getGrid({
          yAxis: yAxisList,
          series: seriesList,
          gridIndex: xIndex,
          legend,
          grid: x,
          ...others
        })
      })),
      tooltip: {
        ...this.option.tooltip,
        ...tooltip
      },
      legend: {
        show: legend,
        ...this.option.legend.find((x, xIndex) => xIndex === (typeof legend === 'number' ? legend : 0)),
        data: seriesList.reduce((t, c) => {
          if (c.data instanceof Array && c.data.length && c.data.every(d => d && typeof d === 'object')) {
            return [
              ...t,
              ...c.data.map(d => ({ name: d.name }))
            ]
          }
          return [
            ...t,
            { name: c.name }
          ]
        }, []),
        ...legend
      },
      xAxis: xAxisList.map((x) => ({
        xAxis,
        ...this.option.xAxis,
        ...x,
        show: !noAxis
      })),
      yAxis: yAxisList.map((x, xIndex) => ({
        ...this.option.yAxis,
        splitLine: {
          show: xIndex === 0,
          ...this.option.yAxis.splitLine
        },
        ...x
      })),
      series: seriesList.map((x) => ({
        ...this.option[x.type],
        ...x,
        ...this.getColor(x.type, x.colorIndex, 'itemStyle'),
        ...this.getColor(x.type, x.gradientIndex, 'areaStyle', true),
        ...(
          (x.data instanceof Array && x.data.every(d => d && typeof d === 'object'))
            ? {
              data: x.data.map(d => ({
                ...d,
                ...this.getColor(x.type, d.colorIndex, 'itemStyle'),
                ...this.getColor(x.type, d.gradientIndex, 'areaStyle', true),
              }))
            }
            : {}
        )
      })),
      ...(Object.keys(others).reduce((t, key) => {
        return {
          ...t,
          [key]: others[key] instanceof Array
            ? others[key].map(x => ({
              ...this.option[key],
              ...x
            }))
            : [{
              ...this.option[key],
              ...others[key]
            }]
        }
      }, {}))
    }
  }

  /**
   * 图表实例获取
   * @param chartInstance 图表实例
   */
  chartInit(chartInstance: any): void {
    this.sbs.collapseEvent.subscribe(() => {
      if (chartInstance) {
        setTimeout(() => {
          chartInstance.resize()
        }, 350);
      }
    })
  }

}
