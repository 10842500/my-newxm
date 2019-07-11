<template>
  <div id="app">

      <router-view></router-view>
  </div>
</template>

<script>
import LoginIndex from './views/login/index.vue'
export default {
  name: 'app',
  components: {
    LoginIndex
  }
}
</script>

<style lang="less">

</style>
