<template>
  <div id="app">
    <router-view/>
    <el-select style="width: 100px;margin-left: 15px;"
      v-model="lang"
      placeholder="请选择"
      @change="changeLang">
      <el-option label="中文"
        value="zh_CN"></el-option>
      <el-option label="EN"
        value="en_US"></el-option>
    </el-select>
  </div>
</template>

<script>
import i18n from '@/i18n';
import locale from 'hui/lib/locale';

export default {
  name: 'App',
  data() {
    return {
      lang: 'zh_CN'
    };
  },
  created() {},
  methods: {
    // 切换语言
    changeLang() {
      let lang;
      if (this.lang === 'zh_CN') lang = require('@/i18n/zh_CN');
      else lang = require('@/i18n/en_US');
      i18n.setLocaleMessage(this.lang, JSON.parse(JSON.stringify(lang)));
      locale.i18n((key, value) => i18n.t(key, value));
      i18n.locale = this.lang;
    }
  }
};
</script>
