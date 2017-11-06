<!-- 筛选组装主部件 -->
<template>
  <div class="pannel">
    <p class="p-title"><slot name="title"></slot></p>
    <div class="form-input" v-for="item in panelwords">
      <inputer v-if="item.type == 'input'" :child="item" @toparent="change"></inputer>
    </div>
    <div class="form-action">
      <button :class="item.name" v-for="item in types" @click="operate(item.name,item.url)">{{item.text}}</button>
    </div>
  </div>
</template>

<script>
  import Inputer from './panel/Inputer.vue'
  import Manage from './panel/Manage.vue'
  import api from '../api/api.js'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'panelword',
    props: {
      panelwords: '',
      types: ''
    },
    data () {
      return {
        updata: {}
      }
    },
    components: {
      inputer: Inputer,
      manage: Manage
    },
    computed: {
      ...mapGetters([
        'single'
      ])
    },
    methods: {
      ...mapActions(['getdata', 'notice']),
      operate (tp, url) {
        tp === 'sure' && this.sure(url)
        tp === 'quit' && this.quit()
      },
      sure (url) {
        this.updata.Id = this.single.Id
        delete this.updata['Againpassword']
        console.log('点击行', this.single.Id)
        if (this.updata.Repassword.length > 0) {
          api.post({JSON: JSON.stringify(this.updata)}, url).then((item) => {
            console.log('返回值', item)
            if (item.responsecode === '200') {
              // alert('1')
              this.notice({msg: '恭喜！密码重置成功', type: 'success'})
            } else {
              this.notice({msg: '抱歉！密码重置失败', type: 'error'})
            }
            this.$emit('close', {name: 'panelword'})
            this.$store.dispatch('getdata')
          })
        }
      },
      quit () {
        this.$emit('close', {name: 'panelword'})
      },
      change (value) {
        console.log('DSDSD', this.updata['Password'])
        this.updata[value.name] = value.val
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../lib/stylus/until.styl'
  .pannel
    position: fixed
    top:1rem
    right:0
    bottom:0
    background:#fff
    width:8rem
    overflow-y:auto
    z-index:55
    padding:.5rem .4rem 0
    vendor('box-shadow',3px 3px 8px 2px)
    .p-title
      padding:.2rem 0
      border-bottom:.01rem solid #858659
      margin-bottom:.1rem
  .form-action
    text-align:center
    margin-top:.5rem
    button
      text-align: center
      height:.5rem
      line-height:.5rem
      border-radius:.06rem
      color:#000
      font-size:.14rem
      width:1.5rem
      background:#fff
      margin:0 .2rem
      cursor:pointer
      &.quit
        border:.01rem solid #B2F1EA
      &.sure
        border:.01rem solid #e40300
      &.save
        border:.01rem solid #e40300
</style>

