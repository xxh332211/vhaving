<template>
  <div class="manage">
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
  </div>
</template>

<script>
  import api from '../../api/api.js'
  export default {
    name: 'manage',
    props: {
      child: '',
      id: ''
    },
    data () {
      return {
        updata: {},
        page: 1,
        index: 0,
        tdx: [],
        alllist: {},
        is_all: {},
        list: [{child: []}]
      }
    },
    mounted () {
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
        if (this.id) {
          api.post({JSON: JSON.stringify({Id: this.id})}, 'power_info').then((item) => {
            let funcid = []
            item.results.map((val, idx) => {
              funcid.push(val.Func_id)
            })
            this.list.forEach((item, idx) => {
              item.child.map((val) => {
                if (funcid.indexOf(val.Id) > -1) {
                  this.updata[item.Id] = this.updata[item.Id] ? this.updata[item.Id] : []
                  this.updata[item.Id].push(val.Id)
                  idx === 0 && this.tdx.push(val.Id)
                }
              })
            })
            this.$emit('toparent', {name: this.child.name, val: funcid || []})
          })
        } else {
          this.$emit('toparent', {name: this.child.name, val: []})
        }
      })
    },
    methods: {
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
      combine (temp) {
        let result = []
        for (let item in temp) {
          if (temp[item].length > 0) {
            result = result.concat(temp[item])
          }
        }
        return result
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
        this.$emit('toparent', {name: this.child.name, val: this.combine(JSON.parse(JSON.stringify(this.updata)))})
      }
    }
  }
</script>

<style scoped lang="stylus">
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
  .manage
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
</style>
