<template>
<!-- 省 -->
	  <div class="s-lis clearfloat">
    <label for="">省份：</label>
    <div class="s-part f-l">
      <p class="p-title ellipsis" @click="isshow = !isshow">选择省份</p>
      <p class="s-down" @click="isshow = !isshow"><span class="trangle"></span></p>
      <ul class="list-role" v-show="isshow">
        <li class="ellipsis" v-for="(i,idx) in provience" v-bind:class="{active:idx == index}" @click="change(idx)">{{i.Name}}</li>
      </ul>
    </div>
  </div>
<!-- 市 -->
    <div class="s-lis clearfloat">
    <label for="">城市：</label>
    <div class="s-part f-l">
      <p class="p-title ellipsis" @click="isshow = !isshow">{{text1||选择城市}}</p>
      <p class="s-down" @click="isshow = !isshow"><span class="trangle"></span></p>
      <ul class="list-role" v-show="isshow">
        <li class="ellipsis" v-for="(i,idx) in child.list" v-bind:class="{active:idx == index}" @click="change(idx)">{{i.Name}}</li>
      </ul>
    </div>
  </div>

</template>

<script>
  import api from '../../api/api.js'
  import { mapGetters } from 'vuex'
  export default {
    name: 'location',
    props: {
      child: ''
    },
    data () {
      return {
        index: -1,
        isshow: false,
        parentIds: ['menu_list', 'part_list','city_list'],
        text1: this.child.text1,
        provience: [{name: '河南', id: 1},{name: '江西', id: 2}],
        selectedpv: ''
      }
    },
    computed: {
      ...mapGetters(['single'])
    },
    mounted () {
      
    },
    beforeDestroy () {
      if (this.child.get && this.parentIds.indexOf(this.child.get.url) > -1) {
        this.child.list.splice(1)
      }
    },
    methods: {
      change (idx) {
        this.index = idx
        this.isshow = !this.isshow
        this.text1 = this.child.list[idx].Name
        this.$emit('toparent', {name: this.provience.name, val: this.Id})
        this.selectedpv = i.id;
        if (this.child.get) {
        api.select(this.child.param, this.child.get.url, true).then(item => {
          if (this.parentIds.indexOf(this.child.get.url) > -1) {
            item.results.forEach((val) => {
              if (val[this.child.name] === '00000000-0000-0000-0000-000000000000') {
                this.child.list.push(val)
              }
            })
          } else {
            Array.prototype.push.apply(this.child.list, item.results)
          }
          let pid = this.single[this.child.name] || this.child.list[0].Id
          this.child.list.forEach((val, n) => {
            if (val.Id === pid) {
              this.index = n
              this.text1 = val.Name
            }
          })
          this.$emit('toparent', {name: this.child.name, val: pid})
        })
      } else {
        let pid = this.single[this.child.name] || this.child.list[0].Id
        this.child.list.forEach((val, n) => {
          if (val.Id === pid) {
            this.index = n
            this.text1 = val.Name
          }
        })
        this.$emit('toparent', {name: this.child.name, val: pid})
      }
      }
    }
  }
</script>

<style scoped lang="stylus">
.s-lis
    padding: .1rem 0
    label
      line-height:.5rem
      margin-right:.23rem
      width:.8rem
      display:inline-block
      height:.5rem
      text-align:right
      float: left
  .s-part
    height: .5rem
    border-radius: .06rem
    border: .01rem solid #c6c6c6
    width: 1.8rem
    position: relative
    padding: 0 0 0 .1rem
    color: #2e2e3d
    cursor: pointer
    .s-down
      width: .5rem
      height: .25rem
      line-height: .25rem
      position: absolute
      top: .125rem
      right: 0
      border-left: .01rem solid #5f6060
      .trangle
        width: 0;
        height: 0;
        position: absolute
        left: 50%
        margin-left: -.03rem
        top: 50%
        margin-top: -.03rem
        border-left: .06rem solid transparent
        border-right: .06rem solid transparent
        border-top: .06rem solid #5f6060
    .p-title
      margin-right: .5rem
      margin-top: .125rem
      height.25rem
      line-height: .25rem
    .list-role
      position: absolute
      width: 100%;
      top: .55rem
      border: .01rem solid #dbdbdb
      left: 0
      background: #fff
      border-radius: .03rem
      z-index : 100
      &:before
        width: 0;
        height: 0;
        position: absolute
        top: -.06rem
        right: .15rem
        border-left: .06rem solid transparent
        border-right: .06rem solid transparent
        border-bottom: .06rem solid #5f6060
      li
        width: 100%
        height: .4rem
        line-height: .4rem
        padding: 0 .1rem
        z-index : 100
        &.active
          background: #dfeaed
        &:hover
          background: #dfeaed
</style>