const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');

const con = require('./config');

jsToExcel();

function jsToExcel() {

    console.log(con.message.startJsonToExcel);
    console.log(con.message.startLoadlang);

    const i18nDevPath = path.resolve(__dirname, '../../src/i18n');
    const files = fs.readdirSync(i18nDevPath);

    let lang = {};

    for (let file of files) {
        let filePath = path.resolve(i18nDevPath, file);
        if (!fs.statSync(filePath).isDirectory()) continue;
        const temp = require(filePath);
        if (!temp) continue;
        lang[file] = temp;
    }

    if (Object.getOwnPropertyNames(lang).length === 0) {
        console.error(con.type.error + con.message.failLoadlang);
    } else {
        createI18nExcel(lang);
    }
}

function createI18nExcel(info) {
    const i18nStaticPath = path.resolve(__dirname, '../../static/i18n');
    try {
        let arr = [];
        for (let lang of Object.keys(info)) {
            // 要先合并对象还没做
            for (let val in info[lang]) {
                arr = getExcelSheet(info[lang], lang);
            }
        }

        var buffer = xlsx.build(arr);

        let userExcelPath = path.join(__dirname, '..', '..', 'src', 'i18n');

        fs.writeFile(path.join(userExcelPath, '/language.xlsx'), buffer, 'binary', (err) => {
            if (err) {
                console.error(con.type.error + ":" + err);
                return;
            }
            console.log(con.type.success + con.message.fileWriteSuccess);
        });

        console.log(con.type.success + con.message.excelComplete + path.join(userExcelPath, '/language.xlsx'));
    } catch (err) {
        console.log(con.type.success + err);
    }
}

function getExcelSheet(sheetData, lang) {
    // sheet 页头部
    let arr = [];
    for (let val in sheetData) {
        // sheet页合并
        // {name: "mySheetName", data: data}
        arr.push(
            {
                name: val,
                data: [con.excel.caption, ...getExcelRows(sheetData[val], lang, val)],
            },
        );
    }
    return arr;
}

function getExcelRows(sheetData, lang, str) {
    let arr = []
    //遍历对象判断value是否是string如果不是继续遍历，将每行数据都合并
    if (typeof sheetData !== 'string') {
        for (let name of Object.keys(sheetData)) {
            arr = [...arr, ...getExcelRows(sheetData[name], lang, str + "." + name)]
            // console.log(arr)
        }
    } else {
        // 单行数据获取
        let rowData = ["", str, "", "", "", ""]
        for (let name of Object.keys(con.languageFileName)) {
            if (con.languageFileName[name] === lang) {
                rowData.push(sheetData)
            } else {
                rowData.push("")
            }
        }
        arr.push(rowData)
    }

    return arr
}
