<template>
  <div class="list">
  <p>{{msg}}</p>
  <user :title="title"></user>
  </div>
  
</template>
<script>
import User from '../components/user.vue'
export default {
  name: 'list',
  data () {
    return {
      msg: '这是列表页',
      title: '列表页传入参数'
    }
  },
  components: {
    user: User
  }
}
</script>

<style  scoped lang="stylus">
    .list
      color:blue
</style>

