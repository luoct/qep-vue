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
        <div class="text-h5">{{ userInfo.username }}</div>
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

            <v-text-field
              v-model="userInfo.username"
              label="用户名"
            ></v-text-field>
            <v-text-field
              v-model="userInfo.stuNo"
              label="学号"
            ></v-text-field>
            <v-text-field
              v-model="userInfo.mobile"
              label="电话"
            ></v-text-field>
            <v-text-field
              v-model="userInfo.signature"
              label="个性签名"
              placeholder="不超过50个字"
              counter="50"
              required
            ></v-text-field>
            <v-btn
              color="teal"
              dark
              width="100%"
              class="mt-1"
              @click="changeInfo"
            >提交</v-btn>

          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card
            flat
            class="mx-12 my-4"
          >

            <v-text-field
              v-model="username"
              label="用户名"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="oldPwd"
              label="旧密码"
            ></v-text-field>
            <v-text-field
              v-model="newPwd"
              label="新密码"
              required
            ></v-text-field>

            <v-btn
              color="teal"
              dark
              width="100%"
              class="mt-1"
              @click="changePassword"
            >修改</v-btn>
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
      tab: null,
      userInfo: {
        username: '',
        mobile: '',
        signature: '',
        hex: '',
        stuNo: ''
      },
      username: '',
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
      this.$http.get('/user/getInfo').then(({ data: res }) => {
        if (res.code !== 1) return alert('网络出错了，请重试')
        // console.log(res.data);
        this.userInfo = res.data
        this.userInfo.signature = res.data.signature !== '' ? res.data.signature : '此人什么都不想说！'
        this.username = res.data.username
      })
    },
    changeInfo() {
      this.$http.post('/user/changeInfo').then(({ data: res }) => {
        if (res.code !== 1) return alert('网络出错了，请重试')
        console.log(res.data);
        this.userInfo = res.data
        alert('修改成功')
      })
    },
    changePassword() {
      this.$http.post('/user/changePassword').then(({ data: res }) => {
        if (this.newPwd === '' || this.oldPwd === '') return
        if (res.code !== 1) return alert('网络出错了，请重试')
        alert('修改成功')
        window.sessionStorage.removeItem('username')
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