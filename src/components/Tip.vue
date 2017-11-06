<template>
  <div class="tip-all">
    <div class="title">
      <span>您在这里</span><span class="parent">{{parent}}</span><span class="child">> {{child}}</span>
  </div>
  <div class="m-title">
    <p>{{child}}</p>
  </div>
  </div>
</template>

<script>
export default {
  name: 'tip',
  props: {
    parent: '',
    child: ''
  }
}
</script>

<style scoped lang="stylus">
  .title
    height:.48rem
    line-height:.48rem
    font-size:.14rem
    color:#898989
    padding:0 .28rem
    .parent
      color:#666666
      margin-left:.09rem
    .child
      color:#318EBF
      margin-left:.09rem
  .m-title
    background:#fff
    height:.6rem
    line-height:.6rem
    color:#000
    margin:0 .28rem
    padding:0 .42rem
    p
      border-bottom:.01rem solid #5f6060
      height:100%
</style>

