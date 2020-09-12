<template>
  <div class="app" >
    <h1 v-touch="touchHandler">app1</h1>
    <h1 v-touch="touchHandler">app2</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      left: '2000'
    }
  },
  methods: {
    touchHandler(direction, e) {
      console.log('direction', direction);
    }
  },
}
</script>
<style lang="less" scoped>
html, body{
  padding: 0px;
  margin: 0px;
}
</style>
