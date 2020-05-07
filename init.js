const fs = require('fs')
const path = require('path')
const { prompt } = require('inquirer')
const { yellow, green } = require('ansi-colors')
const Router = require('./router.js')
const Common = require('./common.js')

class AngularCli extends Common {

  constructor() {
    super()

    // angular.json改写列表
    this.angularJsonRewriteList = {
      replaceList: [],
      matchList: [],
      importList: []
    }

    // 共享模块改写列表
    this.sharedModuleRewriteList = {
      replaceList: [],
      matchList: [],
      importList: []
    }

    // 主模块改写列表
    this.appModuleRewriteList = {
      replaceList: [],
      matchList: [],
      importList: []
    }

    // 路由模块改写列表
    this.routesModuleRewriteList = {
      replaceList: [],
      matchList: [],
      importList: []
    }

    // 命令问题列表
    this.promptList = [
      {
        name: 'project-name',
        type: 'input',
        message: '请输入项目名称：'
      },
      {
        name: 'library-select',
        type: 'list',
        message: '请选择需要安装的第三方：',
        choices: [
          { name: '全部', value: 'both' },
          { name: 'ngx-echarts', value: 'echart' },
          { name: 'ng-zorro-antd', value: 'antd' }
        ]
      },
      {
        name: 'library-select',
        type: 'list',
        message: '请选择需要使用的服务：',
        choices: [
          { name: '全部', value: 'both' },
          { name: '请求拦截器', value: 'ajax' },
          { name: '词典服务', value: 'dict' },
          { name: '路由守卫', value: 'guard' }
        ]
      },
    ]
  }

  /**
   * 更新pageckage文件
   */
  updatePackage() {
    this.rewriteFile('./package.json', {
      replaceList: [
        { before: 'ng serve', after: 'ng serve --open' },
        { before: 'ng build', after: 'ng build --prod --build-optimizer' }
      ]
    })
  }

  /**
   * 更新tslint文件
   */
  updateTsLint() {
    this.rewriteFile('./tslint.json', {
      matchList: [
        { match: '"rules": {|}', item: `"semicolon": false`, space: 2 }
      ]
    })
  }

  /**
   * 更新tsconfig文件
   */
  updateTsConfig() {
    this.rewriteFile('./tsconfig.json', {
      matchList: [
        {
          match: '"compilerOptions": {|}',
          item: `"paths": {
      "@app/*": [
        "src/app/*"
      ],
      "@assets/*": [
        "src/assets/*"
      ],
      "@environments/*": [
        "src/environments/*"
      ]
    }`,
          space: 2
        }
      ]
    })
  }

  /**
   * 更新environment文件
   */
  updateEnvironments() {
    this.rewriteFile('./src/environments/environment.ts', {
      matchList: [
        { match: 'export const environment = {|}', item: `apiurl: ''` }
      ]
    })
    this.rewriteFile('./src/environments/environment.prod.ts', {
      matchList: [
        { match: 'export const environment = {|}', item: `apiurl: ''` }
      ]
    })
  }

  /**
   * 创建样式常量文件
   */
  createConstantsStyle() {
    this.generateFile('./src/constants.scss', this.getTemplate('/style/constants.scss'))
    this.generateFile('./src/theme.less', this.getTemplate('/style/theme.less'))
  }

  /**
   * 更新公共样式文件
   */
  updateStyles() {
    this.rewriteFile('./src/styles.scss', {
      replaceList: [
        {
          before: `/* You can add global styles to this file, and also import other style files */`,
          after: this.getTemplate('/style/styles.scss')
        }
      ]
    })
  }

  /**
   * 创建存储服务文件
   */
  createStorageService() {
    this.generateFile('./src/app/core/storage.service.ts', this.getTemplate('/service/storage.service.ts'))
  }

  /**
   * 创建用户服务文件
   */
  createUserService() {
    this.generateFile('./src/app/core/user.service.ts', this.getTemplate('/service/user.service.ts'))
  }

  /**
   * 创建路由守卫文件
   */
  createRouterGuard() {
    this.generateFile('./src/app/core/router.guard.ts', this.getTemplate('/service/router.guard.ts'))
    this.routesModuleRewriteList.importList.push(`import { RouterGuardProvider } from '@app/core/router.guard'`)
  }

  /**
   * 创建请求服务文件
   */
  createHttpService() {
    this.generateFile('./src/app/core/http.service.ts', this.getTemplate('/service/http.service.ts'))
  }

