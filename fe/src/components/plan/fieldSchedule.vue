<template>
  <section class="field">
    <div class="field__name">套餐</div>
    <div class="field__content">
      <p class="field__text"
         v-show="!scheduleVisible"
         @click.stop="togglePicker(true)">{{selectedSchedule}}</p>

      <smooth-picker class="smooth-picker--keep" ref="picker"
       :data="config"
       :change="dataChange"
       v-if="scheduleVisible"></smooth-picker>
      <input type="hidden" name="days" :value="days">
      <input type="hidden" name="marked" :value="marked">
    </div>
    <schedule class="l-schedule"
     :days="days"
     :startDay="startDay"
     :marked="marked"
     :editable="editable"
     :progressVisible="false"
     v-show="scheduleVisible"
     @changeDay="handleChangeDay"></schedule>
  </section>
</template>

<style lang="scss" scoped>
  @import url(../../../node_modules/vue-smooth-picker/dist/css/style.css);
  @import '~style/blocks/field';

  .l-schedule {
    position: absolute;
    top: 10.5rem;
  }

  .field {
    position: relative;
  }

  .schedule-group {
    background: rgba(98, 186, 206, 0.8);
  }

  .field__content {
    width: 78%;
  }

  .field__text {
    background: rgba(98, 186, 206, 0.5);
    width: 130px;
    height: 100%;
    line-height: 3em;
  }
</style>

<script>
  import Vue from 'vue'
  import SmoothPicker from 'vue-smooth-picker'
  import schedule from './kSchedule'

  Vue.use(SmoothPicker)

  export default {
    name: 'fieldSchedule',

    props: ['startDay', 'scheduleVisible'],

    data: function () {
      return {
        config: [{
          currentIndex: 1,
          list: [
            '欢乐7', '走心14', '自定义'
          ],
          flex: 3,
          textAlign: 'center',
          className: 'schedule-group'
        }],

        days: 7,
        marked: [1, 2, 4, 7],
        editable: true
      }
    },

    created: function () {
      if (this.config[0].currentIndex !== 0) {
        this.dataChange(0, this.config[0].currentIndex)
      }
    },

    computed: {
      selectedSchedule() {
        const currentIndex = this.config[0].currentIndex
        return this.config[0].list[currentIndex]
      }
    },

    methods: {
      dataChange(gIndex, itemIndex) {
        console.info('list', gIndex, itemIndex)
        switch (itemIndex) {
          case 0:
            this.days = 7
            this.marked = [1, 2, 4, 7]
            this.editable = true
            break
          case 1:
            this.days = 14
            this.marked = [1, 2, 4, 6, 9, 12, 14]
            this.editable = true
            break
          case 2:
            this.days = 21
            this.marked = [1, 2, 4, 6, 9, 12, 16, 20, 21]
            this.editable = true
            break;
        }
      },

      togglePicker(status) {
        this.$emit('changeScheduleVisible', status)
      },

      handleChangeDay(day) {
        //tip: 这时候是新建plan，所以可以在这里更新该plan
        let index = this.marked.indexOf(parseInt(day))

        if (index === -1) {
          this.marked.push(day)
        } else {
          this.marked.splice(index, 1)
        }
      }
    },

    components: { schedule }
  }
</script>