import fs from 'fs'
import path from 'path'

class Tools {
  constructor () {
    this.langs = {}
  }

  init () {
    console.log('正在初始化多语言静态资源...\n')
    const i18nStaticPath = path.resolve(__dirname, '../../static/i18n')
    this.delI18nStaticDir(i18nStaticPath)
    fs.mkdirSync(i18nStaticPath)
    this.langs = {}
  }

  getI18nDev () {
    console.log('正在获取开发态多语言...\n')
    const i18nDevPath = path.resolve(__dirname, '../../src/i18n')
    const files = fs.readdirSync(i18nDevPath)
    for (let file of files) {
      let filePath = path.resolve(i18nDevPath, file)
      if (!fs.statSync(filePath).isDirectory()) continue
      const lang = require(filePath)
      if (!lang) continue
      this.langs[file] = lang
    }
  }

  setI18nStatic () {
    const i18nStaticPath = path.resolve(__dirname, '../../static/i18n')

    for (let lang of Object.keys(this.langs)) {
      let langDirPath = path.join(i18nStaticPath, lang)
      fs.mkdirSync(langDirPath)
      fs.writeFileSync(`${langDirPath}/README.md`, '')

      try {
        fs.writeFileSync(`${langDirPath}/i18n.json`, JSON.stringify(this.langs[lang]))
      } catch (err) {
        console.log(err)
      }
    }

    console.log('多语言静态资源创建成功！\n')
  }

  delI18nStaticDir (path) {
    let files = []
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path)
      for (let file of files) {
        let curPath = `${path}/${file}`
        if (fs.statSync(curPath).isDirectory()) {
          this.delI18nStaticDir(curPath)
        } else {
          fs.unlinkSync(curPath)
        }
      }
      fs.rmdirSync(path)
    }
  }
}

const tools = new Tools()
tools.init()
tools.getI18nDev()
tools.setI18nStatic()
