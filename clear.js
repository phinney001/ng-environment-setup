const fs = require('fs')
const path = require('path')

class Clear {
  constructor() {
    // 清除文件路径
    this.clearFilePath = './src/app/routes'
  }

  /**
   * 英文字符串首字母大写
   * @param {*} str 英文字符串 
   * @returns {string}
   */
  getFirstLetterUpper(str) {
    if (typeof str === 'string' && str[0]) {
      return str[0].toUpperCase() + str.substr(1)
    }
    return ''
  }

  /**
   * 处理文件
   * @param {string} filePath 文件路径
   */
  handle(filePath) {
    const fileList = fs.readdirSync(path.join(__dirname, filePath))
    fileList.forEach(file => {
      const currentFilePath = `${filePath}/${file}`
      const stats = fs.statSync(path.join(__dirname, currentFilePath))
      if (stats.isDirectory()) {
        this.handle(currentFilePath)
      }
      if (stats.isFile()) {
        if (file.startsWith('login.component.')) {
          return
        }
        if (file.endsWith('.component.ts')) {
          const fileName = file.replace('.component.ts', '')
          const componentName = fileName.split('-').map(x => this.getFirstLetterUpper(x)).join('')
          fs.writeFileSync(currentFilePath, `import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-${fileName}',
  templateUrl: './${fileName}.component.html',
  styleUrls: ['./${fileName}.component.scss']
})
export class ${componentName}Component implements OnInit {

  constructor() { }

  /**
   * 初始化
   */
  ngOnInit() {
  }

}
`, 'utf-8')
          console.log(`${file} clear success.`)
        }
        if (file.endsWith('.component.scss')) {
          fs.writeFileSync(currentFilePath, '', 'utf-8')
          console.log(`${file} clear success.`)
        }
        if (file.endsWith('.component.html')) {
          const fileName = file.replace('.component.html', '')
          fs.writeFileSync(currentFilePath, `<div>${this.getFirstLetterUpper(fileName)} Works!</div>`, 'utf-8')
          console.log(`${file} clear success.`)
        }
      }
    })
  }

  /**
   * 运行
   */
  start() {
    this.handle(this.clearFilePath)
  }
}

const clear = new Clear
clear.start()
