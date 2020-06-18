import { Injectable } from '@angular/core'
import * as echarts from 'echarts'

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(
  ) { }

  // 图例
  public legend = {
    // 公共图例配置
    common: {
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 10,
      textStyle: {
        fontSize: 12,
        padding: [3, 0, 0, 3],
        color: '#A7D3FF'
      }
    },
    // 图例居上
    top: {
      top: 10
    },
    // 图例居下
    bottom: {
      bottom: 10
    },
    // 图例居左
    left: {
      top: 50,
      left: 20,
      orient: 'vertical',
    },
    // 图例居右
    right: {
      top: 50,
      right: 20,
      orient: 'vertical',
    },
    // 折线图图例图标
    // tslint:disable-next-line
    line: 'path://M960 470.857143H64c-5.028571 0-9.142857 4.114286-9.142857 9.142857v64c0 5.028571 4.114286 9.142857 9.142857 9.142857h896c5.028571 0 9.142857-4.114286 9.142857-9.142857v-64c0-5.028571-4.114286-9.142857-9.142857-9.142857z',
    // 柱状图图例图标
    bar: 'path://M1024 1024H0V0h1024v1024z',
    // 饼图图例图标
    pie: 'circle',
    // 雷达图图例图标
    radar: 'path://M1024 1024H0V0h1024v1024z'
  }
  // 轴线
  public axis = {
    // x轴配置
    xAxis: {
      axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
      axisLabel: { color: '#A7D3FF' },
      axisTick: { show: false },
      splitLine: { show: false },
      nameTextStyle: {
        color: '#A7D3FF'
      }
    },
    // y轴配置
    yAxis: {
      axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
      axisLabel: { color: '#A7D3FF' },
      axisTick: { show: false },
      splitLine: { show: false },
      nameTextStyle: {
        color: '#A7D3FF'
      }
    },
  }
  // 提示框
  public tooltip = {
    // 轴线配置
    axis: {
      axisPointer: {
        lineStyle: {
          color: '#A7D3FF'
        }
      }
    },
    // 数据项配置
    item: {
      axisPointer: {
        lineStyle: {
          color: '#A7D3FF'
        }
      }
    },
  }
  // 系列
  public serise = {
    // 图标配置
    symbol: {
      // 空心矩形图标
      emptyRect: 'path://M192 192v640h640V192z m64 64h512v512H256z',
      // 空心圆形图标
      // tslint:disable-next-line
      emptyCircle: 'path://M512 949.138286c238.72 0 437.138286-197.997714 437.138286-437.138286 0-238.72-198.857143-437.138286-437.577143-437.138286C272.438857 74.861714 74.88 273.28 74.88 512c0 239.140571 197.997714 437.138286 437.138286 437.138286z m0-72.850286C309.705143 876.288 148.114286 714.276571 148.114286 512c0-201.874286 161.152-364.288 363.446857-364.288 201.856 0 364.269714 162.432 364.708571 364.288 0.420571 202.294857-162.432 364.288-364.288 364.288z',
      // 空心三角形图标
      // tslint:disable-next-line
      emptyTriangle: 'path://M182.217143 918.070857h659.565714c72.868571 0 118.290286-52.297143 118.290286-118.290286 0-19.712-5.138286-39.862857-15.853714-58.276571L613.796571 165.924571c-22.308571-39.003429-61.293714-59.995429-101.577142-59.995428-39.862857 0-79.286857 20.992-102.016 59.995428l-330.422858 576a114.340571 114.340571 0 0 0-15.853714 57.856c0 66.011429 45.860571 118.290286 118.290286 118.290286z m0.859428-67.291428c-30.006857 0-49.737143-24.429714-49.737142-50.998858 0-7.716571 1.298286-16.713143 5.595428-25.709714l329.984-575.579428c9.435429-16.274286 26.587429-23.990857 43.300572-23.990858 16.713143 0 32.987429 7.277714 42.422857 23.990858l330.002285 576c4.278857 8.594286 6.418286 17.572571 6.418286 25.289142 0 26.569143-20.571429 51.017143-50.139428 51.017143z',
      // 空心三角形图标
      // tslint:disable-next-line
      shadow: 'path://M21.459681 9.330296v1005.339408h998.341686V9.330296H21.459681z m32.656037 441.323007l528.09476 528.094761H320.495672l-266.379954-266.379955V450.653303z m0-46.184966V68.111162l910.636902 910.636902h-336.357176L54.115718 404.468337z m23.792255-359.216401h331.692027l577.54533 577.545331v331.692027L77.907973 45.251936z m377.876993 0h261.714806l269.645558 269.645558v261.714807L455.784966 45.251936z m531.360364 223.927107l-223.460592-223.927107h223.460592v223.927107z m-933.029612 489.374032l220.194988 220.194989H54.115718v-220.194989z',
    },
    // 折线图配置
    line: {
      symbol: 'circle',
      showSymbol: false
    },
    // 柱状图配置
    bar: {
      barMaxWidth: 15,
    },
    // 饼图配置
    pie: {
    },
    // 雷达图配置
    radar: {
      symbol: 'none',
      areaStyle: {},
    },
    // 环形饼图配置
    ring: {
      radius: ['36%', '56%'],
    }
  }
  // 雷达图
  public radar = {
    center: ['50%', '44%'],
    radius: '50%',
    name: { color: '#A7D3FF' },
    axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
    splitArea: { show: false },
    splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
  }
  // 图片
  public image = {
    shadow: '/assets/img/shadow.svg',
    arrowUp: '/assets/img/arrow-up.svg',
    arrowDown: '/assets/img/arrow-down.svg'
  }
  // 标签
  public label = {
    arrow: {
      formatter: (params) => {
        const fData = params.data
        const percent = Math.abs(fData.percent)
        const isPlus = fData.percent > 0
        return `{normalText|${percent}%}{${isPlus ? 'arrowUp' : 'arrowDown'}|}`
      },
      rich: {
        normalText: {
          color: '#A7D3FF',
          padding: [0, 2, 0, 0]
        },
        redText: {
          color: '#FF6A6A',
          padding: [0, 2, 0, 0]
        },
        greenText: {
          color: '#59C143',
          padding: [0, 2, 0, 0]
        },
        arrowUp: {
          width: 8,
          height: 8,
          backgroundColor: {
            image: this.getImage('arrowUp')
          },
        },
        arrowDown: {
          width: 8,
          height: 8,
          backgroundColor: {
            image: this.getImage('arrowDown')
          },
        },
      }
    }
  }

  /**
   * 获取图例
   * @param direction 图例方向
   * @param data 图例数据
   */
  getLegend(direction = 'top', data?: any[]) {
    return {
      ...this.legend.common,
      ...this.legend[direction],
      ...(this.isArray(data) ? {
        data: data.map(d => {
          return this.isString(d) ? d : {
            name: d.name,
            ...(d.textStyle ? { textStyle: d.textStyle } : {}),
            ...(this.legend[d.type] ? { icon: this.legend[d.type] } : {}),
            ...(d.symbol ? { icon: d.symbol } : {})
          }
        })
      } : {})
    }
  }

  /**
   * @param data 轴线数据类型
   */
  getAxisType(data: any[]) {
    if (this.isArray(data) && data.length) {
      const isValueList = data.every(d => this.isNumber(this.isObject(d) ? d.value : d))
      return isValueList ? 'value' : 'category'
    }
    return 'category'
  }
  /**
   * 获取轴线
   * @param axisType 轴线类型
   * @param data 轴线数据
   */
  getAxis(axisType = 'xAxis', data: any = {}) {
    let type = data.type || this.getAxisType(data.data)
    if (this.isArray(data)) {
      return data.map(d => {
        type = d.type || this.getAxisType(d.data)
        if (type === 'value') {
          delete d.data
        }
        return {
          type,
          ...this.axis[axisType],
          ...d
        }
      })
    }
    if (type === 'value') {
      delete data.data
    }
    return {
      type,
      ...this.axis[axisType],
      ...data
    }
  }

  /**
   * 获取提示框样式
   * @param triggerType 触发类型
   * @param tooltip 提示框配置
   */
  getTooltip(triggerType = 'axis', tooltip?: any) {
    return {
      trigger: triggerType,
      ...this.tooltip[triggerType],
      formatter: (params: any) => {
        if (this.isArray(params)) {
          return params.reduce((t, c, cIndex) => {
            const isNoSeriesName = c.seriesName.startsWith('series')
            if (!cIndex) {
              t += (isNoSeriesName ? '' : c.axisValue)
            }
            if (c.color && c.color.image) {
              c.marker = c.marker.replace(`background-color:[object Object];`, `background: url(${c.color.image.src})`)
            }
            const br = isNoSeriesName ? '' : '<br>'
            const seriesName = isNoSeriesName ? c.name : c.seriesName
            const value = this.isArray(c.value) ? c.value[1] : (this.isObject(c.value) ? c.value.value : c.value)
            t += `${br}${c.marker}${seriesName}: ${value || (value === 0 ? 0 : '-')}`
            if (c.data && c.data.unit) {
              t += typeof tooltip.unitFormat === 'function' ? tooltip.unitFormat(c.data.unit) : c.data.unit
            }
            if (tooltip && tooltip.extra) {
              t += tooltip.extra
            }
            return t
          }, '')
        } else {
          let result = `${params.marker}${params.name}: ${params.value}`
          if (tooltip && tooltip.extra) {
            result += tooltip.extra
          }
          if (params.seriesType === 'pie') {
            result += `(${params.percent}%)`
          }
          return result
        }
      }
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
   * 获取轴线标签最大占用空间
   * @param data 轴线数据
   * @param fontSize 字体大小
   */
  getAxisLabelSpace(data: any[], fontSize = 12) {
    if (this.isArray(data)) {
      const type = this.getAxisType(data)
      return Math.max(...data.map(d => {
        let val = this.isObject(d) ? d.value : d
        if (type === 'value') {
          val = (Number(val) && Number(val).toLocaleString()) || ''
        }
        return this.getTextWidthAndHeight(fontSize, val).width
      }))
    }
    return 0
  }
  /**
   * 根据轴线数据获取格线数据
   * @param gridData 轴线数据
   * @param grid 格线数据
   */
  getGrid(gridData: any[], grid: any) {
    let result: any = {}
    if (this.isArray(gridData)) {
      result = gridData.reduce((t, c) => {
        const { data, labelWithLineSpace, index, position, fontSize } = c
        if (!t[index]) {
          t[index] = {}
        }
        if (!t[index][position]) {
          t[index][position] = 0
        }
        t[index][position] += labelWithLineSpace
        t[index][position] += this.getAxisLabelSpace(data, fontSize)
        t[index][position] += 20
        if (this.isObject(grid)) {
          if (this.isArray(grid)) {
            t[index] = {
              ...t[index],
              ...(grid[index] || {})
            }
          } else {
            t[index] = {
              ...t[index],
              ...grid
            }
          }
        }
        return t
      }, [])
    }
    return result
  }

  /**
   * 根据颜色数组获取渐变色
   * @param colors 颜色数组
   */
  getGradient(colors: any[] = []) {
    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: colors[0]
      },
      {
        offset: 1,
        color: colors[1]
      }
    ])
  }

  /**
   * 判断是否是字符串
   * @param data 数据
   */
  isString(data: any): boolean {
    return typeof data === 'string'
  }

  /**
   * 判断是否是非null的对象
   * @param data 数据
   */
  isObject(data: any): boolean {
    return typeof data === 'object' && !!data
  }

  /**
   * 判断是否是数组
   * @param data 数据
   */
  isArray(data: any): boolean {
    return data instanceof Array
  }

  /**
   * 判断是否是数字
   * @param data 数据
   */
  isNumber(data: any): boolean {
    return !!Number(data) || Number(data) === 0 || data === 0
  }

  /**
   * 判断是否是对象数组
   * @param data 数据
   */
  isObjectArray(data: any): boolean {
    return this.isArray(data) && data.every(d => this.isObject(d))
  }

  /**
   * 格式化成对象数组
   * @param data 数据
   */
  formatObjectArray(data: any) {
    if (this.isObject(data)) {
      if (this.isObjectArray(data)) {
        return data
      }
      if (this.isArray(data)) {
        return [{ data }]
      }
      return [data]
    }
    return [{}]
  }

  /**
   * 获取轴线图表配置
   * @param options 图表配置
   */
  getAxisOptions(options: any = {}) {
    const { grid = {}, tooltip = {}, legend = {}, key, val, xAxis, yAxis, series, ...others } = options

    // 图例数据处理
    const legendDirection = (legend && legend.direction) || 'bottom'
    const legendData = []

    // x轴数据处理
    const xAxisData = this.formatObjectArray(xAxis || key)

    // y轴数据处理
    const yAxisData = this.formatObjectArray(yAxis)

    // 格线数据处理
    const gridData = []

    // 系列数据处理
    const seriesData = this.formatObjectArray(series || val).map(s => {
      const xAxisIndex = s.xAxisIndex || s.xIndex || 0
      const yAxisIndex = s.yAxisIndex || s.yIndex || 0
      const data = s.data || s.val || []
      const name = s.name || s.key
      const symbol = this.serise.symbol[s.symbol] || s.symbol
      const unit = yAxisData[yAxisIndex] && yAxisData[yAxisIndex].name
      // 数组数据处理
      let isDoubleValue = false
      if (this.isArray(data)) {
        isDoubleValue = data.every(d => this.isObject(d) && (this.isArray(d) || this.isArray(d.value)))
      }
      // x轴数据处理
      if (!xAxisData[xAxisIndex]) {
        xAxisData[xAxisIndex] = {}
      }
      if (!xAxisData[xAxisIndex].data) {
        xAxisData[xAxisIndex].data = isDoubleValue ? data.map(d => d.value ? d.value[0] : d[0]) : []
      }
      // y轴数据处理
      if (!yAxisData[yAxisIndex]) {
        yAxisData[yAxisIndex] = {}
      }
      if (!yAxisData[yAxisIndex].data) {
        yAxisData[yAxisIndex].data = isDoubleValue ? data.map(d => d.value ? d.value[1] : d[1]) : data
      }
      // 格线数据处理
      if (!gridData[yAxisIndex]) {
        const isAxisReverse = xAxisData.every(x => x && x.type === 'value')
        gridData[yAxisIndex] = {
          index: yAxisData[yAxisIndex].gridIndex || 0,
          position: yAxisData[yAxisIndex].position || (yAxisIndex ? 'right' : 'left'),
          labelWithLineSpace: yAxisData[yAxisIndex].margin || 8,
          fontSize: yAxisData[yAxisIndex].fontSize || 12,
          data: isAxisReverse ? yAxisData[yAxisIndex].data
            : (isDoubleValue ? data.map(d => d.value ? d.value[1] : d[1]) : data)
        }
      }
      // 图例数据处理
      if (name) {
        legendData.push({
          name,
          type: s.legendIcon || s.type,
          symbol
        })
      }
      delete s.key
      delete s.val
      delete s.xIndex
      delete s.yIndex
      delete s.legendIcon
      return {
        ...(this.serise[s.type] || {}),
        ...s,
        ...(name ? { name } : {}),
        ...(symbol ? { symbol } : {}),
        xAxisIndex,
        yAxisIndex,
        name,
        data: data.map(d => ({
          ...((d && d.value) ? { ...d } : { value: d }),
          ...(unit ? { unit } : {})
        }))
      }
    })

    return {
      grid: this.getGrid(gridData, grid),
      tooltip: {
        ...this.getTooltip('axis', tooltip),
        ...tooltip
      },
      legend: {
        ...this.getLegend(legendDirection, legendData),
        ...legend
      },
      xAxis: this.getAxis('xAxis', xAxisData),
      yAxis: this.getAxis('yAxis', yAxisData),
      series: seriesData,
      ...others
    }
  }

  /**
   * 获取数据项图表配置
   * @param options 图表配置
   */
  getItemOptions(options: any = {}) {
    const { tooltip = {}, legend = {}, val, series, ...others } = options

    // 图例数据处理
    const legendDirection = (legend && legend.direction) || 'bottom'
    const legendData = []

    // 系列数据处理
    const seriesData = this.formatObjectArray(series || val).map(s => {
      const data = s.data || s.val || []
      const name = s.name || s.key
      // 图例数据处理
      if (name) {
        legendData.push({
          name: s.name,
          type: s.legendIcon || s.type
        })
      } else {
        if (data.every(d => this.isObject(d) && d.name)) {
          legendData.push(...data.map(d => ({
            name: d.name,
            type: d.legendIcon || s.type,
            symbol: d.symbol
          })))
        }
      }
      delete s.key
      delete s.yIndex
      delete s.yIndex
      delete s.legendIcon
      return {
        ...(this.serise[s.type] || {}),
        ...(this.serise[s.seriesType] || {}),
        ...s,
        name,
        data
      }
    })

    return {
      tooltip: {
        ...this.getTooltip('item', tooltip),
        ...tooltip
      },
      legend: {
        ...this.getLegend(legendDirection, legendData),
        ...legend
      },
      series: seriesData,
      ...others
    }
  }

  /**
   * 根据名称获取image对象
   * @param name 名称
   */
  getImage(name: string) {
    const image = new Image()
    image.src = this.image[name] || name
    return image
  }

  /**
   * 获取第一条为折线图其余为柱状图配置
   * @param data 图表配置
   */
  getFirstLineOtherBar(data: any = {}) {
    const { key, val, xAxis, series, stack, barMaxWidth, barBorderRadius, lastShadow, ...others } = data

    return this.getAxisOptions({
      xAxis: this.formatObjectArray(xAxis || key).map(x => ({
        type: 'category',
        ...x,
      })),
      series: this.formatObjectArray(series || val).map((v: any, vIndex) => {
        const seriesData = v.data || v.val || []
        delete v.data
        delete v.val
        return {
          ...v,
          ...(vIndex
            ? {
              type: 'bar',
              ...(stack ? { stack } : {}),
              ...(barMaxWidth ? { barMaxWidth } : {}),
              ...(barBorderRadius ? { itemStyle: { barBorderRadius } } : {}),
            }
            : {
              type: 'line',
              yIndex: 1
            }
          ),
          ...(lastShadow ? {
            data: seriesData.map((y, yIndex) => ({
              value: y,
              ...(yIndex !== (seriesData.length - 1) ? {} : {
                itemStyle: {
                  color: {
                    image: this.getImage('shadow')
                  }
                }
              })
            }))
          } : {
              data: seriesData
            })
        }
      }),
      ...others
    })
  }

  /**
   * 获取环形饼图配置
   * @param data 图表配置
   */
  getRing(data: any = {}) {
    const { legend = {}, tooltip = {}, unit, val, series, ...others } = data

    return this.getItemOptions({
      legend: {
        direction: 'right',
        ...legend
      },
      tooltip: {
        extra: unit,
        ...tooltip,
      },
      series: {
        type: 'pie',
        seriesType: 'ring',
        label: {
          formatter: `{b} {c}${unit}`
        },
        data: series || val || []
      },
      ...others
    })
  }

  /**
   * 获取横向柱状图配置
   * @param data 图表配置
   */
  getHorizontalBar(data: any = {}) {
    const {
      grid = {},
      legend = {},
      tooltip = {},
      key,
      val,
      xAxis,
      yAxis,
      series,
      unit,
      stack,
      barMaxWidth,
      barBorderRadius,
      ...others
    } = data

    return this.getAxisOptions({
      legend: {
        top: 40,
        direction: 'right',
        ...legend
      },
      grid: {
        top: 20,
        bottom: 40,
        right: 80,
        ...grid
      },
      tooltip: {
        extra: unit,
        ...tooltip
      },
      xAxis: {
        type: 'value',
        ...(xAxis || {}),
      },
      yAxis: {
        data: key || [],
        ...(yAxis || {}),
      },
      series: this.formatObjectArray(series || val).map(x => ({
        ...x,
        type: 'bar',
        ...(stack ? { stack } : {}),
        ...(barMaxWidth ? { barMaxWidth } : {}),
        ...(barBorderRadius ? { itemStyle: { barBorderRadius } } : {}),
      })),
      ...others
    })
  }

  /**
   * 获取不同大小气泡散点图配置
   * @param data 图表配置
   */
  getBubbleScatter(data: any = {}) {
    const { tooltip = {}, val, series, xAxisUnit, typeList, ...others } = data

    const seriesData = this.formatObjectArray(series || val).reduce((t, c) => {
      const index = c.type === 1 ? 0 : 1
      if (!t[index]) {
        t[index] = {
          name: (typeList || [])[c.type],
          data: [
            [c.sval, c.eval]
          ],
          yAxisIndex: index,
          type: 'scatter'
        }
      } else {
        t[index].data.push([c.sval, c.eval])
      }
      return t
    }, [])

    return this.getAxisOptions({
      tooltip: {
        formatter: (params: any) => {
          return params.reduce((t, c, cIndex) => {
            if (!cIndex) {
              t += c.value[0]
              if (xAxisUnit) {
                t += xAxisUnit
              }
            }
            t += `<br>${c.marker}${c.seriesName}: ${c.value[1]}`
            if (c.data && c.data.unit) {
              t += c.data.unit
            }
            return t
          }, '')
        },
        ...(tooltip || {}),
      },
      visualMap: seriesData.map(x => {
        const vals = x.data.map(d => d[1])
        return {
          show: false,
          min: Math.min(...vals),
          max: Math.max(...vals),
          seriesIndex: x.yAxisIndex,
          inRange: {
            symbolSize: [18, 40]
          }
        }
      }),
      series: seriesData,
      ...others
    })
  }

  /**
   * 获取含有百分比及箭头标签的柱状图配置
   * @param data 图表配置
   */
  getPercentLabelBar(data: any = {}) {
    const { grid = {}, val, series, stack, barMaxWidth, barBorderRadius, ...others } = data

    return this.getAxisOptions({
      grid: {
        right: 10,
        bottom: 40,
        ...grid,
      },
      series: {
        type: 'bar',
        ...(stack ? { stack } : {}),
        ...(barMaxWidth ? { barMaxWidth } : {}),
        ...(barBorderRadius ? { itemStyle: { barBorderRadius } } : {}),
        label: {
          show: true,
          position: 'top',
          ...this.label.arrow
        },
        data: series || val || []
      },
      ...others
    })
  }

  /**
   * 获取百分比柱状图配置
   * @param data 图表配置
   */
  getPercentBar(data: any = {}) {
    const {
      grid = {},
      legend = {},
      key,
      val,
      xAxis,
      yAxis,
      series,
      label,
      barMaxWidth,
      barBorderRadius,
      background,
      ...others
    } = data

    return this.getAxisOptions({
      grid: {
        top: 20,
        right: 40,
        bottom: 40,
        ...grid
      },
      legend: {
        show: false,
        ...legend,
      },
      xAxis: {
        type: 'value',
        data: [0, 25, 50, 75, 100],
        axisLabel: {
          ...this.axis.xAxis.axisLabel,
          formatter: '{value}%'
        },
        ...(xAxis || {}),
      },
      yAxis: [
        {
          data: key || [],
          ...((yAxis && yAxis[0]) || {}),
        },
        {
          axisLine: { show: false },
          data: [],
          ...((yAxis && yAxis[1]) || {}),
        },
      ],
      series: [
        {
          type: 'bar',
          ...(barMaxWidth ? { barMaxWidth } : {}),
          ...(barBorderRadius ? { itemStyle: { barBorderRadius } } : {}),
          label: {
            show: true,
            position: 'right',
            ...this.label.arrow,
            ...(label || {})
          },
          data: series || val || []
        },
        {
          type: 'bar',
          yAxisIndex: 1,
          ...(barMaxWidth ? { barMaxWidth } : {}),
          ...(barBorderRadius ? {
            itemStyle: {
              ...(background ? { color: background } : {}),
              barBorderRadius
            }
          } : {}),
          data: (series || val || []).map(x => 100),
          z: 0
        }
      ],
      ...others
    })
  }

  /**
   * 获取雷达图配置
   * @param data 图表配置
   */
  getRadar(data: any = {}) {
    const { tooltip = {}, unit, key, indicator, val, radar, series, ...others } = data
    return this.getItemOptions({
      tooltip: {
        formatter: (params: any) => {
          return (indicator || key || []).reduce((t, c, cIndex) => {
            if (!cIndex) {
              t += params.marker
              t += params.name
            }
            t += `<br>${c.name}: ${params.value && params.value[cIndex]}`
            if (c.unit || unit) {
              t += (c.unit || unit)
            }
            return t
          }, '')
        },
        ...tooltip
      },
      radar: {
        ...this.radar,
        indicator: indicator || key || [],
        ...(radar || {})
      },
      series: {
        type: 'radar',
        ...this.serise.radar,
        data: series || val || []
      },
      ...others
    })
  }

  /**
   * 每一项都是图例的柱状图
   * @param data 图表数据
   */
  getItemBar(data: any = {}) {
    const { tooltip = {}, key, xAxis, yAxis, val, series, barMaxWidth, barBorderRadius, ...others } = data
    const seriesData = (series || val || [])
    return this.getAxisOptions({
      tooltip: {
        formatter: (params: any) => {
          if (this.isArray(params)) {
            const showItem = params.find(x => x.data && x.data.show)
            if (showItem) {
              let result = `${showItem.marker}${showItem.name}:${showItem.value}`
              if (showItem.data && showItem.data.unit) {
                result += showItem.data.unit
              }
              return result
            }
          }
          return ''
        },
        ...tooltip
      },
      xAxis: {
        data: seriesData.map(p => p.name),
        ...(xAxis || {})
      },
      yAxis: {
        type: 'value',
        ...(yAxis || {})
      },
      series: seriesData.map((p, pIndex) => {
        const sData = new Array(seriesData.length).fill({
          show: false,
          value: null
        })
        sData[pIndex] = {
          show: true,
          value: p.value
        }
        return {
          type: 'bar',
          stack: true,
          name: p.name,
          ...(barMaxWidth ? { barMaxWidth } : {}),
          ...(barBorderRadius ? { itemStyle: { barBorderRadius } } : {}),
          data: sData
        }
      }),
      ...others
    })
  }

  /**
   * 获取一个饼图加两个环形图配置
   * @param data 图表数据
   */
  getOnePieTwoRing(data: any = {}) {
    const { legend = {}, tooltip = {}, val, series, ...others } = data
    const seriesData = series || val || []
    return this.getItemOptions({
      legend: {
        show: true,
        selectedMode: false,
        data: ((seriesData[0] || [])).map(d => ({
          name: d.name,
          icon: this.legend.bar
        })),
        ...legend
      },
      tooltip: {
        formatter: (params: any) => {
          return `${params.marker}${params.name}: ${(params.data && params.data.data) || '-'}${(params.data && params.data.unit) || ''}`
        },
        ...tooltip
      },
      series: [
        {
          type: 'pie',
          center: ['50%', '45%'],
          radius: [0, '40%'],
          hoverOffset: 2,
          label: { show: false },
          data: seriesData[0] || [],
        },
        {
          type: 'pie',
          center: ['50%', '45%'],
          radius: ['45%', '55%'],
          hoverOffset: 2,
          label: { show: false },
          data: seriesData[1] || []
        },
        {
          type: 'pie',
          center: ['50%', '45%'],
          radius: ['60%', '70%'],
          hoverOffset: 2,
          label: { show: false },
          data: seriesData[2] || []
        }
      ],
      ...others
    })
  }

  /**
   * 获取百分比饼图
   * @param data 图表数据
   */
  getPercentPie(data: any = {}) {
    const { legend = {}, tooltip = {}, background, title, value, color, ...others } = data
    return this.getItemOptions({
      legend: {
        show: false,
        ...legend
      },
      tooltip: {
        formatter: () => {
          return ''
        },
        ...tooltip
      },
      series: [
        {
          type: 'pie',
          hoverAnimation: false,
          center: ['50%', '56%'],
          radius: ['85%', '100%'],
          startAngle: 210,
          labelLine: { show: false },
          label: { position: 'center' },
          data: [
            {
              value: 100,
              itemStyle: {
                color: background || 'rgba(240, 242, 245, 0.25)'
              },
            },
            {
              value: 50,
              label: {
                ...this.label.arrow,
                formatter: () => (title || ''),
                position: 'inside',
                padding: [-55, 0, 0, 0],
                textStyle: {
                  fontSize: 12,
                  color: '#A6D2FF'
                },
                lineHeight: 16,
              },
              itemStyle: {
                color: 'transparent'
              },
            }
          ]
        },
        {
          type: 'pie',
          hoverAnimation: false,
          center: ['50%', '56%'],
          radius: ['85%', '100%'],
          startAngle: 210,
          labelLine: { show: false },
          label: { position: 'center' },
          data: [
            {
              value: value || 0,
              itemStyle: {
                color: color || 'rgba(24, 144, 255, 0.85)'
              },
              label: {
                formatter: '{c}%',
                position: 'center',
                textStyle: {
                  fontSize: 24,
                  color: '#A6D2FF'
                }
              },
            },
            {
              value: (100 - (value || 0)) + 50,
              itemStyle: {
                color: 'transparent'
              },
            }
          ]
        },
      ],
      ...others
    })
  }

}
