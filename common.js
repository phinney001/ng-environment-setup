const request = require('request')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const { red, yellow, green } = require('ansi-colors')

class Common {

  constructor() {
    // 项目路径
    this.projectPath = process.cwd()
  }

  /**
   * 判断数据是否是数组
   * @param {*} data
   * @returns {boolean}
   */
  isArray(data) {
    return data instanceof Array
  }

  /**
   * 判断数据是否是字符串
   * @param {*} str
   * @returns {boolean}
   */
  isString(str) {
    return typeof str === 'string'
  }

  /**
   * 执行命令
   * @param {string} command 命令字符串
   * @param {function} callback 回调函数
   */
  execCommand(command, callback) {
    const stdout = execSync(command, { cwd: this.projectPath, encoding: 'utf8', stdio: 'inherit' })
    console.log(green(stdout))
    if (callback) {
      callback()
    }
    // if (error) {
    // 	console.log(red(`ERROR: ${error}`))
    // } else {
    // 	if (stderr) {
    // 		stderr.on('data', (msg) => {
    // 			if (msg.includes('ERR')) {
    // 				console.log(red(msg))
    // 			}
    // 			if (msg.includes('WARN')) {
    // 				console.log(yellow(msg))
    // 			}
    // 		})
    // 	}
    // 	stdout.on('data', (msg) => {
    // 		console.log(green(msg))
    // 	})
    // 	if (callback) {
    // 		callback()
    // 	}
    // }
  }

  /**
   * 改写文件内容
   * @param {string} filePath 文件路径
   * @param {RewriteFileOptions} options 改写配置
   * @RewriteFileOptions {Array} replaceList 字符串替换列表，例：{ before: 'a', after: 'b', all: true }
   * @RewriteFileOptions {Array} matchList 根据前后字符串匹配并添加字符串列表，例：{ match: 'const a = [|]', item: 'bbb', space: 2, cover: true }
   * @RewriteFileOptions {Array} importList 引入模块字符串列表 例：`import a from 'a'`
   */
  rewriteFile(filePath, options = {}) {
    const fileName = filePath.split('/').pop()
    filePath = path.join(this.projectPath, filePath)
    console.log(green(`${fileName} updating. . .`))
    let fileString = fs.readFileSync(filePath, 'utf-8')
    fileString = fileString.replace(new RegExp('\r\n', 'g'), '\n')

    // 字符串替换
    if (this.isArray(options.replaceList)) {
      options.replaceList.forEach(rp => {
        if (!fileString.includes(rp.after)) {
          fileString = fileString.replace(rp.all ? new RegExp(rp.before, 'g') : rp.before, rp.after)
        }
      })
    }
    // 根据前后字符串匹配并添加字符串
    if (this.isArray(options.matchList)) {
      options.matchList.forEach(mt => {
        const initString = mt.match.replace('|', '')
        const spaceCount = mt.space || 0
        let startString = mt.match.split('|')[0]
        let endString = mt.match.split('|')[1]
        if (fileString.includes(initString)) {
          startString = `${startString}\n${' '.repeat(spaceCount + 2)}`
          endString = `\n${' '.repeat(spaceCount)}${endString}`
          fileString = fileString.replace(initString, `${startString}${mt.item}${endString}`)
        } else {
          startString = startString.replace('[', '\\[')
          endString = `\n${' '.repeat(spaceCount)}${endString.replace(']', '\\]')}`
          const matchStringArray = fileString.match(new RegExp(`${startString}([\\s\\S]*?)${endString}`))
          const matchString = matchStringArray && matchStringArray[1]
          const linkString = `${mt.cover ? '' : ','}\n${' '.repeat(spaceCount + 2)}`
          if (!matchString.includes(mt.item)) {
            fileString = fileString.replace(matchString, `${mt.cover ? '' : matchString}${linkString}${mt.item}`)
          }
        }
      })
    }
    // 引入模块字符串列表
    if (this.isArray(options.importList)) {
      options.importList.forEach(ip => {
        if (!fileString.includes(ip)) {
          const lineStartIndex = fileString.lastIndexOf('import ')
          const lineEndIndex = fileString.indexOf('\n', lineStartIndex)
          const lastImportString = fileString.substring(lineStartIndex, lineEndIndex)
          fileString = fileString.replace(`${lastImportString}`, `${lastImportString}\n${ip}`)
        }
      })
    }

    fs.writeFileSync(filePath, fileString, 'utf-8')
    console.log(green(`${fileName} update completed.`))
  }

  /**
   * 生成文件
   * @param {string} filePath 文件路径
   * @param {string} fileString 文件内容字符串
   */
  generateFile(filePath, fileString) {
    const fileName = filePath.split('/').pop()
    filePath = path.join(this.projectPath, filePath)
    console.log(green(`${fileName} creating. . .`))
    if (fs.existsSync(filePath)) {
      return console.log(yellow(`${fileName} already exists.`))
    }
    fs.mkdirSync(filePath.replace(`${fileName}`, ''), { recursive: true })
    fs.writeFileSync(filePath, fileString, 'utf-8')
    console.log(green(`${fileName} create completed.`))
  }

  /**
   * 保存网络图片到本地
   * @param {string} linkPath 图片链接地址
   * @param {string} writePath 图片写入路径
   */
  downloadImage(linkPath, writePath) {
    const fileName = writePath.split('/').pop()
    writePath = path.join(this.projectPath, writePath)
    console.log(green(`${fileName} downloading. . .`))
    fs.mkdirSync(writePath.replace(`${fileName}`, ''), { recursive: true })
    const writeStream = fs.createWriteStream(writePath)

    const readStream = request(linkPath)
    readStream.pipe(writeStream)
    readStream.on('error', err => {
      console.log(red(`ERROR: ${err}`))
    })

    writeStream.on('finish', () => {
      console.log(green(`${fileName} download completed.`))
      writeStream.end()
    })
  }

  /**
   * 获取模板
   * @param {string} filepath 路径名称
   */
  getTemplate(filepath) {
    return fs.readFileSync(path.join(__dirname, `./templates${filepath}`), 'utf-8')
  }

  /**
   * 拷贝目录
   * @param {string} oldPath 旧目录路径
   * @param {string} newPath 新目录路径
   * @param {boolean} isMove 是否删除旧目录文件
   */
  copyDir(oldPath, newPath, isMove) {
    const fileList = fs.readdirSync(path.join(__dirname, oldPath))
    fileList.forEach(filePath => {
      const oldFilePath = `${oldPath}/${filePath}`
      const newFilePath = `${newPath}/${filePath}`
      fs.mkdirSync(path.join(this.projectPath, newPath), { recursive: true })
      if (['.html', '.scss', '.ts'].some(t => filePath.endsWith(t))) {
        fs.copyFileSync(path.join(__dirname, oldFilePath), path.join(this.projectPath, newFilePath))
        if (isMove) {
          fs.unlinkSync(path.join(__dirname, oldFilePath))
          if (!fs.readdirSyncpath.join(__dirname, (oldPath)).length) {
            fs.rmdirSync(path.join(__dirname, oldPath))
          }
        }
      } else {
        this.copyDir(oldFilePath, newFilePath, isMove)
      }
    })
  }

  /**
   * 英文字符串首字母大写
   * @param {*} str 英文字符串 
   * @returns {string}
   */
  getFirstLetterUpper(str) {
    if (this.isString(str) && str[0]) {
      return str[0].toUpperCase() + str.substr(1)
    }
    return ''
  }
}

module.exports = Common
