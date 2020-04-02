<template>

  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
import loading from "@/components/public/loading.vue"
export default {
  name: 'App',
  components:{loading}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
