<!-- 筛选组装主部件 -->
<template>
 <div class="pannel" v-bind:class="styles">
    <p class="p-title"><slot name="title"></slot{{styles}}</p>
    <div class="clearfloat">
      <div class="form-input" v-for="item in panels">
        <inputer v-if="item.type == 'input'" :child="item" @toparent="change"></inputer>
        <radioer v-if="item.type == 'radio'" :child="item" @toparent="change"></radioer>
        <multi v-if="item.type == 'multi'" :child="item" @toparent="change"></multi>
        <textareaer v-if="item.type == 'textarea'" :child="item" @toparent="change"></textareaer>
        <selecter v-if="item.type == 'select'" :child="item" @toparent="change"></selecter>
        <manage v-if="item.type == 'manage'" :child="item" :id="single.Id" @toparent="change"></manage>
        <checker v-if="item.type == 'check'" :child="item" :id="single.Id" @toparent="change"></checker>
        <searcher v-if="item.type == 'searcher'" :child="item" :id="single.Id" @toparent="change"></searcher>
        <texter v-if="item.type == 'texter'" :child="item" :id="single.Id" @toparent="change"></texter>
        <!-- 添加location -->
        <location v-if="item.type=='location'" :child="item" @toparent="change" :change="change" :panels="panels"></location>
      </div>
    </div>
        <div class="form-action">
      <button :class="item.name" v-for="item in types" @click="operate(item.name,item.url)">{{item.text}}</button>
    </div>
 </div>
</template>

<script>
  import Inputer from './panel/Inputer.vue'
  import Radioer from './panel/Radioer.vue'
  import Multi from './panel/multi.vue'
  import Textareaer from './panel/Textareaer.vue'
  import Selecter from './panel/Selecter.vue'
  import Manage from './panel/Manage.vue'
  import Checker from './panel/Checker.vue'
  import Searcher from './panel/Searcher.vue'
  import Texter from './panel/Texter.vue'
  import api from '../api/api.js'
  import { CheckRule } from '../mixins/index.js'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'panel',
    mixins: [CheckRule],
    props: {
      panels: '',
      types: '',
      styles: ''
    },
    data () {
      return {
        updata: {},
        check: [],
        mock: []
      }
    },
    components: {
      inputer: Inputer,
      radioer: Radioer,
      multi: Multi,
      textareaer: Textareaer,
      selecter: Selecter,
      manage: Manage,
      checker: Checker,
      searcher: Searcher,
      texter: Texter,
      file: File
    },
    computed: {
      ...mapGetters([
        'single', 'current'
      ])
    },
    mounted () {
      this.panels.forEach((value, index) => {
        if (value.check) {
          let temp = {
            name: value.name,
            type: value.check,
            msg: value.text
          }
          this.check.push(temp)
        }
      })
    },
    methods: {
      ...mapActions(['getdata', 'notice']),
      operate (tp, url) {
        (tp === 'sure' || tp === 'save') && this.sure(url, tp)
        tp === 'quit' && this.quit()
      },
      sure (url, tp) {
        let result = this.checkdata(this.updata, this.check)
        if (result.length > 0) {
          this.notice({msg: result[0], type: 'error'})
          return
        }
        if (tp === 'save') {
          this.updata.Id = this.single.Id
        }
        if (url === 'menu_insert' || url === 'menu_update') {
          this.updata.Image1 = ''
          this.updata.Remark = ''
          this.updata.Run = ''
        }
        if (url === 'user_insert' || url === 'user_update') {
          this.updata.DispIndex = 1
          this.updata.GroupsIdList = []
        }
        if (url === 'part_insert' || url === 'part_update') {
          this.updata.Faxphone = ''
          this.updata.Status = 1
          this.updata.Remark = ''
          this.updata.DispIndex = 1
        }
        if (this.mock.indexOf(this.current) === -1) {
          api.post({JSON: JSON.stringify(this.updata)}, url).then((item) => {
            this.$emit('close', {name: 'panel'})
            this.$store.dispatch('getdata')
          })
        } else {
          delete this.updata.Id
          let method = this.current
          if (this.single.id) {
            method = method + '/' + this.single.id
            api.mockPut(this.updata, method).then((item) => {
              this.$emit('close', {name: 'panel'})
              this.$store.dispatch('getdata')
            })
          } else {
            api.mockPost(this.updata, method).then((item) => {
              this.$emit('close', {name: 'panel'})
              this.$store.dispatch('getdata')
            })
          }
        }
      },
      quit () {
        this.$emit('close', {name: 'panel'})
      },
      change (value) {
        this.updata[value.name] = value.val
        console.log('assasaasssssssss', value.val)
      },
      up () {
        console.log(this.updata)
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
    &.large
      width:12rem
      .form-input
        float:left
        width:50%
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

