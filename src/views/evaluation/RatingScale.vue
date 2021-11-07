<template>
  <v-row>

    <v-overlay :value="overlayVisible">
      <v-progress-circular
        indeterminate
        size="128"
      ></v-progress-circular>
    </v-overlay>

    <v-card
      v-if="!overlayVisible"
      elevation="5"
      width="100%"
      class="ma-2 pa-4 pb-8"
    >
      <div class="text-h5 text-center pt-2 pb-4">{{title}}</div>
      <v-alert
        color="warning"
        outlined
        dense
      >
        <v-icon color="warning">mdi-alert-outline</v-icon>：{{info.msg}}
      </v-alert>
      <v-form
        ref="formRef"
        v-model="postValid"
        lazy-validation
      >
        <div class="questions ma-4 mt-8">
          <div
            class="question mb-4"
            v-for="(item, i) in info.questions"
            :key="i"
          >
            <div class="text-h6 pb-2">{{item}}</div>
            <div class="options">
              <v-radio-group
                v-model="answerArr[i]"
                class="mt-0"
                :rules="radioRule"
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

      </v-form>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      type: '',
      info: {
        msg: '',
        questions: [],
        options: [],
      },
      answerArr: [],
      btnDisabled: false,
      postValid: true,
      radioRule: [v => ([0, 1, 2, 3, 4].indexOf(v) !== -1) || '请选择一项'],
      overlayVisible: true,
    }
  },
  created() {
    this.type = this.$route.params.type
    this.getRatingScale()
  },
  methods: {
    getRatingScale() {
      this.$http.get('/evaluation/getRatingScale', { params: { type: this.type } }).then(({ data: res }) => {
        window.console.log(res)
        this.title = res.data.title
        this.info = res.data

        // 控制加载skeleton
        this.overlayVisible = false
      })
    },
    submitAnswer() {
      // todo 提交的表单验证

      if (!this.$refs.formRef.validate()) return
      this.btnDisabled = !this.btnDisabled
      // console.log(this.answerArr)
      this.$http.post('/evaluation/postAnswer', { answer: this.answerArr, type: this.type }).then(({ data: res }) => {

        if (res.code !== 1) {
          alert('提交失败，请重试')
          this.btnDisabled = !this.btnDisabled
          return
        }

        let alertDesc = res.data.score !== 0 ? '你的分数为' + res.data.score : '暂无分数'
        alert('提交成功！' + alertDesc)
      })
    }
  }
}
</script>

<style scoped>
  .v-list-item {
    flex-direction: column;
  }
</style>
