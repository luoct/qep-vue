<template>
  <v-row>
    <v-card
      width="100%"
      class="pa-4 ma-2 header"
      elevation="5"
    >
      <v-avatar
        color="primary"
        size="72"
      >
        <img
          :src="avatarSrc"
          alt=""
        >
      </v-avatar>
      <div class="title">
        <div class="text-h5">{{ userInfo.username || '未登录' }}</div>
        <div class="text-body-2 mt-1">
          {{ userInfo.signature }}
        </div>
      </div>
    </v-card>

    <v-card
      width="100%"
      class="ma-2"
      elevation="5"
    >
      <v-tabs
        v-model="tab"
        centered
      >
        <v-tab>基本信息</v-tab>
        <v-tab>修改密码</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card
            flat
            class="mx-12 my-4"
          >
            <v-form
              ref="changeInfoFormRef"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="userInfo.stuNo"
                label="学号"
                disabled
              ></v-text-field>
              <v-text-field
                v-model="userInfo.username"
                label="用户名"
                :rules="[v => !!v || '请输入']"
                required
              ></v-text-field>
              <v-text-field
                v-model="userInfo.mobile"
                label="电话"
                :rules="[v => !!v || '请输入']"
                required
              ></v-text-field>
              <v-text-field
                v-model="userInfo.signature"
                label="个性签名"
                placeholder="不超过50个字"
                counter="50"
              ></v-text-field>
              <v-btn
                color="teal"
                dark
                width="100%"
                class="mt-1"
                @click="changeInfo"
              >提交</v-btn>
            </v-form>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card
            flat
            class="mx-12 my-4"
          >
            <v-form
              ref="changePasswordFormRef"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="stuNo"
                label="学号"
                disabled
              ></v-text-field>
              <v-text-field
                v-model="oldPwd"
                type="password"
                label="旧密码"
                :rules="[v => !!v || '请输入']"
              ></v-text-field>
              <v-text-field
                v-model="newPwd"
                type="password"
                label="新密码"
                :rules="[v => !!v || '请输入']"
                required
              ></v-text-field>

              <v-btn
                color="teal"
                dark
                width="100%"
                class="mt-1"
                @click="changePassword"
              >修改</v-btn>
            </v-form>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      tab: null,
      userInfo: {
        username: '',
        mobile: '',
        signature: '',
        hex: '',
        stuNo: ''
      },
      stuNo: '',
      oldPwd: '',
      newPwd: '',

    }
  },
  computed: {
    avatarSrc() {
      try {
        return this.Identicon(this.userInfo.hex)
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$http.get('/user/getInfo',
        {
          params: { stuNo: window.sessionStorage.getItem('stuNo') }
        }
      ).then(({ data: res }) => {
        if (res.code !== 1) {
          this.$router.push('/login')
          return
        }
        // console.log(res.data);
        this.userInfo = res.data
        this.userInfo.signature = res.data.signature !== '' ? res.data.signature : '此人什么都不想说！'
        this.stuNo = res.data.stuNo
      })
    },
    changeInfo() {
      if (!this.$refs.changeInfoFormRef.validate()) return

      this.$http.post('/user/changeInfo', this.userInfo).then(({ data: res }) => {
        if (res.code !== 1) {
        alert('修改失败，请重试')
        }
        // console.log(res.data)
        // this.userInfo = res.data
        this.getUserInfo()
        // alert('修改成功')
      })
    },
    changePassword() {
      if (!this.$refs.changePasswordFormRef.validate()) return

      this.$http.post('/user/changePassword', { newPwd: this.newPwd }).then(({ data: res }) => {
        if (this.newPwd === '' || this.oldPwd === '') return
        if (res.code !== 1) {
          alert('网络出错了，请重试')
          return
        }
        alert('修改成功，请重新登录')
        window.sessionStorage.removeItem('token')
        window.sessionStorage.removeItem('stuNo')
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    width: 72%;
  }
</style>