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
        <v-form
          ref="loginFormRef"
          v-model="valid"
        >
          <v-text-field
            v-model="login.usename"
            append-icon="mdi-account"
            name="usename"
            label="用户名"
            :rules="[v => !!v || '请输入账号']"
            required
          />
          <v-text-field
            v-model="login.password"
            append-icon="mdi-lock"
            name="password"
            label="密码"
            type="password"
            :rules="[v => !!v || '请输入密码']"
            required
          />

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
        </v-form>
      </v-card>
    </v-main>
  </v-app>

</template>

<script>
export default {
  data: () => ({
    //
    loginData: {
      username: '',
      password: '',
    },
    valid: true,
  }),
  methods: {
    login() {
      this.$refs.loginFormRef.validate()


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