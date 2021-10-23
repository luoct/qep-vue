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
        <div class="text-h5">张三</div>
        <div class="text-body-2 mt-1">
          此人没什么想说的
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
              v-model="info.name"
              label="用户名"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="info.sname"
              label="姓名"
            ></v-text-field>
            <v-text-field
              v-model="info.address"
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
            >提交</v-btn>

          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card
            flat
            class="mx-12 my-4"
          >

            <v-text-field
              v-model="info.name"
              label="用户名"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="info.sname"
              label="旧密码"
            ></v-text-field>
            <v-text-field
              v-model="info.address"
              label="新密码"
              required
            ></v-text-field>
            
            <v-btn
              color="teal"
              dark
              width="100%"
              class="mt-1"
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
      info: { name: 's' },
    }
  },
  computed: {
    avatarSrc() {
      let hash = 'd6fe8c82fb0abac17a702fd2a94eff37';
      return this.Identicon(hash)
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