  /**
   * 创建词典服务文件
   */
  createDictService() {
    this.generateFile('./src/app/core/dict.service.ts', this.getTemplate('/service/dict.service.ts'))
  }

  /**
   * 创建公共布局组件
   */
  createLayoutComponent() {
    const fileTemplatePath = './templates/layout'
    const filePath = './src/app/layout'
    this.copyDir(fileTemplatePath, filePath)
    this.downloadImage('https://s2.ax1x.com/2019/09/24/ukuYDg.png', './src/assets/img/logo.png')
    this.sharedModuleRewriteList.importList.push(`import { HeaderComponent } from '@app/layout/header/header.component'`)
    this.sharedModuleRewriteList.matchList.push({
      match: 'const LAYOUT = [|]',
      item: 'HeaderComponent'
    })

    this.sharedModuleRewriteList.importList.push(`import { FooterComponent } from '@app/layout/footer/footer.component'`)
    this.sharedModuleRewriteList.matchList.push({
      match: 'const LAYOUT = [|]',
      item: 'FooterComponent'
    })

    this.sharedModuleRewriteList.importList.push(`import { SidebarComponent } from '@app/layout/sidebar/sidebar.component'`)
    this.sharedModuleRewriteList.matchList.push({
      match: 'const LAYOUT = [|]',
      item: 'SidebarComponent'
    })

    this.sharedModuleRewriteList.importList.push(`import { BreadcrumbComponent } from '@app/layout/breadcrumb/breadcrumb.component'`)
    this.sharedModuleRewriteList.matchList.push({
      match: 'const LAYOUT = [|]',
      item: 'BreadcrumbComponent'
    })

    this.routesModuleRewriteList.importList.push(`import { LayoutComponent } from '@app/layout/layout.component'`)
    this.routesModuleRewriteList.matchList.push({
      match: 'declarations: [|]',
      item: 'LayoutComponent',
      space: 2
    })
  }

  /**
   * 创建公共组件tabs
   */
  createTabsComponent() {
    const fileTemplatePath = './templates/components/tabs'
    const filePath = './src/app/components/tabs'
    this.copyDir(fileTemplatePath, filePath)

    this.sharedModuleRewriteList.importList.push(`import { TabsComponent } from '@app/components/tabs/tabs.component'`)
    this.sharedModuleRewriteList.matchList.push({
      match: 'const COMPONENTS = [|]',
      item: 'TabsComponent'
    })
  }

  /**
   * 创建公共组件table
   */
  createTableComponent() {
    const fileTemplatePath = './templates/components/table'
    const filePath = './src/app/components/table'
    this.copyDir(fileTemplatePath, filePath)

    this.sharedModuleRewriteList.importList.push(`import { TableComponent } from '@app/components/table/table.component'`)
    this.sharedModuleRewriteList.matchList.push({
      match: 'const COMPONENTS = [|]',
      item: 'TableComponent'
    })
  }

  /**
   * 创建公共组件滚动table
   */
  createScrollTableComponent() {
    const fileTemplatePath = './templates/components/scroll-table'
    const filePath = './src/app/components/scroll-table'
    this.copyDir(fileTemplatePath, filePath)

    this.sharedModuleRewriteList.importList.push(`import { ScrollTableComponent } from '@app/components/scroll-table/scroll-table.component'`)
    this.sharedModuleRewriteList.matchList.push({
      match: 'const COMPONENTS = [|]',
      item: 'ScrollTableComponent'
    })
  }

  /**
   * 创建公共组件echarts地图
   */
  createMapComponent() {
    const fileTemplatePath = './templates/components/map'
    const filePath = './src/app/components/map'
    this.copyDir(fileTemplatePath, filePath)

    this.sharedModuleRewriteList.importList.push(`import { MapComponent } from '@app/components/map/map.component'`)
    this.sharedModuleRewriteList.matchList.push({
      match: 'const COMPONENTS = [|]',
      item: 'MapComponent'
    })
  }

  /**
   * 创建公共组件动态表单
   */
  createFormComponent() {
    const fileTemplatePath = './templates/components/form'
    const filePath = './src/app/components/form'
    this.copyDir(fileTemplatePath, filePath)

    this.sharedModuleRewriteList.importList.push(`import { FormComponent } from '@app/components/form/form.component'`)
    this.sharedModuleRewriteList.matchList.push({
      match: 'const COMPONENTS = [|]',
      item: 'FormComponent'
    })
  }

