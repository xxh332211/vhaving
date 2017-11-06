<!-- 筛选下拉部件 -->
<template>
    <div class="s-part">
      <p class="p-title ellipsis" @click="slide()">{{text}}</p>
      <p class="s-down" @click="slide()"><span class="trangle"></span></p>
      <ul class="list-role" v-show="isshow">
        <li v-for="(item,idx) in param.list" v-bind:class="{active:list.indexOf(item.id)>-1}" @click="change(item.id)"><a href="javascript:;" class="m-item">{{item.title}}</a></li>
        <li class="operate clearfloat">
          <a href="javascript:;" class="btn-sure" @click="sure()">确定</a>
        </li>
      </ul>
    </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'multi',
    props: {
      param: ''
    },
    data () {
      return {
        isshow: false,
        text: this.param.text,
        list: [],
        result: []
      }
    },
    methods: {
      ...mapActions(['setfliter', 'getdata']),
      slide () {
        this.isshow = !this.isshow
        this.list = JSON.parse(JSON.stringify(this.result))
        this.isshow && this.filltext()
      },
      sure () {
        this.isshow = false
        this.result = JSON.parse(JSON.stringify(this.list))
        this.filltext()
        this.setfliter({name: this.param.name, id: this.result.join(',')})
        this.getdata()
      },
      filltext () {
        this.text = ''
        this.param.list.map((val) => {
          if (this.list.indexOf(val.id) > -1) {
            this.text += val.title + ','
          }
        })
        this.text = this.text.substring(0, this.text.length - 1) || this.param.text
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
