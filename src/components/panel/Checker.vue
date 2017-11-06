<template>
  <div class="s-checker">
    <div class="s-title f-l">
      {{child.text}}：
    </div>
    <ul>
      <li v-for='(item,idx) in child.list' v-bind:class="{active: result.indexOf(item.id)>-1}" @click=change(item.id)><span></span>{{item.title}}</li>
    </ul>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'checker',
    props: {
      child: ''
    },
    data () {
      return {
        text: this.child.text,
        list1: [],
        result: []
      }
    },
    computed: {
      ...mapGetters(['single'])
    },
    mounted () {
      let temp = this.single[this.child.name] ? this.single[this.child.name].split(',') : []
      this.result = JSON.parse(JSON.stringify(temp))
      this.list = JSON.parse(JSON.stringify(temp))
      this.$emit('toparent', {name: this.child.name, val: this.result})
    },
    methods: {
      filltext () {
        this.text = ''
        this.child.list.map((val) => {
          if (this.result.indexOf(val.Id) > -1) {
            this.text += val.Name + ','
          }
        })
        this.text = this.text.substring(0, this.text.length - 1) || this.child.text
      },
      change (id) {
//        console.log('哈哈', this)
        let index = this.result.indexOf(id)
        if (index === -1) {
          this.result.push(id)
        } else {
          this.result.splice(index, 1)
        }
        this.$emit('toparent', {name: this.child.name, val: this.result})
        console.log('嘻嘻', this.result)
//        this.list1 = JSON.stringify(this.result)
//        console.log('嘻嘻1', this.list1)
      }
    }
  }
</script>
<style scoped lang="stylus">
  .s-checker
    height: .7rem
    line-height: .7rem
    padding: .1rem 0
    .s-title
       padding-left: .32rem
     ul
       border-top: 0.01rem solid #858689
       padding-left: .8rem
  li
    display: inline-block
    margin-left: .3rem
    height: .5rem
    line-height: .5rem
    span
      width: .2rem
      height: .2rem
      display: inline-block
      border: .02rem solid #23330e
      margin: 0 .1rem
      border-radius: 50%
      vertical-align: middle
    &.active
      span
        background: #40afe1
        color: #fff

</style>