  /**
   * 安装百度地图模块包
   */
  installBaiduMap() {
    console.log(green('angular2-baidu-map installing. . .'))
    this.execCommand('npm install angular2-baidu-map --save', () => {
      console.log(green('angular2-baidu-map installation completed.'))
      this.sharedModuleRewriteList.importList.push(`import { BaiduMapModule } from 'angular2-baidu-map'`)
      this.sharedModuleRewriteList.matchList.push({
        match: 'const THIRDMODULES = [|]',
        item: `BaiduMapModule.forRoot({ ak: 'Pyz2EgtaC87DOcCIZ0tDrcBNsWpFqcdm' })`
      })
    })
  }

  /**
   * 创建公共组件百度地图
   */
  createBaiduMapComponent() {
    const fileTemplatePath = './templates/components/baidu-map'
    const filePath = './src/app/components/baidu-map'
    this.copyDir(fileTemplatePath, filePath)

    this.sharedModuleRewriteList.importList.push(`import { BaiduMapComponent } from '@app/components/baidu-map/baidu-map.component'`)
    this.sharedModuleRewriteList.matchList.push({
      match: 'const COMPONENTS = [|]',
      item: 'BaiduMapComponent'
    })
  }

  /**
   * 创建公共组件高德地图
   */
  createGaodeMapComponent() {
    const fileTemplatePath = './templates/components/gaode-map'
    const filePath = './src/app/components/gaode-map'
    this.copyDir(fileTemplatePath, filePath)

    this.sharedModuleRewriteList.importList.push(`import { GaodeMapModule } from '@app/components/gaode-map/gaode-map.module'`)
    this.sharedModuleRewriteList.matchList.push({
      match: 'imports: [|]',
      item: `GaodeMapModule.forRoot({ ak: '491f5fbbd39fd1b918024f41e332c9a8' })`,
      space: 2
    })
  }

  /**
   * 创建主页组件
   */
  createHomeComponent() {
    const fileTemplatePath = './templates/routes/home'
    const filePath = './src/app/routes/home'
    this.copyDir(fileTemplatePath, filePath)

    this.routesModuleRewriteList.importList.push(`import { HomeComponent } from '@app/routes/home/home.component'`)
    this.routesModuleRewriteList.matchList.push(
      {
        match: 'declarations: [|]',
        item: 'HomeComponent',
        space: 2
      },
      {
        match: 'const routes: Routes = [|]',
        item: `{
    path: '',
    component: LayoutComponent,
    canActivate: [RouterGuardProvider],
    canActivateChild: [RouterGuardProvider],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, data: { title: '首页' } }
    ]
  }`
      }
    )
  }

  /**
   * 创建登录组件
   */
  createLoginComponent() {
    const fileTemplatePath = './templates/routes/login'
    const filePath = './src/app/routes/login'
    this.copyDir(fileTemplatePath, filePath)

    this.downloadImage('https://s2.ax1x.com/2019/09/24/ukuuEd.jpg', './src/assets/img/login_bg.png')
    this.routesModuleRewriteList.importList.push(`import { LoginComponent } from '@app/routes/login/login.component'`)
    this.routesModuleRewriteList.matchList.push(
      {
        match: 'declarations: [|]',
        item: 'LoginComponent',
        space: 2
      },
      {
        match: 'const routes: Routes = [|]',
        item: `{ path: 'login', component: LoginComponent, data: { title: '登录' } }`
      }
    )
  }

  /**
   * 创建共享模块
   */
  createSharedModule() {
    this.generateFile('./src/app/shared.module.ts', this.getTemplate('/modules/shared.module.ts'))
    this.routesModuleRewriteList.importList.push(`import { SharedModule } from '@app/shared.module'`)
    this.routesModuleRewriteList.matchList.push({
      match: 'imports: [|]',
      item: 'SharedModule',
      space: 2
    })
  }

  /**
   * 创建路由模块
   */
  createRoutesModule() {
    this.generateFile('./src/app/routes/routes.module.ts', this.getTemplate('/modules/routes.module.ts'))
  }

  /**
   * 安装echarts模块包
   */
  installEcharts() {
    console.log(green('echarts installing. . .'))
    this.execCommand('npm install echarts ngx-echarts --save', () => {
      console.log(green('echarts installation completed.'))
      this.sharedModuleRewriteList.importList.push(`import { NgxEchartsModule } from 'ngx-echarts'`)
      this.sharedModuleRewriteList.matchList.push({
        match: 'const THIRDMODULES = [|]',
        item: `NgxEchartsModule`
      })
    })
  }

