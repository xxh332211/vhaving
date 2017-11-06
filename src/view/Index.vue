<template>
  <div class="index">
    <span>这是首页</span>
    <span>结果：{{count}}</span>
    <button @click="open()">+</button>
    <user :title="title"
          :show="show"></user>
          <button @click="mock()">mock</button>
  <confirm ref="dialog" :msg='confirms'></confirm>
  </div>
</template>

<script>
import User from '../components/user.vue'
import Confirm from '../components/Modal/Confirm.vue'
import api from '../api/api.js'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      confirms: {
        title: '确定',
        body: 'are you ok'
      },
      title: '这是首页传入参数',
      show: true
    }
  },
  computed: {
    ...mapGetters(['count', 'modal'])
  },
  methods: {
    ...mapActions(['increment', 'alerts']),
    mock () {
      api.mockGet({}, 'address').then((item) => {
        console.log('item', item)
      })
    },
    callback () {
      console.log(6666666666666666)
    },
    open () {
      this.$refs.dialog.confirm().then(() => {
        this.callback()
      }).catch(() => {
        console.log(22222222222)
      })
    }
  },
  components: {
    user: User,
    confirm: Confirm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus">
    .index
      color:blue
    button
      width:.25rem
</style>
