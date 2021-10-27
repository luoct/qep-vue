<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-sheet
        color="grey lighten-4"
        class="pa-4"
      >
        <v-avatar
          class="mb-4"
          color="grey darken-1"
          size="64"
        >
          <img :src="avatarSrc">
        </v-avatar>

        <div>{{userInfo.username}}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.icon"
          link
          color="teal"
          :to="link.to"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-title>{{ link.text }}</v-list-item-title>

        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="teal"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="pl-1">
        <v-btn
          text
          color="#fff"
          class="brand ma-0 px-0"
          to="/"
        >Cover</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        @click="logout"
      >登出</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        username: '',
        mobile: '',
        signature: '',
        hex: '',
        stuNo: ''
      },
      drawer: false,
      links: [
        { icon: 'mdi-account-outline', text: '个人中心', to: '/app/user', },
        { icon: 'mdi-list-status', text: '参加评估', to: '/app/evaluation', },
        { icon: 'mdi-chart-timeline', text: '查看报告', to: '/app/report', },
      ]
    }
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    avatarSrc() {
      try {
        // let hex = 'd6fe8c82fb0abac17a702fd2a94eff37'
        let hex = this.userInfo.hex
        return this.Identicon(hex)
      } catch (error) {
        console.log(error);
      }
    },
    username() {
      return window.sessionStorage.getItem('stuNo')
    }
  },
  methods: {
    getUserInfo() {
      this.$http.get('/user/getInfo',
        {
          params: { stuNo: window.sessionStorage.getItem('stuNo') }
        }
      ).then(({ data: res }) => {
        // console.log(res.data);
        this.userInfo = res.data
      })
    },

    logout() {
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('stuNo')
      this.$router.push('/')

      // todo: 不需要请求？
      this.$http.get('/logout').then(({ data: res }) => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
  .brand {
    font-size: 20px !important;
    text-transform: none !important;
    font-family: "Roboto", sans-serif !important;
  }
</style>