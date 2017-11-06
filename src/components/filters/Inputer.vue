<template>
  <div class="s-name">
    <input type="text" v-model="val" @input="change" placeholder='可输入编号、名称、描述查询'>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'inputer',
  props: {
    param: '',
    method: {}
  },
  data () {
    return {
      val: ''
    }
  },
  methods: {
    ...mapActions(['setfliter', 'getdata']),
    throttle (method, context) {
      clearTimeout(method.t)
      method.t = setTimeout(() => {
        method.call(context, {name: this.param.name, id: this.val})
        this.getdata()
      }, 500)
    },
    change () {
      this.throttle(this.setfliter, this)
    }
  }
}
</script>

<style scoped lang="stylus">
  .s-name
      width:6.43rem
      height:.5rem
      overflow:hidden
      input
        padding:0 .1rem
        width:100%
        height:100%
        border:.01rem solid #c6c6c6
        border-radius:.06rem
</style>
