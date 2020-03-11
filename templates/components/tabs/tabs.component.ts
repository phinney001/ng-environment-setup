import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

/**
 * tab接口
 */
export interface Tab {
  label: string
  value: string | number
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  constructor() { }

  // tab选中项
  tabSelected: string | number;

  // tab列表
  @Input() tabs: Tab[] = []

  // tab切换事件
  @Output() selectedChange = new EventEmitter<string | number>()

  // tab选中项
  @Input()
  set selected(tabSelected: string | number) {
    this.tabSelected = tabSelected
  }
  get selected(): string | number {
    return this.tabSelected
  }

  /**
   * tab切换
   * @param tabSelected tab选中项
   */
  tabChange(tabSelected: string | number): void {
    if (this.tabSelected !== tabSelected) {
      this.tabSelected = tabSelected
      this.selectedChange.emit(tabSelected)
    }
  }

  /**
   * 初始化tab选中项
   */
  ngOnInit(): void {
    if (!this.tabSelected && this.tabs instanceof Array) {
      const tabSelected = this.tabs[0] && this.tabs[0].value
      if (tabSelected) {
        this.tabSelected = tabSelected
        this.selectedChange.emit(tabSelected)
      }
    }
  }

}
