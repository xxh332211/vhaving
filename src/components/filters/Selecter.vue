<!-- 筛选下拉部件 -->
<template>
  <div class="s-part f-l">
    <p class="p-title" @click="isshow = !isshow">{{text}}</p>
    <p class="s-down" @click="isshow = !isshow"><span class="trangle"></span></p>
    <ul class="list-role" v-show="isshow">
      <li v-for="(item,idx) in param.list" v-bind:class="{active:idx == index}" @click="change(idx)">{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'selecter',
    props: {
      param: ''
    },
    data () {
      return {
        index: -1,
        isshow: false,
        text: this.param.text
      }
    },
    methods: {
      ...mapActions(['setfliter', 'getdata']),
      change (idx) {
        this.index = idx
        this.isshow = !this.isshow
        this.text = this.param.list[idx].title
        this.setfliter({name: this.param.name, id: this.param.list[idx].id})
        this.getdata()
        // this.$store.dispatch('setfliter', {name: this.param.name, id: this.param.list[idx].id})
      }
    }
  }
</script>

<style scoped lang="stylus">
  .s-part
    height:.5rem
    border-radius:.06rem
    border:.01rem solid #c6c6c6
    width:1.8rem
    position:relative
    padding:0 0 0 .15rem
    color:#2e2e3d
    cursor:pointer
    .s-down
      width:.5rem
      height:.25rem
      line-height:.25rem
      position:absolute
      top:.125rem
      right:0
      border-left:.01rem solid #5f6060
      .trangle
        width: 0;
        height: 0;
        position:absolute
        left:50%
        margin-left:-.03rem
        top:50%
        margin-top:-.03rem
        border-left: .06rem solid transparent
        border-right: .06rem solid transparent
        border-top: .06rem solid #5f6060
    .p-title
      margin-right:.5rem
      margin-top:.125rem
      height.25rem
      line-height:.25rem
    .list-role
      position:absolute
      width:100%;
      top:.55rem
      border:.01rem solid #dbdbdb
      left:0
      background:#fff
      border-radius:.03rem
      &:before
        width: 0;
        height: 0;
        position:absolute
        top:-.06rem
        right:.15rem
        border-left: .06rem solid transparent
        border-right: .06rem solid transparent
        border-bottom: .06rem solid #5f6060
      li
        width:100%
        height:.4rem
        line-height:.4rem
        padding: 0 .1rem
        &.active
          background:#dfeaed
        &:hover
          background:#dfeaed
</style>
