<template>
  <main @click="toggleEditArea">
    <kBg></kBg>
    <nav class="l-icon" v-show="!editAreaVisible">
      <p class="c-icon c-icon--menu c-icon--large"
       @click.prevent="navHome">Up!Up!</p>
    </nav>
    <article v-show="!editAreaVisible">
      <section class="title l-title">
        <h1 class="title__main">{{plan.title}}</h1>
        <p>Next: {{nextDay}}</p>
      </section>
      <section id="scheduleWrap">
        <schedule class="l-schedule"
         :startDay="plan.progress.start_day"
         :days="plan.progress.days"
         :marked="plan.progress.marked"
         :done="plan.progress.done"
         :editable="true"
         :tipVisible="false"
         @changeDay="handleChangeDay"></schedule>
      </section>
    </article>
    <div class="edit-area" v-show="editAreaVisible">
      <div class="field2">
        <div class="field2__name">
          <img class="full-width-img" src="../../../images/svg/edit.svg" alt="编辑">
        </div>
        <div class="field2__content" @click.stop="handleEdit">
          编辑
        </div>
      </div>
      <div class="field2">
        <div class="field2__name">
          <img class="full-width-img" src="../../../images/svg/delete.svg" alt="删除">
        </div>
        <div class="field2__content field2__content--warn" @click.stop="handleDelete">
          删除
        </div>
      </div>
      <div class="field2">
        <div class="field2__name">
          <img class="full-width-img" src="../../../images/svg/share.svg" alt="分享">
        </div>
        <div class="field2__content--flex"  @click.stop="handleShare">
          <div class="icon--padding">
            <img class="full-width-img" src="../../../images/svg/wechat.svg" alt="微信">
          </div>
          <div class="icon--padding">
            <img class="full-width-img" src="../../../images/svg/moments.svg" alt="朋友圈">
          </div>
          <div class="icon--padding">
            <img class="full-width-img" src="../../../images/svg/sina.svg" alt="新浪微博">
          </div>
          <div class="icon--padding">
            <img class="full-width-img" src="../../../images/svg/qq.svg" alt="腾讯QQ">
          </div>
          <div class="icon--padding">
            <img class="full-width-img" src="../../../images/svg/douban.svg" alt="豆瓣">
          </div>
        </div>
      </div>
      <div class="field2">
        <div class="field2__name">
          <img class="full-width-img" src="../../../images/svg/add.svg" alt="新建">
        </div>
        <div class="field2__content field2__content--success" @click.stop="handleAdd">
          新建
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~style/blocks/field';
  @import '~style/blocks/icon';

  .l-schedule {
    position: fixed !important;
    bottom: 8rem;
  }

  .l-icon {
    padding: 1.5em 1em;
  }

  .l-title {
    padding: 2em 0 0 1em;
  }

  .title__main {
    font-weight: 400;
    margin-bottom: .5em;

    font-size: 2em;
  }

  .edit-area {
    position: absolute;
    top: 0;

    width: 100vw;
    height: 100vh;
    padding: 6em 1em;

    background: rgba(95, 91, 91, 0.4);
  }

  .field2 {
    display: flex;
    width: 100%;

    margin-bottom: .5em;
  }

  .field2__name {
    width: 10%;
    background: #1B1A1A;
    padding: .5em;
    align-self: baseline;
    max-width: 38.4px;
    min-width: 2em;
  }

  .field2__content {
    width: 25%;
    text-align: center;
    background: #53BDBD;
    border: none;
    padding: .5em;
    color: #ffffff;
    font-size: 1rem;
    max-width: 7em;
  }

  .field2__content--warn {
    background: #DB7093;
  }

  .field2__content--success {
    background: #60BD74;
  }

  .field2__content--flex {
    display: flex;
    flex-wrap: wrap;
    width: calc(30% + .5em);
  }

  .icon--padding {
    width: calc((100% - .75em) / 3);
    margin: 0 .25em .25em 0;
    padding: .5em;
    background: #53BDBD;

    max-width: 38.4px;
    min-width: 2em;
  }
</style>

<script>
  import kBg from './kBg'
  import schedule from './kSchedule'

  import { mapMutations } from 'vuex'
  import { formatDate, withinParent } from '@/modules/helper/utils'

  export default {
    name: 'planDetail',

    data: function () {
      return {
        editAreaVisible: false
      }
    },

    computed: {
      plan() {
        const planId = this.$route.params.id
        return this.$store.state.plans.filter(plan => plan.id === planId)[0]
      },

      nextDay() {
        const baseDate = new Date(this.plan.progress.start_day),
            today = new Date(formatDate(new Date())),
            timeOfDay = 24 * 60 * 60 * 1000,
            marked = this.plan.progress.marked

        let i = 0, tempDate
        while (i < marked.length) {
          tempDate = new Date(this.plan.progress.start_day)
          tempDate.setDate(baseDate.getDate() + marked[i] - 1)

          if (today.getTime() - tempDate.getTime() <= timeOfDay && this.plan.progress.done.indexOf(marked[i]) === -1) {
            break
          }

          i++
        }
        return formatDate(tempDate, 'mm/dd/yy')
      }
    },

    methods: {
      ...mapMutations([
        'donePlan',
        'deletePlan'
      ]),

      handleChangeDay(day) {
        const planId = this.$route.params.id

        if (this.plan.progress.marked.indexOf(day) > -1) {
          this.donePlan({ planId, day })
        }
      },

      toggleEditArea(event) {
        if (this.$route.query.status === 'done') return

        const target = event.target
        //editArea show
        if (!this.editAreaVisible && !withinParent('#scheduleWrap', target)) {
          this.editAreaVisible = true
        } else if (this.editAreaVisible && target.className.indexOf('field2__content') === -1) {
          this.editAreaVisible = false
        }
      },

      handleEdit() {
        this.$router.push(`/planEdit/${this.plan.id}`)
      },

      handleDelete() {
        this.$router.push('/home')
        this.deletePlan({ planId: this.plan.id })
      },

      handleAdd() {
        this.$router.push('/planAdd')
      },

      navHome() {
        this.$router.push('/home')
      }
    },

    components: { kBg, schedule }
  }
</script>