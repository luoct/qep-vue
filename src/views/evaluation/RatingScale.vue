<template>
  <v-row>
    <v-card
      elevation="5"
      width="100%"
      class="ma-2 pa-4 pb-8"
    >
      <div class="text-h5 text-center pt-2 pb-4">SAS焦虑自评量表测试SAS</div>
      <v-alert
        color="warning"
        outlined
        dense
      >
        <v-icon color="warning">mdi-alert-outline</v-icon>：{{info.msg}}
      </v-alert>

      <div class="questions ma-4 mt-8">
        <div
          class="question mb-4"
          v-for="(item, i) in info.questions"
          :key="i"
        >
          <div class="text-h6 pb-2">{{i+1+'、'+item}}</div>
          <div class="options">
            <v-radio-group
              v-model="answerArr[i]"
              class="mt-0"
            >
              <v-radio
                v-for="(item, i) in info.options"
                :key="i"
                :label="item"
                :value="i"
              ></v-radio>
            </v-radio-group>
          </div>
        </div>
      </div>

      <v-btn
        color="teal"
        width="100%"
        :disabled="btnDisabled"
        @click="submitAnswer"
      >提交</v-btn>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      type: '',
      info: {
        msg: '请根据最近一星期内的状况，回答下列问题请根据最近一星期内的状况，回答下列问题请根据最近一星期内的状况，回答下列问题',
        questions: [
          '头痛', '神经过敏', '头晕或晕倒', '因为感到害怕而避开某些东西、场合或活动', '吃的太多'
        ],
        options: ['从无', '很轻', '中等', '偏重', '严重',],
        v: '',
      },
      answerArr: [],
      btnDisabled: false,
    }
  },
  mounted() {
    this.type = this.$route.params.type
  },
  methods: {
    submitAnswer() {
      this.btnDisabled = !this.btnDisabled
      console.log(this.answerArr);
    }
  }
}
</script>

<style scoped>
  .v-list-item {
    flex-direction: column;
  }
</style>