  /**
   * 创建图表服务文件
   */
  createChartService() {
    this.generateFile('./src/app/core/chart.service.ts', this.getTemplate('/service/chart.service.ts'))
  }

  /**
   * 安装ng-zorro-antd模块包
   */
  installNgZorroAntd() {
    console.log(green('ng-zorro-antd installing. . .'))
    this.execCommand('npm install ng-zorro-antd --save', () => {
      console.log(green('ng-zorro-antd installation completed.'))
      this.sharedModuleRewriteList.importList.push(`import { NgZorroAntdModule } from 'ng-zorro-antd'`)
      this.sharedModuleRewriteList.matchList.push({
        match: 'const THIRDMODULES = [|]',
        item: `NgZorroAntdModule`
      })
      this.appModuleRewriteList.importList.push(
        `
// 配置 angular i18n
import { NZ_I18N, zh_CN } from 'ng-zorro-antd'
import { registerLocaleData } from '@angular/common'
import zh from '@angular/common/locales/zh'
registerLocaleData(zh)\n`
      )
      this.appModuleRewriteList.matchList.push(
        {
          match: 'providers: [|]',
          item: `{ provide: NZ_I18N, useValue: zh_CN }`,
          space: 2
        }
      )
      this.angularJsonRewriteList.matchList.push(
        {
          match: '"styles": [|]',
          item: `"src/theme.less"`,
          space: 12
        },
        {
          match: '"assets": [|]',
          item: `{
                "glob": "**/*",
                "input": "./node_modules/@ant-design/icons-angular/src/inline-svg/",
                "output": "/assets/"
              }`,
          space: 12
        }
      )
    })
  }

  /**
   * 创建拦截器文件
   */
  createAjaxInterceptor() {
    this.generateFile('./src/app/core/ajax.interceptor.ts', this.getTemplate('/service/ajax.interceptor.ts'))
    this.appModuleRewriteList.importList.push(
      `
// 请求拦截器
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AjaxInterceptor } from '@app/core/ajax.interceptor'`
    )
    this.appModuleRewriteList.matchList.push(
      {
        match: 'providers: [|]',
        item: `{ provide: HTTP_INTERCEPTORS, useClass: AjaxInterceptor, multi: true }`,
        space: 2
      },
      {
        match: 'imports: [|]',
        item: `HttpClientModule`,
        space: 2
      }
    )
  }

  /**
   * 更新主组件
   */
  updateAppComponent() {
    const removeList = [
      './src/app/app.component.html',
      './src/app/app.component.scss',
      './src/app/app.component.spec.ts',
      './src/app/app-routing.module.ts'
    ]
    removeList.forEach(filePath => {
      filePath = path.join(this.projectPath, filePath)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    })
    this.rewriteFile('./src/app/app.component.ts', {
      replaceList: [
        {
          before: `templateUrl: './app.component.html',\n  styleUrls: ['./app.component.scss']`,
          after: `template: '<router-outlet></router-outlet>'`
        }
      ]
    })
    this.appModuleRewriteList.replaceList.push(
      {
        before: 'AppRoutingModule',
        after: 'RoutesModule',
        all: true
      },
      {
        before: `'./app-routing.module';`,
        after: `'@app/routes/routes.module'`,
        all: true
      }
    )
  }

  /**
   * 更新angular.json
   */
  updateAngularJson() {
    this.angularJsonRewriteList.matchList.push({
      match: '"schematics": {|}',
      item: `"@schematics/angular:component": {
          "style": "scss",
          "spec": false,
          "flat": false,
          "inlineStyle": false,
          "inlineTemplate": false
        },
        "@schematics/angular:module": {
          "routing": false,
          "spec": false
        },
        "@schematics/angular:pipe": {
          "spec": false
        },
        "@schematics/angular:directive": {
          "spec": false
        },
        "@schematics/angular:guard": {
          "spec": false
        },
        "@schematics/angular:service": {
          "spec": false
        }`,
      space: 6,
      cover: true
    })
    this.angularJsonRewriteList.replaceList.push({
      before: `"newProjectRoot": "projects",`,
      after: `"newProjectRoot": "projects",
  "cli": {
    "analytics": false
  },`
    })
    this.rewriteFile('./angular.json', this.angularJsonRewriteList)
  }

