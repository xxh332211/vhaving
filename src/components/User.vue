<template id="user">
  <div class="texts">
      <span>这是公用组件</span>
      <span>{{title}}</span>
      <button @click="decrement" v-if="show">-</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'user',
  props: {
    title: '',
    show: false
  },
  methods: mapActions([
    'decrement'
  ]),
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped lang="stylus">
    .texts
        color:green
</style>

