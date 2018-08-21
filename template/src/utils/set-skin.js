import axios from 'axios';
// import sysName from '../config/pems.config';
// 这里创建一个新的http示例，避免受到全局axios的baseurl影响
const http = axios.create({ baseURL: '' });

/**
 * 往页面中插入css
 * @param {String} path CSS文件路径
 * @param {String} name 包名称
 * @author chenguanbin
 */
function loadCSS(path, name) {
  const head = document.getElementsByTagName('head')[0];
  const linkId = `skin-${name}`;
  let linkTag = document.getElementById(linkId);
  if (!linkTag) {
    linkTag = document.createElement('link');
    linkTag.href = path;
    linkTag.rel = 'stylesheet';
    linkTag.type = 'text/css';
    linkTag.setAttribute('id', linkId);
    head.appendChild(linkTag);
  } else {
    linkTag.href = path;
  }
}

/**
 * 根据子系统渲染皮肤
 * @param {String} skin 皮肤
 * @param {Object} packages 需要换肤的包
 * @param {String} system 子系统
 * @author chenguanbin
 */
function renderSkin(skin, packages, system) {
  const skinDir = `static/skin/${skin}`;
  packages.forEach(pkg => {
    // 只有在线上环境时才加项目前缀
    let path = `${skinDir}/${pkg.name}/${pkg.stylePath}`;
    if (
      process.env.NODE_ENV === 'production' &&
      system !== undefined &&
      system !== ''
    ) {
      path = `/${system}/${path}`;
    }
    loadCSS(path, pkg.name);
  });
}

const skinUtil = {
  /**
   * 获取当前皮肤包配置
   * @param {String} skin 当前皮肤颜色，默认为redblack
   */
  setSkin: async skinName => {
    let skin = skinName;
    // 参数只接受非空字符串
    if (!(typeof skin === 'string' && skin !== '')) {
      skin = 'halo';
    }
    const res = await http.get(
      `${
        process.env.NODE_ENV === 'development' ? '' : '/pems'
      }/static/skin/${skin}/skin.json?_=${new Date().getTime()}`
    );
    // debugger;
    const skinSetting = res.data;
    let sysName = 'demo';
    renderSkin(skin, skinSetting.packages, sysName);
  }
};

export default skinUtil;
