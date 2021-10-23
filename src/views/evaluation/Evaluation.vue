<template>
  <v-row>
    <v-expansion-panels v-model="panel" class="ma-2">
      <v-expansion-panel>
        <v-expansion-panel-header class="px-5">心理测评</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list
            flat
            v-for="(item, i) in ratingScales"
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
      <v-expansion-panel>
        <v-expansion-panel-header>能力测评</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list>暂无......</v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      panel: 0,
      ratingScales: [
        { title: 'SCL-90表', to: '/app/rating-scale/SCL-90' },
        { title: 'SAS测评表', to: '/app/rating-scale/SAS' },
        { title: 'SDS测评表', to: '/app/rating-scale/SDS' },
      ]
    }
  }
}
</script>

<style scoped>
</style>