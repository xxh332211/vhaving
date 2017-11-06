<!--提示文本部件-->
<template>
  <div class="s-area">
    <label for="">{{child.text}} </label>
  </div>
</template>
<script>
  export default {
    name: 'texter',
    props: {
      child: ''
    },
    data () {
      return {
        val: ''
      }
    },
    computed: {
    },
    mounted () {
    },
    methods: {
      change () {
      }
    }
  }
</script>
<style scoped lang='stylus'>
  .s-area
    overflow: hidden
    border-top: 0.01rem solid #858689
    margin-top: .1rem
    label
      line-height: .5rem
      margin-right: .15rem
      width: 1.8rem
      display: inline-block
      height: .5rem
      text-align: right
      /*padding-right: 0.08rem*/
      /*padding-top: .1rem*/
      font-weight: bold
      font-size: .16rem
      text-align: left
    /*textarea
      width: 4rem
      height: 1.3rem
      border-radius: .06rem
      resize: none
      vertical-align: text-top
      padding : .1rem .1rem 0*/


</style>