  /**
   * 更新路由模块
   * @param isNotFirst 是否是第一次更新
   */
  updateRoutesModule(isNotFirst) {
    if (!isNotFirst) {
      this.routesModuleRewriteList.matchList.push({
        match: 'const routes: Routes = [|]',
        item: `{ path: '**', redirectTo: 'home' }`
      })
    }
    this.rewriteFile('./src/app/routes/routes.module.ts', this.routesModuleRewriteList)
  }

  /**
   * 更新主模块
   */
  updateAppModule() {
    this.appModuleRewriteList.importList.unshift(`import { BrowserAnimationsModule } from '@angular/platform-browser/animations'`)
    this.appModuleRewriteList.matchList.unshift({
      match: 'imports: [|]',
      item: 'BrowserAnimationsModule',
      space: 2
    })
    this.downloadImage('https://s2.ax1x.com/2019/09/24/ukuYDg.png', './src/favicon.ico')
    this.rewriteFile('./src/app/app.module.ts', this.appModuleRewriteList)
  }

  /**
   * 更新共享模块
   */
  updateSharedModule() {
    this.rewriteFile('./src/app/shared.module.ts', this.sharedModuleRewriteList)
  }

  /**
   * 初始化
   * @param projectPath 项目路径
   */
  init(projectPath) {
    this.projectPath = projectPath
    // 配置
    this.updatePackage()
    this.updateTsLint()
    this.updateTsConfig()
    this.updateEnvironments()
    // 样式
    this.createConstantsStyle()
    this.updateStyles()
    // 服务
    this.createStorageService()
    this.createUserService()
    this.createRouterGuard()
    this.createHttpService()
    this.createDictService()
    // 公共布局组件
    this.createLayoutComponent()
    // 公共组件
    this.createTabsComponent()
    this.createTableComponent()
    this.createScrollTableComponent()
    this.createMapComponent()
    this.createFormComponent()
    this.createGaodeMapComponent()
    // this.installBaiduMap()
    // this.createBaiduMapComponent()
    // 页面组件
    this.createHomeComponent()
    this.createLoginComponent()
    // 共享模块
    this.createSharedModule()
    // 路由模块
    this.createRoutesModule()
    // echart及服务
    this.installEcharts()
    this.createChartService()
    // ng-zorro-antd
    this.installNgZorroAntd()
    // 拦截器
    this.createAjaxInterceptor()
    // 更新
    this.updateAppComponent()
    // this.updateWebpackExtra()
    this.updateAngularJson()
    this.updateRoutesModule()
    this.updateAppModule()
    this.updateSharedModule()
  }

  /**
   * 获取历史记录文件
   */
  getHistoryFile() {
    const historyPath = path.join(__dirname, 'history.json')
    return require(historyPath)
  }

  /**
   * 该项目是否允许断点续传
   * @param {string} projectName 当前项目名称
   */
  isAllowBreakContinue(projectName) {
    const history = this.getHistoryFile()
    return history[projectName] === 1
  }

  /**
   * 更新历史记录文件
   * @param {string} projectName 当前项目名称
   */
  updateHistoryFile(projectName) {
    const history = this.getHistoryFile()
    history[projectName] = 1
    fs.writeFileSync(path.join(__dirname, 'history.json'), JSON.stringify(history), 'utf-8')
  }

  /**
   * 下一步
   * @param {string} projectName 当前项目名称
   */
  next(projectName) {
    const projectPath = `${process.cwd()}/${projectName}`
    if (fs.existsSync(projectPath) && this.isAllowBreakContinue(projectName)) {
      console.log(yellow(`${projectPath} already exists.`))
      this.init(projectPath)
    } else {
      console.log(green('angular cli running. . .'))
      this.execCommand(`ng new ${projectName} --style=scss --routing`, () => {
        console.log(green('angular cli completed.'))
        this.updateHistoryFile(projectName)
        this.init(projectPath)
      })
    }
  }

  /**
   * 安装环境
   */
  start() {
    let projectName = Array.from(process.argv).slice(2).join(' ')
    if (projectName) {
      if (projectName === 'router') {
        const router = new Router()
        router.start()
      } else {
        this.next(projectName)
      }
    } else {
      prompt(this.promptList).then(answers => {
        projectName = answers['project-name']
        this.next(projectName)
      })
    }
  }
}

const AC = new AngularCli()
AC.start()
