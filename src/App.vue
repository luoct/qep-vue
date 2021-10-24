<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: false
  })
}
</script>

<style>
  body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  
</style>
