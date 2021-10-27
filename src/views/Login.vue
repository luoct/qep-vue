<template>

  <v-app>
    <v-main class="d-flex align-center justify-center">

      <v-tabs-items v-model="loginVisible">
        <v-tab-item>

          <!-- 登录 -->
          <v-card
            class="pa-8 ma-3 h400"
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
                v-model="loginData.stuNo"
                append-icon="mdi-account"
                label="学号"
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

              <v-card-actions class="d-flex align-center justify-center mt-5">
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
                  @click="loginVisible = 1"
                >去注册</v-btn>
              </v-card-actions>
            </v-form>

          </v-card>

        </v-tab-item>
        <v-tab-item>

          <!-- 注册 -->
          <v-card
            class="pa-8 ma-3 h400"
            elevation="5"
            transition="scroll-x-transition"
          >
            <v-form
              ref="registerFormRef"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="registerData.stuNo"
                append-icon="mdi-school"
                label="学号"
                type="stuNo"
                :rules="[v => !!v || '请输入学号']"
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
                v-model="registerData.username"
                append-icon="mdi-account"
                label="用户名"
                :rules="[v => !!v || '请输入用户名']"
                required
              />
              <v-text-field
                v-model="registerData.mobile"
                append-icon="mdi-cellphone"
                label="电话"
                type="mobile"
                :rules="[v => !!v || '请输入电话号码']"
                required
              />

              <v-card-actions class="d-flex align-center justify-center">
                <v-btn
                  color="teal"
                  outlined
                  elevation="2"
                  class="mr-2"
                  width="50%"
                  @click="loginVisible = 0"
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

        </v-tab-item>

      </v-tabs-items>

    </v-main>
  </v-app>

</template>

<script>
export default {
  data: () => ({
    //
    loginVisible: 0,
    loginData: {
      stuNo: '',
      password: '',
    },
    registerData: {
      stuNo: '',
      password: '',
      username: '',
      mobile: '',
    },
    valid: true,

  }),
  methods: {
    login() {

      if (!this.$refs.loginFormRef.validate()) return

      this.$http.post('/login', JSON.parse(JSON.stringify(this.loginData))).then(({ data: res }) => {

        if (res.code !== 1) {
          alert("账号密码错误，请重新登录")
          this.$refs.loginFormRef.reset()
        } else {
          // console.log(res)
          window.sessionStorage.setItem('stuNo', res.data.stuNo)
          window.sessionStorage.setItem('token', res.data.token)
          this.$router.push('/app/user')
        }
      })
    },
    register() {

      if (!this.$refs.registerFormRef.validate()) return

      this.$http.post('/register', this.registerData).then(({ data: res }) => {
        if (res.code === 0) {
          alert("注册失败，请重试")
          this.$refs.loginFormRef.reset()
        } else if (res.code === -1) {
          alert('该学号已被注册了')
        } else {
          // alert("注册成功，去登录！")
          this.loginVisible = 0
        }
      })
    }
  }
}
</script>

<style>
  .theme--light.v-tabs-items {
    background-color: transparent !important;
  }
  .h400 {
    height: 400px;
  }
</style>