<!-- 筛选组装主部件 -->
<template>
 <div class="pannel">
    <p class="p-title"><slot name="title"></slot></p>
    <div class="wrap-panel">
      <ul class="tab-panel">
        <li v-for="(item,idx) in list.slice((page-1)*5,page*5)" v-bind:class="{active:(idx+(page - 1) * 5)=== index }" @click="change(idx)"><span>{{item.Name}}</span></li>
      </ul>
      <ul class="tab-page" v-if="list.length>5">
        <li @click="prev()"><</li>
        <li @click="next()">></li>
      </ul>
    </div>
    <div class="render">
      <ul class="render-list">
        <li v-for="(item,idx) in list[index].child"><p class="choice" v-bind:class="{active: tdx.indexOf(item.Id)>-1}" @click="insert(list[index], idx, item.Id)"><span></span></p>{{item.Name}}</li>
      </ul>
      <div class="select-all">
        <p class="choice" @click="selectall()" v-bind:class="{active:tdx.length===list[index].child.length}"><span></span></p>全选
      </div>
    </div>
    <div class="form-action">
      <button :class="item" v-for="item in types" @click="operate(item)">{{{quit:'退出',del:'删除',freeze:'冻结',sure:'确定'}[item]}}</button>
    </div>
 </div>
</template>

<script>
  import api from '../api/api.js'
  export default {
    name: 'auth',
    props: {
      msg: '',
      authid: ''
    },
    mounted () {
      console.log('ssdsdsd', this.authid)
      api.select({PageNo: 1, Search: '', Type: ''}, 'menu_list', true).then((item) => {
        let result = item.results || []
        result.forEach((value, index) => {
          this.alllist[value.ParentId] = this.alllist[value.ParentId] || []
          this.alllist[value.ParentId].push(value)
        })
        this.list = JSON.parse(JSON.stringify(this.alllist['00000000-0000-0000-0000-000000000000']))
        this.list.forEach((value, index) => {
          value.child = this.alllist[value.Id] ? this.alllist[value.Id] : []
        })
        api.post({JSON: JSON.stringify({Id: this.authid})}, 'power_info').then((item) => {
          item.results.map((val, idx) => {
            this.funcid.push(val.Func_id)
          })
          this.list.forEach((item, idx) => {
            item.child.map((val) => {
              if (this.funcid.indexOf(val.Id) > -1) {
                this.updata[item.Id] = this.updata[item.Id] ? this.updata[item.Id] : []
                this.updata[item.Id].push(val.Id)
                idx === 0 && this.tdx.push(val.Id)
              }
            })
          })
        })
      })
    },
    data () {
      return {
        types: ['quit', 'sure'],
        updata: {},
        page: 1,
        index: 0,
        alllist: {},
        texts: {
          quit: '退出',
          sure: '确定'
        },
        tdx: [],
        is_all: {},
        funcid: [],
        list: [{child: []}]
      }
    },
    methods: {
      operate (tp) {
        tp === 'sure' && this.sure()
        tp === 'quit' && this.quit()
        tp === 'del' && this.del()
        tp === 'freeze' && this.freeze()
      },
      sure () {
        let up = this.combine(JSON.parse(JSON.stringify(this.updata)))
        console.log(121212121, up)
        api.post({JSON: JSON.stringify({Id: this.authid, FuncIdList: up})}, 'power_update').then((item) => {
          console.log(item)
        })
        this.$emit('close', {name: 'auth'})
      },
      quit () {
        this.$emit('close', {name: 'auth'})
      },
      del () {
        this.$emit('close', {name: 'auth'})
      },
      freeze () {
        this.$emit('close', {name: 'auth'})
      },
      combine (temp) {
        let result = []
        for (let item in temp) {
          if (temp[item].length > 0) {
            result = result.concat(temp[item])
          }
        }
        return result
      },
      prev () {
        if (this.page > 1) {
          this.page--
          this.index = (this.page - 1) * 5
          this.tdx = this.updata[this.list[this.index].Id] ? JSON.parse(JSON.stringify(this.updata[this.list[this.index].Id])) : []
        }
      },
      next () {
        let all = Math.ceil(this.list.length / 5)
        if (this.page < all) {
          this.page++
          this.index = (this.page - 1) * 5
          this.tdx = this.updata[this.list[this.index].Id] ? JSON.parse(JSON.stringify(this.updata[this.list[this.index].Id])) : []
        }
      },
      selectall () {
        let tlength = this.tdx.length
        let alllength = this.list[this.index].child.length
        this.tdx = []
        this.is_all[this.list[this.index].Id] = false
        if (tlength !== alllength) {
          this.is_all[this.list[this.index].Id] = true
          this.list[this.index].child.map((val) => {
            this.tdx.push(val.Id)
          })
        }
        this.updata[this.list[this.index].Id] = JSON.parse(JSON.stringify(this.tdx))
      },
      change (idx) {
        this.index = (this.page - 1) * 5 + idx
        this.tdx = this.updata[this.list[this.index].Id] ? JSON.parse(JSON.stringify(this.updata[this.list[this.index].Id])) : []
      },
      insert (data, idx, id) {
        this.tdx = this.updata[data.Id] ? JSON.parse(JSON.stringify(this.updata[data.Id])) : []
        let im = this.tdx.indexOf(id)
        if (im === -1) {
          this.tdx.push(id)
        } else {
          this.tdx.splice(im, 1)
        }
        this.updata[data.Id] = JSON.parse(JSON.stringify(this.tdx))
        console.log(this.updata)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../lib/stylus/until.styl' 
  .choice
    display:inline-block
    width:.25rem
    height:.25rem
    vertical-align:middle
    border-radius:50%
    border:.01rem solid #535353
    margin-right:.1rem
    line-height:.23rem
    text-align:center
    cursor:pointer
    &.active
      span
          background:#ffa725
    span
      width:.13rem
      height:.13rem
      border-radius:50%
      display:inline-block
  .pannel
    position: fixed
    overflow-y:auto
    top:1rem
    right:0
    bottom:0
    background:#fff
    width:8rem
    z-index:55
    padding:.5rem .4rem 0
    vendor('box-shadow',3px 3px 8px 2px)
    .p-title
      padding:.2rem 0
      border-bottom:.01rem solid #858659
    .wrap-panel
      position:relative
      border-bottom:.01rem solid #858689
    .tab-page
      width:.75rem
      position:absolute
      right:0
      top:0
      height:.6rem
      font-size:0
      li
        display:inline-block
        width:.25rem
        height:.25rem
        border:.01rem solid #fea525
        margin-top:.2rem
        border-radius:.03rem
        cursor:pointer
        text-align:center
        line-height:.23rem
        font-size:.18rem
        &:last-child
          margin-left:.08rem
    .tab-panel
      height:.6rem
      margin-right:.75rem
      li
        height:.58rem
        line-height:.58rem
        width:20%
        display:inline-block
        text-align:left
        cursor:pointer
        span
          display:inline-block
          padding:0 .04rem
        &.active
          span
            border-bottom:.03rem solid #ffa626
    .render
      .select-all
        border-top:.01rem solid #858689
        height:.8rem
        line-height:.8rem
        margin-top:.15rem
      .render-list
        li
          height:.55rem
          line-height:.55rem
    .form-action
      text-align:center
      margin-top:1.5rem
      width:8rem
      margin-left:-.4rem
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
        &.del
          border:.01rem solid #e40300
        &.freeze
          border:.01rem solid #B2F1EA
</style>

