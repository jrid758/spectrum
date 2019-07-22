<template>
  <div id="app">
    <MainApp></MainApp>
  </div>
</template>

<script>
import MainApp from './components/MainApp.vue'

export default {
  name: 'app',
  components: {
    MainApp
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
}
</style>
