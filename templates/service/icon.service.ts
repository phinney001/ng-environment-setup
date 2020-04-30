import { Injectable } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(
    private iconService: NzIconService
  ) { }

  // 扩展图标列表
  iconList = [
    {
      name: 'declare',
      // tslint:disable-next-line
      svg: `<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>编组</title><desc>Created with Sketch.</desc><defs><filter x="-34.5%" y="-6.4%" width="169.0%" height="112.8%" filterUnits="objectBoundingBox" id="filter-1"><feOffset dx="7" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="14.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 1 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix><feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs><g id="3调度端" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="日前市场申报1.1、1.2" transform="translate(-24.000000, -83.000000)" fill-rule="nonzero"><g id="侧栏" filter="url(#filter-1)"><g id="编组-5" transform="translate(24.000000, 80.000000)"><g id="数据" transform="translate(0.000000, 3.000000)"><g id="编组"><rect id="矩形" fill="#000000" opacity="0" x="0" y="0" width="16" height="16"></rect><path d="M14.8333333,14.3333333 L2.5,14.3333333 C2.22385763,14.3333333 2,14.1094757 2,13.8333333 L2,1.5 C2,1.22385763 2.22385763,1 2.5,1 C2.77614237,1 3,1.22385763 3,1.5 L3,13.3333333 L14.8333333,13.3333333 C15.1094757,13.3333333 15.3333333,13.557191 15.3333333,13.8333333 C15.3333333,14.1094757 15.1094757,14.3333333 14.8333333,14.3333333 Z M14,12.6666667 L13,12.6666667 C12.6318102,12.6666667 12.3333333,12.3681898 12.3333333,12 L12.3333333,4.66666667 C12.3333333,4.29847684 12.6318102,4 13,4 L14,4 C14.3681898,4 14.6666667,4.29847684 14.6666667,4.66666667 L14.6666667,12 C14.6666667,12.3681898 14.3681898,12.6666667 14,12.6666667 L14,12.6666667 Z M10,12.6666667 L9,12.6666667 C8.63181017,12.6666667 8.33333334,12.3681898 8.33333334,12 L8.33333334,6 C8.33333334,5.63181018 8.63181018,5.33333334 9,5.33333334 L10,5.33333334 C10.3681898,5.33333334 10.6666667,5.63181017 10.6666667,6 L10.6666667,12 C10.6666667,12.3681898 10.3681898,12.6666667 10,12.6666667 L10,12.6666667 Z M6,12.6666667 L5,12.6666667 C4.63181017,12.6666667 4.33333334,12.3681898 4.33333334,12 L4.33333334,3.33333334 C4.33333334,2.96514351 4.63181017,2.66666667 5,2.66666667 L6,2.66666667 C6.17681099,2.66666667 6.34638027,2.73690457 6.47140452,2.86192882 C6.59642878,2.98695307 6.66666667,3.15652235 6.66666667,3.33333334 L6.66666667,12 C6.66666667,12.3681898 6.36818984,12.6666667 6,12.6666667 L6,12.6666667 Z" id="形状" fill="currentColor"></path></g></g></g></g></g></g></svg>`
    },
  ]

  /**
   * 初始化图标
   */
  init() {
    this.iconList.forEach(icon => {
      this.iconService.addIconLiteral('icon:' + icon.name, icon.svg)
    })
  }
}
