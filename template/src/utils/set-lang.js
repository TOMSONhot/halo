import axios from 'axios';
import huiLocale from 'hui/lib/locale';
import i18n from '@/i18n';
// 这里创建一个新的http示例，避免受到全局axios的baseurl影响
const http = axios.create({ baseURL: '' });

const langUtil = {
  async setLang(locale = 'en_US') {
    if (typeof locale === 'string' && locale !== '') {
      const res = await http.get(
        `${
          process.env.NODE_ENV === 'development' ? '/static' : '/demo/dist'
        }/i18n/${locale}/i18n.json?_=${new Date().getTime()}`
      );
      const lang = res.data;
      // 解析语言包
      i18n.setLocaleMessage(locale, JSON.parse(JSON.stringify(lang)));
      // 设置hui组件的多语言
      huiLocale.i18n((key, value) => i18n.t(key, value));
      // 设置当前语言
      i18n.locale = locale;
    }
  }
};

export default langUtil;
