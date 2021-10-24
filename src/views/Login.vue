<template>

  <v-app>
    <v-main class="d-flex align-center justify-center">

      <!-- 登录 -->
      <v-card
        v-if="loginVisible"
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
          lazy-validation
        >
          <v-text-field
            v-model="loginData.usename"
            append-icon="mdi-account"
            label="用户名"
            :rules="[v => !!v || '请输入账号']"
            required
          />
          <v-text-field
            v-model="loginData.password"
            append-icon="mdi-lock"
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
              @click="loginVisible = !loginVisible"
            >去注册</v-btn>
          </v-card-actions>
        </v-form>

      </v-card>

      <!-- 注册 -->
      <v-card
        v-else
        class="pa-8 ma-3"
        elevation="5"
      >
        <v-form
          ref="registerFormRef"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="registerData.usename"
            append-icon="mdi-account"
            label="用户名"
            :rules="[v => !!v || '请输入账号']"
            required
          />
          <v-text-field
            v-model="registerData.password"
            append-icon="mdi-lock"
            label="密码"
            type="password"
            :rules="[v => !!v || '请输入密码']"
            required
          />
          <v-text-field
            v-model="registerData.mobile"
            append-icon="mdi-lock"
            label="电话"
            type="mobile"
            :rules="[v => !!v || '请输入密码']"
            required
          />
          <v-text-field
            v-model="registerData.stuNo"
            append-icon="mdi-lock"
            label="学号"
            type="stuNo"
            :rules="[v => !!v || '请输入密码']"
            required
          />
          <v-card-actions class="d-flex align-center justify-center">
            <v-btn
              color="teal"
              outlined
              elevation="2"
              class="mr-2"
              width="50%"
              @click="loginVisible = !loginVisible"
            >去登录</v-btn>
            <v-btn
              color="teal"
              dark
              elevation="2"
              class="ml-2"
              width="50%"
              @click="register"
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
    loginVisible: true,
    loginData: {
      username: '',
      password: '',
    },
    registerData: {
      username: '',
      password: '',
      mobile: '',
      stuNo: '',
    },
    valid: true,

  }),
  methods: {
    login() {
      if (!this.$refs.loginFormRef.validate()) return
      this.$http.post('/login').then(({ data: res }) => {
        if (res.code !== 1) {
          alert("登录失败，请重试")
          this.$refs.loginFormRef.reset()
        } else {
          console.log(res)
          window.sessionStorage.setItem('username', res.data.username)
          this.$router.push('/app/user')
        }
      })
    },
    register() {
      if (!this.$refs.registerFormRef.validate()) return
      console.log('register')
      this.$http.post('/register').then(({ data: res }) => {
        if (res.code !== 1) {
          alert("注册失败，请重试")
          this.$refs.loginFormRef.reset()
        } else {
          console.log(res)
          alert("注册成功，去登录！")
          this.loginVisible = !this.loginVisible
        }
      })
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