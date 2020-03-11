import { Component, OnInit } from '@angular/core';
import { MapOptions, MapTypeEnum, Point, MarkerOptions, BMarker, BMapInstance } from 'angular2-baidu-map';

@Component({
  selector: 'app-baidu-map',
  template: `<div style="height: 500px;width: 900px;" >
  <baidu-map #map [options]="opts" >
    <marker
      *ngFor="let marker of markers"
      [point]="marker.point"
      [options]="marker.options"
      (loaded)="setAnimation($event)"></marker>
  </baidu-map>
</div>`
})
export class BaiduMapComponent implements OnInit {
  public opts: MapOptions;
  public markers: Array<{ point: Point; options?: MarkerOptions }>

  constructor() {

    this.opts = {
      // 设置中心点和缩放级别
      centerAndZoom: {
        // 经度
        lng: 111.65,
        // 纬度
        lat: 40.82,
        // 初始化显示缩放级别
        zoom: 11
      },
      enableMapClick: false,
      // 是否启用滚轮进行缩放功能
      enableScrollWheelZoom: true,
      // 设置当前的城市
      currentCity: '内蒙古',
      // 设置地图类型
      mapType: MapTypeEnum.BMAP_HYBRID_MAP
    };

    // 这是地图标记marker
    this.markers = [
      {
        options: {
          title: 'asdkjgaslfkjasd'
        },
        point: {
          lng: 111.65,   // 经度
          lat: 40.82,    // 纬度
        }
      }
    ];
  }

  public setAnimation(marker: any): void {
    marker.addEventListener('mouseover', (e) => {
      marker.openInfoWindow(
        new window.BMap.InfoWindow('地址：浦东南路360号', {
          title: '新上海国际大厦'
        }),
        marker.getPosition()
      )
    });
    marker.addEventListener('mouseout', (e) => {
      marker.closeInfoWindow()
    });
  }

  public showWindow({ marker, map }: { marker: BMarker; map: BMapInstance }): void {
    console.log(11)
    map.openInfoWindow(
      new window.BMap.InfoWindow('地址：浦东南路360号', {
        offset: new window.BMap.Size(0, -30),
        title: '新上海国际大厦'
      }),
      marker.getPosition()
    )
  }

  ngOnInit() {
  }

}
