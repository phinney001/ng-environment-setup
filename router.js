const Common = require('./common.js')
const fs = require('fs')
const { red } = require('ansi-colors')

class Router extends Common {

  constructor() {
    super()
  }

  /**
   * 创建空白组件
   * @param {string} filePath 组件路径
   * @param {string} fileName 组件名称
   * @param {string} fileTitle 组件标题
   */
  createBlankComponent(filePath, fileName, fileTitle) {
    const templatePreFixPath = '/routes/templet/templet.component.'
    const preFixPath = `${filePath}/${fileName}/${fileName}.component.`
    const preFixList = ['html', 'scss', 'ts']
    preFixList.forEach(suffix => {
      let templateString = this.getTemplate(templatePreFixPath + suffix)
      templateString = templateString.replace(new RegExp('templet', 'g'), fileName)
      templateString = templateString.replace(new RegExp('Templet-Title', 'g'), fileTitle)
      templateString = templateString.replace(new RegExp('Templet', 'g'), this.getFirstLetterUpper(fileName))
      this.generateFile(preFixPath + suffix, templateString)
    })
  }

  /**
   * 创建空白模块
   * @param {string} filePath 模块路径
   * @param {string} fileName 模块名称
   * @param {string} fileTitle 模块标题
   */
  createBlankModule(filePath, fileName, fileTitle) {
    const templatePath = '/modules/templet.module.ts'
    const fileFullPath = `${filePath}/${fileName}/${fileName}.module.ts`
    let templateString = this.getTemplate(templatePath)
    templateString = templateString.replace(new RegExp('templet', 'g'), fileName)
    templateString = templateString.replace(new RegExp('Templet-Title', 'g'), fileTitle)
    templateString = templateString.replace(new RegExp('Templet', 'g'), this.getFirstLetterUpper(fileName))
    this.generateFile(fileFullPath, templateString)
  }

  /**
   * 添加路由配置
   * @param {string} routePath 路由组件路径
   * @param {string} moduleName 模块名称
   * @param {string} fileName 组件名称
   * @param {string} fileTitle 组件标题
   * @param {string} isModule 是否是模块
   */
  addRouteConfig(routePath, moduleName, fileName, fileTitle, isModule) {
    const upperFileName = this.getFirstLetterUpper(fileName)
    const modulePath = `${routePath}/${moduleName}.module.ts`
    const filePath = routePath.replace('/src/app', '@app')
    const rewriteList = {
      replaceList: [],
      matchList: [],
      importList: []
    }
    rewriteList.replaceList = [
      {
        before: `redirectTo: 'route'`,
        after: `redirectTo: '${fileName}'`
      }  
    ]
    if (isModule) {
      rewriteList.matchList.push(
        {
          match: 'const routes: Routes = [|]',
          item: `{ path: '${fileName}', loadChildren: () => import('./${fileName}/${fileName}.module').then(m => m.${upperFileName}Module), data: { title: '${fileTitle}' } }`
        }
      )
    } else {
      rewriteList.importList.push(`import { ${upperFileName}Component } from '${filePath}/${fileName}/${fileName}.component'`)
      rewriteList.matchList.push(
        {
          match: 'declarations: [|]',
          item: `${upperFileName}Component`,
          space: 2
        },
        {
          match: 'const routes: Routes = [|]',
          item: `{ path: '${fileName}', component: ${upperFileName}Component, data: { title: '${fileTitle}' } }`
        }
      )
    }
    this.rewriteFile(modulePath, rewriteList)
  }

  /**
   * 生成路由
   * @param {string} moduleName 模块名称
   * @param {string} routerList 路由列表
   * @param {string} routePath 路由组件路径
   */
  generateRoute(moduleName, routerList, routePath) {
    routerList.forEach(route => {
      if (route.link && route.link !== '/') {
        const fileName = route.link.split('/').pop()
        this.createBlankComponent(routePath, fileName, route.title)
        this.addRouteConfig(routePath, moduleName, fileName, route.title)
        if (this.isArray(route.children)) {
          this.generateRoute(moduleName, route.children, `${routePath}/${fileName}`)
        }
      } else {
        if (route.name) {
          this.createBlankModule(routePath, route.name, route.title)
          this.addRouteConfig(routePath, moduleName, route.name, route.title, true)
          if (this.isArray(route.children)) {
            this.generateRoute(route.name, route.children, `${routePath}/${route.name}`)
          }
        }
      }
    })
  }

  /**
   * 生成路由命令
   */
  start() {
    const routerPath = `${process.cwd()}/.router`
    if (fs.existsSync(routerPath)) {
      const routerList = require(routerPath)
      const routeBasePath = '/src/app/routes'
      const routesPath = `${process.cwd()}${routeBasePath}/routes.module.ts`
      if (fs.existsSync(routesPath)) {
        this.generateRoute('routes', routerList, routeBasePath)
      } else {
        console.log(red('/src/app/routes/routes.module.ts must exists.'))
      }
    } else {
      console.log(red('.router must exists.'))
    }
  }
}

module.exports = Router
