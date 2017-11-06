<!-- 筛选下拉部件 -->
<template>
  <div class="clearfloat wrap-multi">
    <div class="s-title f-l">
      {{child.text}}：
    </div>
    <div class="s-part f-l">
      <p class="p-title ellipsis" @click="slide()">{{text}}</p>
      <p class="s-down" @click="slide()"><span class="trangle"></span></p>
      <ul class="list-role" v-show="isshow">
        <li v-for="(item,idx) in child.list" v-bind:class="{active:list.indexOf(item.Id)>-1}" @click="change(item.Id)"><a href="javascript:;" class="m-item ellipsis">{{item.Name}}</a></li>
        <li class="operate clearfloat">
          <a href="javascript:;" class="btn-sure" @click="sure()">确定</a>
        </li>
      </ul>
    </div>
 </div> 
</template>

<script>
  import api from '../../api/api.js'
  import { mapGetters } from 'vuex'
  export default {
    name: 'multi',
    props: {
      child: ''
    },
    data () {
      return {
        isshow: false,
        text: this.child.text,
        list: [],
        result: []
      }
    },
    computed: {
      ...mapGetters(['single'])
    },
    mounted () {
      let temp = this.single[this.child.name] ? this.single[this.child.name].split(',') : []
      api.select(this.child.param, this.child.get.url, true).then(item => {
        this.child.list = item.results
        this.result = JSON.parse(JSON.stringify(temp))
        this.list = JSON.parse(JSON.stringify(temp))
        this.$emit('toparent', {name: this.child.name, val: this.result})
        this.filltext()
      })
    },
    methods: {
      slide () {
        this.isshow = !this.isshow
        this.list = JSON.parse(JSON.stringify(this.result))
        this.isshow && this.filltext()
      },
      sure () {
        this.isshow = false
        this.result = JSON.parse(JSON.stringify(this.list))
        this.filltext()
        this.$emit('toparent', {name: this.child.name, val: this.result})
      },
      filltext () {
        this.text = ''
        this.child.list.map((val) => {
          if (this.list.indexOf(val.Id) > -1) {
            this.text += val.Name + ','
          }
        })
        this.text = this.text.substring(0, this.text.length - 1) || this.child.text
      },
      change (id) {
        let index = this.list.indexOf(id)
        if (index === -1) {
          this.list.push(id)
        } else {
          this.list.splice(index, 1)
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../lib/stylus/multi.styl'
</style>
