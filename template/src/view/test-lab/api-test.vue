<template>
  <div>{{$t('demo.common.language')}}1231231</div>
</template>
<script>
// import testLabApi from '../../api/testLab';
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
