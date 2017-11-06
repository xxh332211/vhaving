<template>
<div class="tb">
  <table class="tablelist">
        <thead>
          <tr>
            <td v-for="it in column">{{it.text}}</td>
            <td v-if="options">操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in list" class="list-map">
            <td v-for="its in column">{{item[its.name]}}</td>
            <td class="opt" v-if="options"><button class="option" v-for="it in options" @click="operate(idx, it.method)"><span v-if="it.name!=='冻结'">{{it.name}}</span><span v-if="it.name==='冻结'">{{item.Status===0?'解冻':'冻结'}}</span></button></td>
          </tr>
        </tbody>
    </table>
    <ul class="page" v-if="pages.total>0">
      <li class="chevron" @click="prev('min')"><</li>
      <li class="page-item" v-for="n in pages.list" @click="change(n)" v-bind:class="{active:n==pages.num}">{{n}}</li>
      <li class="chevron right" @click="prev('max')">></li>
      <li class="page-set"><input type="text" v-model="number" @input="limit()"></li>
      <li class="page-go" @click="go()">GO</li>
      <li class="page-total">共&nbsp{{pages.total}}&nbsp页</li>
    </ul>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'tables',
  props: {
    method: {},
    column: '',
    options: '',
    filter: ''
  },
  data () {
    return {
      page: 1,
      index: 1,
      number: ''
    }
  },
  methods: {
    limit () {
      this.number = this.number.replace(/\D/g, '')
    },
    prev (tp) {
      if (tp === 'min' && this.pages.num > 1) {
        this.$store.dispatch('setfliter', {name: 'PageNo', id: 1})
        this.$store.dispatch('getdata')
      }
      if (tp === 'max' && this.pages.num < this.pages.total) {
        this.$store.dispatch('setfliter', {name: 'PageNo', id: this.pages.total})
        this.$store.dispatch('getdata')
      }
    },
    go () {
      this.number = this.number ? this.number : 1
      this.number = parseInt(this.number, 10)
      this.number = this.number > this.pages.total ? this.pages.total : this.number
      this.$store.dispatch('setfliter', {name: 'PageNo', id: this.number})
      this.$store.dispatch('getdata')
    },
    operate (idx, method) {
      this.$store.dispatch('getsingle', idx)
      method(idx, this.single.Id || this.single.id)
    },
    change (idx) {
      this.page = idx
      this.$store.dispatch('setfliter', {name: 'PageNo', id: this.page})
      this.$store.dispatch('getdata')
    },
    ...mapActions(['getdata', 'setfliter', 'getsingle'])
  },
  computed: {
    ...mapGetters([
      'list', 'filters', 'pages', 'single'
    ])
  },
  mounted () {
    this.filter.forEach((val) => {
      this.$store.dispatch('setfliter', {name: val.name, id: val.val})
    })
    this.$store.dispatch('getdata')
  }
}
</script>

<style scoped lang="stylus">
.tb
  padding-top:1px
  .tablelist
    margin-top:.2rem
    width:100%
    border:.01rem solid #ccc
    border-collapse:collapse
    .list-map
      &:hover
        background:#E3E6EA
    td
      text-align:center
      height:.5rem
      border-right:.01rem solid #ccc
      border-bottom:.01rem solid #ccc
  .page
    margin-top:.2rem
    li
      display:inline-block
      width:.25rem
      height:.25rem
      -moz-user-select: none
      -webkit-user-select: none
      -ms-user-select: none
      cursor:pointer
      &.page-total
        font-size:.13rem
        line-height:.25rem
        margin-left:.05rem
      &.page-go
        width:auto
        padding:0 .05rem
        height:.25rem
        line-height: .23rem
        font-size:.12rem
        border:.01rem solid #ccc
        margin-left:.2rem
        border-radius:.06rem
      &.page-set
        margin-left:.15rem
        input
          border-radius:.06rem
          width:.4rem
          background:#fff
          border:.01rem solid #ccc
          height:100%
          vertical-align:top
          padding:0 .04rem
      &.chevron
        line-height:.25rem
        text-align:left
        width:.2rem
        font-size:.17rem
        &.right
          text-align:right
      &.page-item
        border-radius: .06rem
        margin:0 .05rem
        text-align:center
        line-height:.23rem
        font-size:.13rem
        border:.01rem solid #ccc
      &.active
        background-color:#ffa625
        border:.01rem solid #ffa625
  .option
    height:.27rem
    padding:0 .08rem
    line-height:.27rem
    border:.01rem solid #42b2df
    font-size:.12rem
    width:auto
    background:#fff
    border-radius:.03rem
    margin:0 .03rem
    cursor:pointer
</style>

