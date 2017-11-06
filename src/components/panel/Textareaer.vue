<!--弹出层文本域部件-->
<template>
  <div class="s-area">
    <label for="">{{child.text}} : </label>
    <textarea name="" id="" cols="20" rows="5" v-model='val' :placeholder='child.holder' @input="change()"></textarea>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'textarea',
    props: {
      child: ''
    },
    data () {
      return {
        val: ''
      }
    },
    computed: {
      ...mapGetters(['single'])
    },
    mounted () {
      this.val = this.single[this.child.name] || ''
      this.$emit('toparent', {name: this.child.name, val: this.val})
    },
    methods: {
      change () {
        this.$emit('toparent', {name: this.child.name, val: this.val})
      }
    }
  }
</script>
<style scoped lang='stylus'>
  .s-area
    overflow: hidden
    label
      line-height: .5rem
      margin-right: .15rem
      width: .8rem
      display: inline-block
      height: .5rem
      text-align: right
      padding-right: 0.08rem
    textarea
      width: 4rem
      height: 1.3rem
      border-radius: .06rem
      resize: none
      vertical-align: text-top
      padding : .1rem .1rem 0


</style>
