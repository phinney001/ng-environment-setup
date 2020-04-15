import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core'
import { GaodeMapService } from './gaode-map.service'
import { Subject } from 'rxjs'

export declare const AMap

@Component({
  selector: 'app-gaode-map',
  template: '<div #mapEle class="map-container"></div>',
  styles: [
    `.map-container {
      width: 100%;
      height: 100%;
    }`
  ],
})
export class GaodeMapComponent {
  // 地图容器元素
  @ViewChild('mapEle', { static: false }) mapEle
  // 地图实例
  public map: any = {}
  // 地图加载订阅
  public load = new Subject()

  constructor(
    private mapService: GaodeMapService
  ) {
    this.instance()
  }

  // 地图配置
  @Input() config: any = {}

  /**
   * 标准图层
   * @param arg 参数
   */
  public layer(...arg) {
    return new AMap.TileLayer(...arg)
  }

  /**
   * 卫星图层
   * @param arg 参数
   */
  public satellite(...arg) {
    return new AMap.TileLayer.Satellite(...arg)
  }

  /**
   * 路网图层
   * @param arg 参数
   */
  public roadNet(...arg) {
    return new AMap.TileLayer.RoadNet(...arg)
  }

  /**
   * 实时交通图层
   * @param arg 参数
   */
  public traffic(...arg) {
    return new AMap.TileLayer.Traffic(...arg)
  }

  /**
   * 楼块图层
   * @param arg 参数
   */
  public buildings(...arg) {
    return new AMap.TileLayer.Buildings(...arg)
  }

  /**
   * 室内图层
   * @param arg 参数
   */
  public indoorMap(...arg) {
    return new AMap.IndoorMap(...arg)
  }


  /**
   * 信息窗体
   * @param arg 参数
   */
  public infoWindow(...arg) {
    return new AMap.InfoWindow(...arg)
  }

  /**
   * 高级信息窗体
   * @param arg 参数
   */
  public advancedInfoWindow(...arg) {
    return new AMap.AdvancedInfoWindow(...arg)
  }

  /**
   * 右键菜单
   * @param arg 参数
   */
  public contextMenu(...arg) {
    return new AMap.ContextMenu(...arg)
  }

  /**
   * 点标记
   * @param arg 参数
   */
  public marker(...arg) {
    return new AMap.Marker(...arg)
  }

  /**
   * 海量点标记
   * @param arg 参数
   */
  public massMarks(...arg) {
    return new AMap.MassMarks(...arg)
  }

  /**
   * 点聚合标记
   * @param arg 参数
   */
  public markerClusterer(...arg) {
    return new AMap.MarkerClusterer(...arg)
  }

  /**
   * 矢量图形
   * @param arg 参数
   */
  public polyline(...arg) {
    return new AMap.Polyline(...arg)
  }

  /**
   * 多边形
   * @param arg 参数
   */
  public polygon(...arg) {
    return new AMap.Polygon(...arg)
  }

  /**
   * 圆形
   * @param arg 参数
   */
  public circle(...arg) {
    return new AMap.Circle(...arg)
  }

  /**
   * 矩形
   * @param arg 参数
   */
  public rectangle(...arg) {
    return new AMap.Rectangle(...arg)
  }

  /**
   * 椭圆形
   * @param arg 参数
   */
  public ellipse(...arg) {
    return new AMap.Ellipse(...arg)
  }

  /**
   * 贝赛尔曲线
   * @param arg 参数
   */
  public bezierCurve(...arg) {
    return new AMap.BezierCurve(...arg)
  }

  /**
   * 经纬度
   * @param arg 参数
   */
  public lngLat(...arg) {
    return new AMap.LngLat(...arg)
  }

  /**
   * 鼠标工具
   * @param arg 参数
   */
  public mouseTool(...arg) {
    return new AMap.MouseTool(...arg)
  }

  /**
   * 矢量图形编辑工具
   * @param arg 参数
   */
  public polyEditor(...arg) {
    return new AMap.PolyEditor(...arg)
  }

  /**
   * 覆盖物群组
   * @param arg 参数
   */
  public overlayGroup(...arg) {
    return new AMap.OverlayGroup(...arg)
  }

  /**
   * 像素
   * @param arg 参数
   */
  public pixel(...arg) {
    return new AMap.Pixel(...arg)
  }

  /**
   * 大小
   * @param arg 参数
   */
  public size(...arg) {
    return new AMap.Size(...arg)
  }

  /**
   * 地图搜索
   * @param arg 参数
   */
  public districtSearch(...arg) {
    console.log(AMap)
    return new AMap.DistrictSearch(...arg)
  }

  /**
   * 地图行政省区
   * @param arg 参数
   */
  public province(...arg) {
    console.log(AMap)
    return new AMap.DistrictLayer.Province(...arg)
  }

  /**
   * 地图实例创建
   */
  public instance() {
    this.mapService.load(() => {
      this.map = new AMap.Map(this.mapEle.nativeElement, this.config)
      this.load.next(this.map)
    })
  }

}
