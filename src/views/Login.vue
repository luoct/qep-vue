<template>

  <v-app>
    <v-main class="d-flex align-center justify-center">
      <v-card
        class="pa-8 ma-3"
        elevation="5"
      >
        <v-img
          src="../assets/q.png"
          width="42%"
          class="ma-auto"
        ></v-img>
        <v-form>
          <v-text-field
            v-model="model.usename"
            append-icon="mdi-account"
            name="usename"
            label="用户名"
            required
          />
          <v-text-field
            v-model="model.password"
            append-icon="mdi-lock"
            name="password"
            label="密码"
            type="password"
            required
          />
        </v-form>
        <v-card-actions class="d-flex align-center justify-center">
          <v-btn
            color="teal"
            dark
            elevation="2"
            class="mr-2"
            width="50%"
            @click="login"
          >登录</v-btn>
          <v-btn
            color="teal"
            outlined
            elevation="2"
            class="ml-2"
            width="50%"
          >注册</v-btn>
        </v-card-actions>
      </v-card>
    </v-main>
  </v-app>

</template>

<script>
export default {
  data: () => ({
    //
    model: {
      username: '',
      password: '',
    }
  }),
  methods: {
    login() {
      this.$router.push('/app/user')
    }
  }
}
</script>

<style>
  #app {
    background: url("../assets/bg.png");
    background-position: center bottom;
    background-size: cover;
  }
</style>