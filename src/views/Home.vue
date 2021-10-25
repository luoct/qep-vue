<template>
  <v-app>
    <v-main>
      <v-banner
        tile
        icon="mdi-pillar"
        app
        icon-color="teal"
      >
        <div class="text-h6">Cover</div>
      </v-banner>
      <v-tabs
        background-color="transparent"
        centered
      >
        <v-tabs-slider color="teal"></v-tabs-slider>
        <v-tab>首页</v-tab>
        <v-tab>详情</v-tab>
        <v-tab>帮助</v-tab>

      </v-tabs>
      <div class="box mt-12">
        <div class="text-h4 text-center">号手能力评估系统</div>
        <div class="text-body-2 text-center px-10 mt-2">本平台致力于提供。。。。。。床前明月光，疑似地上霜。举头望明月，低头思故乡。</div>
        <v-btn
          color="teal"
          width="50%"
          class="mt-10"
          dark
          large
          @click="toLogin"
        >Get Started!</v-btn>

      </div>

    </v-main>

    <v-footer
      padless
      color="transparent"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>hjjgcdx</strong>
        <div class="text-caption">Powered by <a
            href="mailto:1422291209@qq.com"
            target="_blank"
          >luoct</a></div>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
  }),
  methods: {
    toLogin() {
      this.$router.push('/login')
    }
  }
}
</script scoped>

<style>
  #app {
    background: url("../assets/bg.png");
    background-position: center bottom;
    background-size: cover;
  }
  .v-banner__wrapper {
    border: none !important;
  }
  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .v-tab,
  .v-tabs-slider-wrapper {
    min-width: 2rem !important;
    max-width: 10rem !important;
  }
</style>