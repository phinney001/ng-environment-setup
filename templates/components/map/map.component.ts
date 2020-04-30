import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as echarts from 'echarts'
import { ChartService } from '@app/core/chart.service';
import { HttpService } from '@app/core/http.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(
    public chart: ChartService,
    public http: HttpService,
  ) { }

  // 地图配置
  public options: any = {}

  // 标记数据
  public data: any = {
    // 城市编码
    code: 150000,
    // 热力图
    hot: {},
    // 线路图
    line: {},
    // 线路点标记
    point: {},
    // 图标标记
    market: {},
    // 柱状标记
    bar: {},
    // geo配置
    geo: null,
    // regions配置
    regions: null,
    // 提示框配置
    tooltip: null,
    // 地图颜色列表
    colorList: []
  }

  // 图形标记
  public symbol = {
    wind: 'image:///assets/img/wind.svg',
    fire: 'image:///assets/img/fire.svg',
    water: 'image:///assets/img/water.svg',
    light: 'image:///assets/img/light.svg',
    electricity: 'image:///assets/img/electricity.svg'
  }

  // 图表加载完毕
  public chartFinished = new Subject()

  // 地图数据配置
  @Input()
  set config(data: any) {
    if (data) {
      this.data = data
      this.getGeoJson(data.code || 150000)
    }
  }
  get config(): any {
    return this.data
  }

  // 是否有背景
  @Input() hasBackground = true

  // 改变城市
  @Output() cityChange = new EventEmitter<any>()

  /**
   * 图表初始化
   * @param instance 图表实例
   */
  chartInit(instance: any) {
    instance.on('finished', () => {
      this.chartFinished.next(instance)
    })
  }
  /**
   * 地图点击事件
   * @param params 当前标记点数据
   */
  chartClick(params: any) {
    const { data } = params
    if (data && data.code && data.level === 'city') {
      this.cityChange.emit(data.code)
    }
  }

  /**
   * 设置基础地图配置
   * @param cityCode 城市编码
   * @param features 当前地图子级数据
   * @param base 基础地图配置
   */
  setBaseOptions(cityCode: number | string, features: any[] = [], base: any = {}) {
    const { tooltip = {}, geo, regions, colorList, ...others } = this.getObjectData(base)
    const colors = (this.isArray(colorList) && colorList.length) ? colorList
    : ['#5AD7FF', '#17DCE4', '#17DCE4', '#618AFF', '#10C5FF', '#93E5FF', '#10C5FF', '#6077DB', '#58FEFE', '#58FEFE', '#10C5FF', '#17DCE4']

    return {
      tooltip: {
        trigger: 'item',
        ...tooltip
      },
      geo: {
        map: cityCode,
        scaleLimit: {
          min: 1.2,
          max: 1.2
        },
        label: {
          color: '#333',
        },
        emphasis: {
          label: {
            color: '#333',
          }
        },
        regions: this.isArray(features) ? features.map((x, xIndex) => ({
          name: x.properties && x.properties.name,
          label: {
            show: true,
            color: '#fff'
          },
          itemStyle: {
            color: colors[xIndex % colors.length]
          },
          emphasis: {
            label: {
              color: '#fff'
            },
            itemStyle: {
              color: '#ffe364'
            }
          },
          ...regions
        })) : [],
        ...geo
      },
      series: [],
      ...others
    }
  }

  /**
   * 设置热力图配置
   * @param options 当前配置
   * @param features 当前地图子级数据
   * @param hot 热力图配置
   */
  setHotOptions(options: any = {}, features: any[] = [], hot: any = {}) {
    const { data, visualMap = {}, unit = '' } = this.getObjectData(hot)
    if (this.isArray(data) && this.isArray(features)) {
      const values = data.map(x => x.value)
      const min = Math.min(...values)
      const max = Math.max(...values)

      options.visualMap = {
        seriesIndex: 0,
        bottom: 100,
        right: 30,
        hoverLink: false,
        textStyle: {
          color: '#A7D3FF'
        },
        inRange: {
          color: ['#945EFF', '#10C5FF', '#58FEFE']
        },
        min,
        max,
        text: [min + unit, max + unit],
        ...visualMap
      }

      options.series.push({
        type: 'map',
        geoIndex: 0,
        data: features.map((x) => {
          const properties = x.properties || {}
          const find = data.find(f => f.name === properties.name) || {}
          return {
            ...find,
            name: properties.name,
            code: properties.adcode,
            level: properties.level,
            value: find.value || 0
          }
        })
      })
    }
    return options
  }

  /**
   * 设置线路图配置
   * @param options 当前配置
   * @param line 线路图配置
   */
  setLineOptions(options: any = {}, line: any = {}) {
    const { data, legend = {}, color = [] } = this.getObjectData(line)
    if (this.isArray(data)) {
      options.legend = {
        data: data.map((d, dIndex) => ({
          name: d.name,
          itemStyle: {
            color: color[dIndex % color.length]
          }
        })),
        icon: 'circle',
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 10,
        bottom: 20,
        right: 30,
        width: 50,
        orient: 'vertical',
        textStyle: {
          fontSize: 12,
          padding: [3, 0, 0, 3],
          color: '#A7D3FF'
        },
        ...legend
      }

      options.series.push(...data.map((d, dIndex) => ({
        type: 'lines',
        coordinateSystem: 'geo',
        zlevel: 2,
        effect: {
          show: true,
          constantSpeed: 30,
          symbol: 'arrow',
          color: '#fff',
          symbolSize: 6,
          trailLength: 0,
        },
        lineStyle: {
          width: 2,
          opacity: 1,
          curveness: 0.2,
          color: color[dIndex % color.length]
        },
        ...d,
      })))
    }
    return options
  }
  /**
   * 设置线路图点标记配置
   * @param options 当前配置
   * @param point 线路图点标记配置
   */
  setPointOptions(options: any = {}, point: any = {}) {
    const { data, series = {} } = this.getObjectData(point)
    if (this.isArray(data)) {
      options.series.push({
        name: '地点',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbolSize: 10,
        data,
        ...series
      })
    }
    return options
  }

  /**
   * 设置图标标记配置
   * @param options 当前配置
   * @param market 图标标记配置
   */
  setMarketOptions(options: any = {}, market: any= {}) {
    const { data, series = {} } = this.getObjectData(market)
    if (this.isArray(data)) {
      options.series.push({
        name: '图标标记',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbolSize: 20,
        data: data.map(d => ({
          ...d,
          ...(d.symbol ? { symbol: this.symbol[d.symbol] || d.symbol } : {})
        })),
        ...series
      })
    }
    return options
  }

  /**
   * 设置柱状图标记配置
   * @param bar 柱状图标记配置
   */
  setBarOptions(bar: any= {}): void {
    const { data, scale = 0.16, grid = {}, xAxis = {}, yAxis = {}, series = {} } = this.getObjectData(bar)
    if (this.isArray(data)) {
      this.chartFinished.subscribe((chartInstance: any) => {
        const options = chartInstance.getOption()
        options.grid = []
        options.yAxis = []
        options.xAxis = []
        data.map((m, mIndex) => {
          const pixel = chartInstance.convertToPixel('geo', m.value)
          const height = Math.floor(m.data * scale)
          options.grid.push({
            width: 14,
            height,
            left: pixel[0],
            top: pixel[1] - height,
            ...grid
          })
          options.yAxis.push({
            type: 'value',
            show: false,
            gridIndex: mIndex,
            ...yAxis
          })
          options.xAxis.push({
            type: 'value',
            show: false,
            gridIndex: mIndex,
            ...xAxis
          })
          options.series.push({
            data: [m.data],
            type: 'bar',
            barWidth: 14,
            zlevel: 5,
            xAxisIndex: mIndex,
            yAxisIndex: mIndex,
            label: {
              show: true,
              position: 'top',
              color: '#fff',
              fontSize: 16,
              fontWeight: 500
            },
            itemStyle: {
              color: '#FA8E01',
              barBorderRadius: 10
            },
            ...series
          })
        })
        chartInstance.setOption(options)
        chartInstance.off('finished')
      })
    }
  }

  /**
   * 获取城市geo数据
   * @param cityCode 城市名称
   */
  getGeoJson(cityCode: number) {
    this.http.get(`${location.origin}/assets/${cityCode}.json`)
      .subscribe((res: any) => {
        if (res) {
          echarts.registerMap(cityCode, res)
          const { hot, line, point, market, bar, ...others } = this.data

          // 设置基础地图配置
          let options = this.setBaseOptions(cityCode, res.features, others)

          // 设置热力图配置
          options = this.setHotOptions(options, res.features, hot)

          // 设置线路图配置
          options = this.setLineOptions(options, line)
          // 设置线路图点标记配置
          options = this.setPointOptions(options, point)

          // 设置图标标记配置
          options = this.setMarketOptions(options, market)

          // 设置柱状图标记配置
          this.setBarOptions(bar)

          this.options = { ...options }
        }
      })
  }

  /**
   * 判断是否是数组
   * @param data 数据
   */
  isArray(data: any): boolean {
    return data instanceof Array
  }

  /**
   * 获取对象数据
   * @param data 数据
   */
  getObjectData(data: any) {
    if (this.isArray(data)) {
      return { data }
    }
    return data
  }

  /**
   * 初始化
   */
  ngOnInit() {
  }

}
