<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>

// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
$fa-font-path: "../node_modules/font-awesome/fonts";

@import './assets/scss/main.scss';
@import '../node_modules/bootstrap/scss/bootstrap';
@import '../node_modules/bootstrap-vue/src/index.scss';
@import '../node_modules/font-awesome/scss/font-awesome.scss';
</style>
