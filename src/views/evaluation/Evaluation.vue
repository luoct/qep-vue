<template>
  <v-row>
    <v-expansion-panels
      v-model="panel"
      class="ma-2"
    >
      <!-- 心理测评 -->
      <v-expansion-panel>
        <v-expansion-panel-header class="px-5">心理测评</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list
            flat
            v-for="(item, i) in psychologyList"
            :key="i"
          >
            <v-list-item-content class="pa-0">
              <v-row
                justify="space-between"
                align="center"
                no-gutters
              >
                <div>{{ item.title }}</div>
                <v-btn
                  :to="item.to"
                  color="teal"
                  dark
                >去测试</v-btn>
              </v-row>
            </v-list-item-content>

          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- 能力测评 -->
      <v-expansion-panel>
        <v-expansion-panel-header class="px-5">能力测评</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list
            flat
            v-for="(item, i) in abilityList"
            :key="i"
          >
            <v-list-item-content class="pa-0">
              <v-row
                justify="space-between"
                align="center"
                no-gutters
              >
                <div>{{ item.title }}</div>
                <v-btn
                  :to="item.to"
                  color="teal"
                  dark
                >去测试</v-btn>
              </v-row>
            </v-list-item-content>

          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-expansion-panels>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      panel: -1,
      psychologyList: [],
      abilityList: []
    }
  },
  created() {
    this.getRatingScaleList()
  },
  methods: {
    getRatingScaleList() {
      this.$http.get('/evaluation/getRatingScaleList').then(({ data: res }) => {
        window.console.log(res.data)
        res.data.forEach(item => {
          if (item.category === 'psychology') {
            this.psychologyList = item.list
          } else if (item.category === 'ability') {
            this.abilityList = item.list
          }
        })
        this.panel = 0

      })
    }
  }
}
</script>

<style scoped>
</style>