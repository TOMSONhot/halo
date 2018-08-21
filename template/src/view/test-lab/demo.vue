<template>
  <div>{{$t('demo.common.language')}}国际化</div>
</template>
<script>
import api from '../../api/api';
export default {
  data() {
    return {};
  },
  created() {
    api.testLab.list({ isBigData: false }).then(res => {
      console.log(res);
    });
  },
  mounted() {},
  methods: {}
};
</script>
