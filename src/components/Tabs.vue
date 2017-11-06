<!-- 筛选组装主部件 -->
<template>
 <div class="pannel">
    <div class="wrap-panel">
      <ul class="tab-panel">
        <li v-for="(item,idx) in list.slice((page-1)*5,page*5)" v-bind:class="{active:(idx+(page - 1) * 5)=== index }" @click="changes(idx)"><span>{{item.title}}</span></li>
      </ul>
    </div>
    <div >
      <ul class="render-list">
      <div class="form-input" v-for="item in list[index]['childs']">
      <inputer v-if="item.type == 'input'" :child="item" @toparent="change"></inputer>
      <radioer v-if="item.type == 'radio'" :child="item" @toparent="change"></radioer>
      <multi v-if="item.type == 'multi'" :child="item" @toparent="change"></multi>
      <textareaer v-if="item.type == 'textarea'" :child="item" @toparent="change"></textareaer>
      <selecter v-if="item.type == 'select'" :child="item" @toparent="change"></selecter>
      <manage v-if="item.type == 'manage'" :child="item" @toparent="change"></manage>
      <searcher v-if="item.type == 'searcher'" :child="item" :id="single.Id" @toparent="change"></searcher>
      <file v-if="item.type == 'file'" :child="item"  @toparent="change"></file>
    	</div>
    <div class="form-action">
      <button :class="item.name" v-for="item in types" v-if=' index == 0'   @click="operate(item.name,item.url)">{{item.text}}</button>
      <button :class="item.name" v-for="item in lgds" v-if=' index == 1'    @click="operate(item.name,item.url)">{{item.text}}</button>
    </div>
      </ul>
    </div>
 </div>
</template>

<script>
	/* eslint-disable */
  import Inputer from './panel/Inputer.vue'
  import Radioer from './panel/Radioer.vue'
  import Multi from './panel/multi.vue'
  import File from './panel/File.vue'
  import Textareaer from './panel/Textareaer.vue'
  import Selecter from './panel/Selecter.vue'
  import Manage from './panel/Manage.vue'
  import Searcher from './panel/Searcher.vue'
  import api from '../api/api.js'
  import { CheckRule } from '../mixins/index.js'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'tabs',
   	mixins: [CheckRule],
    props: {
      msg: '',
      types: '',
      lgds: ''
    },
    components: {
      inputer: Inputer,
      radioer: Radioer,
      multi: Multi,
      textareaer: Textareaer,
      selecter: Selecter,
      manage: Manage,
      searcher: Searcher,
      file: File
    },
    data () {
      return {
        updata: {},
        page: 1,
        index: 0,
        check: [],
        new: {
        	system: '',
        	goods: ''
        },
        tdx: [],
        is_all: {},
        list: [
        {name: 'system', title: '创建供应商', childs: [
        {name: 'Name', text: '供应商名称', holder: '请输入名称*...', type: 'input', sub: 'input',check: 'is_null'},
        {name: 'No', text: '联系人', holder: '请输入名称*...', type: 'input', sub: 'input',check: 'is_null'},
        {name: 'Phone', text: '联系电话', holder: '请输入电话*...', type: 'input', sub: 'input',check: 'is_null'},
        {name: 'Level',size: 'small',type: 'select',text: '供应商等级',text1: '等级',list: [{Name: '战略', Id: 1},{Name: 'A', Id: 2}, {Name: 'B', Id: 3},{Name: 'C', Id: 4},{Name: '新', Id: 5}]},
        {name: 'Area',size: 'small',type: 'select',text: '选择地区',text1: '级别',list: [{Name: '选择地区', Id: 1}, {Name: '省', Id: 2},{Name: '市', Id: 3}]},
      ]},
        {name: 'goods', title: '合同', childs:  [
        {name: 'Tpe',size: 'big',type: 'select',text: '供应商类型',text1: '请选择计算方式',list: [{Name: '集采', Id: 1}, {Name: '通用', Id: 2}]},
        {name: 'Bank', text: '开户行', holder: '请输入开户行*...', type: 'input', sub: 'input'},
        {name: 'Account', text: '账号', holder: '请输入账号*...', type: 'input', sub: 'input', check: 'is_null'},
        {name: 'Group', text: '财务联系群', holder: '默认供应商联系人*...', type: 'input', sub: 'input'},
        {name: 'Tell', text: '财务联系方式', holder: '默认供应商联系方式*...', type: 'input', sub: 'input'},
        {name: 'Number', text: '合同编号', holder: '请输入合同编号*...', type: 'input', sub: 'input'},
        {name: 'Start', text: '合同开始', holder: '请输入开始时间*...', type: 'input', sub: 'input'},
        {name: 'End', text: '合同结束日期', holder: '请输入编号*...', type: 'input', sub: 'input'},
        {name: 'Type',size: 'big',type: 'select',text: '结算方式',text1: '请选择计算方式',list: [{Name: '账期', Id: 1}, {Name: '授信额度', Id: 2},{Name: '现款现货', Id: 3},]},
        {name: 'Md',size: 'small',type: 'select',text: '开票类型',text1: '请选择开票方式',list: [{Name: '无票', Id: 1}, {Name: '普通增票', Id: 2}, {Name: '专用增票', Id: 3}]},
        {name: 'Trans',size: 'small',type: 'select',text: '配送方式',text1: '请选择配送方式',list: [{Name: '代发', Id: 1}, {Name: '代发', Id: 2}]},
        {name: 'Target', text: '目标销量', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'Sale', text: '销售服务保证金', holder: '请输入名称*...', type: 'input', sub: 'input'},
//      {name: 'Pic', text: '合同扫描照', holder: '', type: 'input', sub: 'input'},
        {name: 'File', text: '描述', holder: '请输入描述内容...', type: 'file', sub: 'file'},
        {name: 'Remark', text: '备注信息', holder: '', type: 'input', sub: 'input'},
        {name: 'Status',size: 'small',type: 'select',text: '合同状态',text1: '请选择配送方式',list: [{Name: '待审批', Id: 1}, {Name: '生效', Id: 2}, {Name: '失效', Id: 3}]},
      ]}
        ]
      }
    },
//   mounted () {
//    this.addcheck(this.list[0].childs)
//  },
    methods: {
      ...mapActions(['getdata', 'notice']),
      addcheck (data) {
      	this.check = []
      	data.forEach((value, index) => {
	        if (value.check) {
	          let temp = {
	            name: value.name,
	            type: value.check,
	            msg: value.text
	          }
	          this.check.push(temp)
	        }
      	})
//    	console.log('12222222222', this.check)
      },
      operate (tp, url) {
        (tp === 'sure' || tp === 'save') && this.sure(url, tp)
        tp === 'quit' && this.quit()
      },
      sure (url, tp) {
//    	console.log('asasasasas', this.updata)
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
          this.updata.DispIndex = '1'
          this.updata.GroupsIdList = []
        }
        if (url === 'part_insert' || url === 'part_update') {
          this.updata.Faxphone = ''
          this.updata.Status = '1'
          this.updata.Remark = ''
          this.updata.DispIndex = '1'
        }
        api.post({JSON: JSON.stringify(this.updata)}, url).then((item) => {
          this.$emit('close', {name: 'tabs'})
          this.$store.dispatch('getdata')
        })
      },
      quit () {
        this.$emit('close', {name: 'tabs'})
      },
      changes (idx) {
        this.index = (this.page - 1) * 5 + idx
        this.addcheck(this.list[this.index].childs)
//      this.tdx = this.updata[this.list[this.index].name] ? JSON.parse(JSON.stringify(this.updata[this.list[this.index].name])) : []
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
      margin-top:.5rem
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

