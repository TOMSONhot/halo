const xlsx = require('node-xlsx')
const fs = require('fs')
const path = require('path')

const con = require('./config')

excelToJson()


function excelToJson(){
  // 获取文件
  let excel = findExcel()

  //验证文件的正确性 并 获取语言对象
  let excelData = testExcel(excel)

  //对象转换
  let jsonData = transformData(excelData)

  // 翻译成JSON并输出到文件
  createJson()
}

function findExcel(){
  const filePath = path.resolve(__dirname, '../../src/i18n/language.xlsx')
  const file = fs.readFileSync(filePath)

  return file
}

function testExcel(file){
  return xlsx.parse(file)
}


function transformData(excelData){
  let jsonData = {}
  // 遍历sheet页
  for (let la of excelData){
    let rows = la.data.splice(1)

    // 遍历行
    for (let row of rows){
      // 数据填充
      extension(row, jsonData)
    }
  }

  let i18nPath = path.join(__dirname, `../../static/i18n`)

  /* 删除i18n文件夹以及子文件 */
  delDir(i18nPath)
  /*  创建i18n文件夹 */
  fs.mkdirSync(i18nPath)

  /* 4. 将语言信息写入各个json文件 */
  for(let key of Object.keys(jsonData)) {
    /*  创建语言文件夹 */
    fs.mkdirSync(path.join(i18nPath, `${key}`))

    let languagePath = path.join(i18nPath, `${key}/index.json`)

    fs.appendFileSync(languagePath, JSON.stringify(jsonData[key]))
  }
}

function extension(row, jsonData){
  let cellkey = row[1]
  for(let i = 5 ; i < row.length; i ++){
    if(row[i].trim() !== ""){
      setData(con.languageFileName[con.tableRowKey[i]], cellkey, jsonData, row[i])
    }
  }
}

function setData(lang, cellkey, jsonData, value){
  let keys = (lang + "." + cellkey).split(".")

  setObjValue(jsonData, keys, value)
}

function setObjValue(obj, keys, value){
  let key = keys[0]
  keys = keys.splice(1)

  if(!obj[key]){
    obj[key] = keys.length > 0 ? {} : value
  }

  if(keys.length > 0){
    setObjValue(obj[key], keys, value)
  }
}

function createJson(){

}

function delDir(path, isDelUser) {
  let files = []
  if(fs.existsSync(path)) {
    files = fs.readdirSync(path)
    for(let file of files) {
      let curPath = `${path}/${file}`
      if(fs.statSync(curPath).isDirectory()) {
        delDir(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    }
    fs.rmdirSync(path)
  }
}
